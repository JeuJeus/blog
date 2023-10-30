---
title: State of S3 - Your Laptop is no Laptop anymore - a personal Rant
description: The state of laptop standby is currently dysfunctional. This personal rant outlines the events that have led to this situation.
date: 2023-10-29
tags:
  - laptops
  - linux
  - microsoft
  - 'modern standby'
  - dell
  - s0ix
  - s3
  - lenovo
  - portability
  - 'connected standby'
---

In this article, I aim to take a different approach.
We will begin by defining a laptop according to my understanding.
The I will share my personal history and journey to this point, as well as my current situation with my home and work
laptops.
Using this perspective, we will explore the current dysfunctionality of the standby function in modern laptops, followed
by a discussion of why this feature still has relevance and right to exist.
Finally, we will draw conclusions on what we can learn and take away from this.

## My Definition of a Laptop

It is a straightforward concept: a laptop, being a portable computer, should allow for easy use wherever one goes.
It is a machine that can be taken along while working, then by closing the lid put to sleep for later use.
At a later time, it should allow you to pick up where you left off.

However, in recent times, achieving this seemingly straightforward goal has become increasingly difficult to achieve.
If you find this hard to believe, stay tuned for more.

## My Situation and Point of View

So, without further ado, let me begin by laying out my perspective.  
Throughout my professional and educational career, I have used a wide range of servers, desktops and laptops.
In my first semester at university, I began using Linux exclusively on my laptops.  
I was fortunate to own a Lenovo Thinkpad E470 during that period, which offered excellent Linux support.
However, this decision has had a major impact on my choice of laptops in the future.  
Linux support for specific components was substandard back then and remains so today.
As of today, Network Cards and dedicated Graphics Cards in Combination with internal ones (e.g. Nvidia Optimus) remain
the typical pain points.
But issues such as the requirement for complex drivers due to the current "Windows Hello"-certified IR webcams and array
microphones were not present in the past.

Therefore, as Lenovo was consistently praised for their exceptional Linux support, I continued purchasing their
Thinkpads such as the X240 or X380.
I only made minor adjustments, such as switching out the Wifi-NIC for an inexpensive Intel one.
My previous laptops were adequately powered Linux machines, which were reliable wherever I went.

My first work laptop, the Dell XPS 15 9570, was a continuation of this trend.
Despite encountering a minor obstacle regarding the proprietary fingerprint reader, which required non-existent
proprietary drivers, everything functioned seamlessly.
With more time spent on the road and working from home due to Covid, than at a docking station in the office, I have
certainly enjoyed the smooth, pain-free experience.

As I currently have another XPS 15 9570 for personal use, I can confirm that S3 is still supported at the time of
writing.
This is evident from the command output below, indicated by [deep].[2]

{% highlight "bash" %}
$ cat /sys/power/mem_sleep

s2idle [deep]
{% endhighlight %}

Another non-existent issue were sleep problems.
Until they hit me at the moment i received my new Work-Laptop, which was a Dell XPS 15 9500.
Let me clarify - the sleep issues are not linked to Linux and continue to occur even with my current Dell XPS 17 9720.

## The Status Quo

What happened and why?  
At first glance, it seems quite simple.
For the past decade, Microsoft has been forcing the migration from S3 standby to S0 "modern standby".

However, there's more to this than meets the eye.
There are two questions to answer.

- What is modern standby and how is it implemented?
- Why did Microsoft force the migration to "modern Standby" if it breaks standby?

### The technical Aspects

Traditional Sleep requires all system hardware and software components to work together.
The operating system must support Sleep, as well as the hardware (e.g. CPU) and the BIOS/UEFI.
According to the UEFI to Hardware Interface Standard (ACPI), this usual form of sleep is referred to as S3.
S3 is a Sleep State in which all system components, except for the RAM and CPU Cache, are powered off.[4]
This is a good compromise between power consumption and the time required to resume from sleep.
However, it is important to note that the CPU is completely powered off.

Microsoft began rolling out "Modern Standby" (or S0ix) in 2012, with the ultimate goal of replacing S3 sleep.
The aim is to provide similar or improved energy savings to those of S3.
However, unlike S3, S0ix keeps the CPU and necessary system components active.
S0ix sets the CPU to a low-power idle state to reduce power usage when not in operation.

But why is my CPU being used when sleeping?  
This is where the "modern" aspect of "modern sleep" comes into play.
With the rise of smartphones and tablets, we have become accustomed to waking up quickly to get notifications, download updates or activate voice assistant services.
Microsoft aims to replicate this functionality with S0ix.[1]
Your computer should be able to allow for the usage of _Cortana_ and receive Windows Updates during Sleep mode, among other features.

This introduction of functionality during sleep state, is the reason why Microsoft describes S3 as "Legacy Sleep".[1]
Our story would end at this point if it weren't for the complications that arise from S0ix, as indicated previously.

### The Problems

S0ix would be great if it worked.
But unfortunately it does not - laptops die from overheating, draining their battery in the process.[1]

This issue is not limited to Linux, as Dell officially warns to power down your Laptop before placing it in a backpack.[7]
Which brings us back to my Definition of a Laptop from above.
This kind of defies the purpose of a Laptop in my opinion.

So as Microsoft themselves enforced S0ix upon us and Intel states compatibility, the cause of our problems must be the manufacturers!  
But Microsoft Surface Devices suffer from the same overheating and battery drain issues as well.[8]

It seems that even more than a decade after the migration away from legacy sleep started, there is still work left to do, smoothing out even the roughest edges.
And due to the involvement of many system components, the fixes need to be applied in the OS/Kernel, ACPI/UEFI, CPU from every vendor along the chain.

But we can still use S3 sleep, can we?  
This is the biggest bummer in my opinion, with the migration to S0ix Laptop manufacturers have began deprecating S3.
This has lead to them stopping to fix bugs and retain functionality.[2]
In the case of Dell, this has straight up lead to the complete removal of S3 from the UEFI.[3]

So now we have non-portable Laptops with broken S0ix and removed or broken S3.

## Takeaway

We can only achieve advancement in regards to Sleep by adopting a new Standard which promises great features.
Therefore we need a supporter with huge market influence that can bring a potential standard to the market.
This definitely works in regard to Microsoft and i wholeheartedly support their chase of improvements.
Their aim with S0ix is relatable and can somewhat be compared to Apples move to force USB-C on everyone - which is great and a necessity to be done by a market leader.
But in Contrast, Apple kept the legacy Lightning and even brought back Magsafe (and if it only were to milk the cashcow).

All in All the current situation is unfeasible.
I am not certain if the current problems are related to the Limitations of x86 in comparison to ARM (A potential article could explore those).
But i can not accept a Laptop that constantly dies from overheating or greets me with a drained battery in a working environment.

Fortunately, S3 is still supported by CPU and some Laptop Manufacturers.
Therefore Consumers have the option to state their disapproval with the current state of S0ix by buying Laptops that still support S3.

---

### Sources
<a href="https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby" target="_blank">[1]
What is Modern Standby, Microsoft</a>  
<a href="https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate" target="_blank">[2] Power
management/Suspend and hibernate, ArchLinuxWiki</a>  
<a href="https://www.dell.com/support/kbdoc/en-us/000177661/what-is-modern-standby-and-how-does-it-differ-from-s3-standby" target="_blank">[3]
What is Modern Standby and how does it differ from S3 Standby , Dell</a>  
<a href="https://uefi.org/specs/ACPI/6.5/02_Definition_of_Terms.html#sleeping-and-soft-off-state-definitions" target="_blank">[4]
ACPI Spec, Sleeping and Soft-off State Definitions, UEFI</a>  
<a href="https://www.intel.com/content/www/us/en/docs/socwatch/user-guide/2020/s0ix-states.html" target="_blank">[5]
S0ix States , Intel</a>  
<a href="https://lore.kernel.org/linux-acpi/20220505015814.3727692-1-rui.zhang@intel.com/" target="_blank">[6]
linux-acpi.vger.kernel.org archive mirror, Phoronix</a>  
<a href="https://www.dell.com/community/en/conversations/xps/faq-modern-standby/647fa2d5f4ccf8a8de87e727" target="_blank">[7]
linux-acpi.vger.kernel.org archive mirror, Phoronix</a>  
<a href="https://answers.microsoft.com/en-us/surface/forum/all/surface-laptop-3-overheats-in-sleep-mode-windows/49694ff3-8e41-4ffb-9cd5-27ea5fd054a2" target="_blank">[8]
Surface Laptop 3 overheats in Sleep mode (Windows 11), Microsoft Help</a>  