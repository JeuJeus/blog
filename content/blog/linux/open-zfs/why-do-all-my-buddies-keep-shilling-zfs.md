---
title: Why do all my Buddies keep shilling ZFS?
description: This Blogposts explores the OpenZFS File System and why it probably is the last File System you will ever need. 
date: 2023-09-08
tags:
  - zfs
  - linux
  - file system
  - server
---

We all have a friend who constantly tells us about new technological features and quirks. However, we may feel hesitant to try them out ourselves.
That was exactly the case for me when a friend introduced me to ZFS.
It wasn't until later that I had the chance to experience it for myself.
Since then, I have become an advocate for changing the default file systems of my friends.

## How ZFS came to be
ZFS was initially created for OpenSolaris by Sun Microsystems, and later adapted for FreeBSD. [2]
Following Sun's acquisition by Oracle, ZFS was made proprietary, causing two-thirds of its original developers, including its creators, to resign and create OpenZFS, an open-source fork with
the goal of making ZFS available to all.[1]  
_In general, any non-specific reference to ZFS, except for the excerpt on its history, refers to the OpenZFS fork._

## What exactly is ZFS?
ZFS is more than only a Filesystem, it combines the functionality of a File System and a Volume manager.
That means that ZFS is able to create a file system spanning across more than one drive or a pool of them.
Additionally, ZFS handles any partitioning and formatting required.

{% image "./ZFS-vs-common-FS.gif", "ZFS versus Common FS" %}  
[5] - Ironically, an image from an article on proprietary ZFS is applicable since the same concepts are used.

## Why isn't ZFS more popular.
ZFS is mainly constrained by a licensing problem.
The CDDL license [4], which governs ZFS, is incompatible with the Linux Kernel's licensing under the GNU GPL.
The CDDL license mandates that every prior developer give their approval for a license change, which is an intricate process, particularly when some of the developers are no longer available or, at worst, deceased.
Hence, it is challenging to include ZFS in Linux Distributions as the default option.[2]

## Why you should use ZFS - Lets talk Features
ZFS was developed with the following Key Points in Mind [2]:
- Protection against data corruption. Integrity checking for both data and metadata.
- Continuous integrity verification and automatic “self-healing” repair
- Data redundancy with mirroring
- Support for high storage capacities
- Space-saving with transparent compression 
- Hardware-accelerated native encryption
- Efficient storage with snapshots and copy-on-write clones
- Efficient local or remote replication

But let us have a look at some of them in more Detail:


_This Blogpost only serves as an Introduction to ZFS, for deeper coverage refer to the sources linked below._
---
<a href="https://wiki.gentoo.org/wiki/ZFS" target="_blank">[1] - OpenZFS Gentoo Wiki</a>  
<a href="https://openzfs.org/" target="_blank">[2] - OpenZFS Wiki</a>  
<a href="https://github.com/openzfs/zfs" target="_blank">[3] - OpenZFS Github</a>
<a href="https://en.wikipedia.org/wiki/Common_Development_and_Distribution_License" target="_blank">[4] - Common Development and Distribution License Wikipedia</a>
<a href="https://www.fujitsu.com/global/products/computing/servers/unix/sparc-enterprise/software/solaris10/zfs/" target="_blank">[5] - Solaris ZFS of Solaris™ 10 Operating System function Fujitsu</a>