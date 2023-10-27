---
title: MINIX - The Worlds most used Computer OS & The Security Implications for your PC 
description: There is a hidden subsystem embedded within your CPU that contains a fully functional operating system, which you cannot control. What are the security implications and how does this affect you?
date: 2023-10-27
tags:
  - intel
  - amd
  - cpu
  - "management engine"
  - ME
  - MINIX
  - security
  - PSP
  - "Platform Security Processor"
---

_Let's be clear, it's a well-known fact that there is a hidden operating system in your CPU - but talking to my fellow CS professionals, I've found that this fact is still not widely known.
Thus, this article aims to spread the word. We will also discuss common misconceptions and the implications._ 

Ok, there is a covert MINIX operating system embedded within every Intel CPU made after 2008 - What is its purpose?

{% image "./Minix-inside.png", "Humoristic Version of the Intel inside Logo" %}[4]

## The Facts

Every Intel CPU manufactured post-2008 features a covert coprocessor nestled within the processor itself, which is inaccessible and unobservable to end-users and even the primary processor.[1]    
But don't celebrate too soon, as using AMD doesn't exempt you from this issue. 
It also applies to AMD, in the form of their "Platform Security Processor".[2]
For the purposes of this article, we will exemplarily focus on the extensively researched Intel "Management Engine".

Very problematic is the fact that there is a dedicated OS running on your hardware at any time (as long as power is supplied to the CPU).
Not only is there no option to disable it but the CPU's Firmware is closed source as well.
Not only is the code closed source, but it is also obfuscated using Huffman tables where the tables required for decryption are integrated into the hardware, therefore being non accessible from outside of the CPU.[6]
Making matters worse, updates are only provided until your CPU's End of Life (EOL) support, which currently (at the time of writing) means that any Skylake or Haswell-E processor (Intel i 6th gen) no longer receives updates.[5]   

### The MINIX

To clarify, the operating system being discussed is a closed source version of Minix 3, which is a
Unix-like OS created by Andrew Tannenbaum in the 1980s and released under the BSD-3 Clause for educational purposes.  
What's particularly interesting is that Tannenbaum wrote an open letter to Intel upon discovering they were using his OS in their Intel ME. 
In the letter, he expressed his surprise at their use of Minix.  
He also noted that Intel had approached him in the past to request certain changes and features for his operating system. 
After discovering their reasoning behind it, these requests made more sense.
MINIX is extremely modular and permits the omission of significant segments of its content during the build process - rendering it well-suited for deployment in the limited environment of the ME.[3]

### Regarding Privileges

To comprehend the capabilities of the ME, it is essential to become familiar with the usual ring architecture used by your computer.
A graphical overview is visible in the image below.  
The concept of privilege rings is alike to layers of an onion, where every subsequent layer, corresponding to a lower number, possesses higher privileges.
The layers marked by negative numbers typically remain concealed and unknown to most users.  
Below the usual higher level privilege layers, ranging from User (3) to the Kernel (0, in this case Linux), as well as the Hypervisor (-1, such as Xen), there are additional layers.
First, there is System Management Mode (SMM, -2) and UEFI (-2).
_SMM is a prime candidate for another episode, as it runs an additional Kernel in 8086/16-bit mode._  

{% image "./Intel-Rings.png", "Ring Topology of your Computer"%}[7]

The article focuses on the ME running Intel's Minix Version (-3).  
This is the most privileged Ring that exists, higher than anything else running on your Computer but completly intransparent and hidden.[7]

### The processes operating within your CPU

What exactly does the ME run?
Just a quick except:
It has a complete TCP/IP Network Stack (Layer 4/6) as well as a web server.
The ME has unlimited access to any hardware, enabling it to record any keystroke, network packet, and device plugged in.
This also implies that it can modify the content of your HDD and RAM without your knowledge at any time.[8]

## Security Implications
A quick recap:
I am writing this article on my personal laptop, a Dell XPS15 9750 equipped with an 8th generation Intel processor, during a train journey.
The laptop can still enter S3 sleep mode (_another Rabbit Hole to visit in a potential article_), allowing it to remain powered on at any given moment due to its internal battery.
But this is irrelevant since the ME can function independently of the OS at any time.
The ME also has network support and can use the laptop's Wi-Fi card.
As a result, there may be at any given time a fully-functional x86 processor running in my backpack with a full operating system (and network access).  

The closed-source and obfuscated operating system of ME makes it impossible to determine its actions and may lead to undiscovered security vulnerabilities.
Potential security vulnerabilities may remain concealed and never be remedied, even intentionally.
Furthermore, the involvement of the NSA in the code running on the ME adds insult to injury. [8]

Due to Ring -3 hardware access, various security measures can be compromised by any party with access to the ME:
- Encrypted hard drives are not effective as the ME has control over any decryption keys, whether it be through your TPM or keyboard input.
- Encrypted communication is not secure as the ME can intercept any decrypted communication on your end, acting as a man-in-the-middle.
- The use of anonymization technology is also not effective as the ME can still uncover your true identity.
- Securing your network against invaders may not be effective as the ME is already present, capable of concealing Command and Control (C&C) instructions in any network communication be it FW Binary Blobs or Network Packets without your notice.

None of the aforementioned can be easily identified, and may even go undetected, when carried out by a Nation State Actor, like the NSA, who is unintentionally involved as stated earlier.
This is the part where I need to state that dealing with Black Box concepts on this scale and at this level makes it hard to steer clear from conspiracies.  

Therefore, let us imagine that Intel's intentions are purely for our benefit, and that no Nation State Actors are involved with the Management Engine.
Any CPU without the latest firmware updates, vulnerable to possible exploitation, poses a significant security risk.
As CPUs reach EOL at some point in time this can and will happen.
As a result, it would be beneficial if Intel were to grant us the ability to mitigate these issues by disabling this super privileged entry point for hackers.

---
### Sources
<a href="https://www.youtube.com/watch?v=iffTJ1vPCSo" target="_blank">[1] - Replace Your Exploit-Ridden Firmware with Linux - Ronald Minnich, Google</a>  
<a href="https://www.eteknix.com/nsa-may-backdoors-built-intel-amd-processors/" target="_blank">[2] - NSA May Have Backdoors Built Into Intel And AMD Processors, Ryan Martin</a>  
<a href="https://www.cs.vu.nl/~ast/intel/" target="_blank">[3] - An Open Letter to Intel , Andrew Tannebaum</a>  
<a href="https://medium.com/swlh/negative-rings-in-intel-architecture-the-security-threats-youve-probably-never-heard-of-d725a4b6f831" target="_blank">[4] - Negative Rings in Intel Architecture: The Security Threats That You’ve Probably Never Heard Of, RealWorldCyberSecurity</a>  
<a href="https://www.intel.com/content/www/us/en/support/articles/000022396/processors.html" target="_blank">[5] - Changes in Customer Support and Servicing Updates for Select Intel® Processors , Intel</a>  
<a href="http://io.netgarage.org/me/" target="_blank">[6] - Intel ME (Manageability engine) Huffman algorithm, Netgarage</a>  
<a href="https://www.cnx-software.com/2017/11/07/minix-based-intel-management-engine-firmware-uefi-are-closed-source-insecure-nerf-to-the-rescue/" target="_blank">[7] - MINIX based Intel Management Engine Firmware & UEFI are Closed Source & Insecure, NERF to the Rescue!, Jean-Luc Aufranc</a>  
<a href="https://www.zdnet.com/article/minix-intels-hidden-in-chip-operating-system/" target="_blank">[8] - MINIX: Intel's hidden in-chip operating system, Steven Vaughan-Nichols</a>  
<a href="https://www.bleepingcomputer.com/news/hardware/researchers-find-a-way-to-disable-much-hated-intel-me-component-courtesy-of-the-nsa/" target="_blank">[8] - Researchers Find a Way to Disable Much-Hated Intel ME Component Courtesy of the NSA, Catalin Cimpanu</a>  
