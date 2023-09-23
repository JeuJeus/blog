---
title: When a Kernel Bug bricks your Production Servers
description: This article explores how one missing instruction set flag can bring a whole production server to a grinding halt. 
date: 2023-09-21
tags:
  - linux
  - server
  - proxmox
  - ubuntu
  - kernel
  - zfs
  - bug
  - aes
  - avx
---

## When all the Alarms went of

This article details my journey to isolate and (temporarily) mitigate the cause of a huge performance regression that brought production servers to a standstill.  

The system we will discuss is based on a Proxmox setup.
Proxmox is a virtualisation platform based on Debian with an Ubuntu Kernel. 
It utilises KVM, QEMU, LXC, and other virtualisation technologies. 
There are two (types of) servers in use: a virtualisation host and a surveillance server.
The latter is employed for logging, monitoring and alarming, and it is constructed using the typical Grafana, Alertmanager, Prometheus stack.  

The story unfolds with an accumulation of (email) alerts following a system update associated with a Proxmox update and, which will be relevant later, a kernel update.  
Three categories of alarms were raised for the Host Server, the VMs as well as the containers residing in them.  
The first was an *unusual disk latency / IO delay* alert.
When the system is unable to complete all write operations currently queued and a delay is introduced before the write is completed this alarm is raised.
This percentage-based metric indicates the proportion of delayed write requests prior to their execution.  
The second category of alerts concerned *high load warnings*.
If a system's load surpasses a threshold individually configured (based on its typical load) for a set period, this alarm will activate.  
The third one was the *target missing* alert.
This one is raised, if prometheus is not able to aquire metrics for the target (via http requests).

As I later discovered, all of the aforementioned errors were interconnected, but we will figure that out later.

## Isolating the Root Cause

This issue necessitated urgent attention.
The crucial factor in such a scenario is to rapidly move from the symptoms to the root cause.
This approach is vital to effectively determine a resolution and contain the problem.  

When troubleshooting issues within a complex setup, which could potentially involve hardware, software, and configuration problems across multiple interconnected layers, this statement holds particularly true.  

Therefore, I started methodically, with investigating the order of alarms raised.
My hope was to spot a pattern or identify the cause.
But unfortunately, no distinct issues arose besides the fact that every time the server performed any activity, the problems seemed to occur, which is fortunately a pattern in itself.  

The possibility of hardware-related issues arose. 
My initial investigation into RAM, CPU temperature/throttling, and network/NIC yielded no findings, but specific concerns such as the mainboard, PCIe (NVMe SSDs), and the SSDs themselves persisted.
The NVMe SSDs in particular remain on my list of potential culprits due to their limited SMART support under Linux.
However, the fact that no errors were reported by the ZFS Filesystem makes this scenario less probable. 

This led me to suspect that a software or configuration regression was introduced after the Proxmox upgrade.
A quick online search revealed several issues with the latest Proxmox version and similar setups, such as the CPU being pinned at 100% when using Windows guests.
While some of these problems seemed plausible, I was able to eliminate all of them one by one.  

My new hypothesis was that the problem might be located at a high level somewhere, so I tried to pin it down to a single Guest VM.
However, this did not solve the issue.
Instead, when attempting to copy a VM, the same performance hiccups and excessive CPU load occured.
It became clear to me that this ruled out almost all potential problems within or with the VMs.  

I suspected that the hardware, particularly a faulty controller in one of the RAIDZs' SSDs, might be the cause.
However, as I was located several hundred kilometres away from the server, I made the decision to initially focus on software - a wise decision as it turned out.
After eliminating basic and advanced configuration and software issues, I vaguely suspected that the ZFS update might have introduced the problems.
To rule out both issues, I created a new pool on another disk and added a dataset using the default ZFS configuration.
Whilst duplicating a template Base VM image, I experienced no difficulties - which triggered an idea in my mind.
High CPU load when using an encrypted disk setup appeared as though the CPU did not support encryption.
However, this was not possible...

A quick Google Search revealed the opposite of what was previously stated [1,2,3,4].
As previously explained, Proxmox is built on an Ubuntu kernel.
This is significant because the kernel revision used experienced a extensive performance regression while attempting to use AES.
The entire setup in its failed state relied on ZFS with aes-256-gcm encryption.
This feature is advantageous as modern CPUs have hardware support for these instructions, making the performance impact negligible.
But only if the kernel determines that the CPU has the necessary support, which was in fact missing in this version of the kernel.

{% highlight "bash" %}
cat /sys/module/icp/parameters/icp_gcm_imp | grep avx
{% endhighlight %}

Upon validation, it became apparent that the system was utilizing encrypted SSDs without any hardware support.
As a result, it struggled to keep up with the disk writes, leading to performance issues.

## Potential Mitigations

The potential solutions are straightforward:
1. **Wait for a kernel update to resolve the issue** - This entails only package updates and a restart, but is not suitable for a production system. 
2. **Migrate the ZFS RAID** - If encryption is optional, it is feasible to migrate the setup to unencrypted disks until the patch arrives, though not often possible for production.
3. **Rolling Back to Backups** - Since the problem is caused due to an upgrade of the Kernel and ZFS it is possible to roll the Host back to a previous version. 

## Post Mortem and Takeaway
In this section, I will summarise the most important Takeaways.

### Backups, Backups, Backups
To prevent large amounts of stress when resolving critical errors, it is crucial to have complete backups (stored on a separate server). 
Additionally, it is crucial to validate the backups and ensure their readiness for use.
These backups should be performed regularly, at minimum nightly, depending on the workload. 
ZFS supports snapshots for this purpose.

### Documentation & Knowledge Sharing
It was useful for me to be the one who initially set up the entire Proxmox system, as it provided me with a thorough comprehension of its internal operations.
In order for other DevOps team members to address issues, effective documentation and knowledge sharing are critical as always.

### Careful Tool Selection
The tools and software used in production must
be carefully selected to ensure that they are production-ready.
Ideally, such issues as those described above should never occur.
However, if they do, actively developed open source projects or paid software with sufficient support can help mitigate any bugs quickly. 

---
<a href="https://github.com/openzfs/zfs/issues/15276" target="_blank">[1] - Issue#15276, openzfs/zfs</a>  
<a href="https://git.proxmox.com/?p=pve-kernel.git;a=commit;h=9ba0dde971e6153a12f94e9c7a7337355ab3d0ed" target="_blank">[2] - projects/pve-kernel.git, Proxmox</a>  
<a href="https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2034745" target="_blank">[3] - Bug#2034745, Ubuntu</a>  
<a href="https://forum.proxmox.com/threads/slow-zfs-encryption-will-we-get-a-fix-for-avx-avx2-not-being-selected.133681/" target="_blank">[4] - Forumpost, Proxmox</a>  
