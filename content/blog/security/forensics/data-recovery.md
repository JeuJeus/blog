---
title: On Data Recovery - Introduction to Digital Forensics 
description: With either your Hard-drive failing or deleted files needing to retrieved, data recovery is an interesting field. This article gives a brief overview about relevant tools and technical approaches. 
date: 2023-12-15
tags:
  - data recovery
  - forensics
  - digital forensics
  - deleted files
  - logical backup
  - ewf
  - xmount
  - photorec
  - sleuthkit
  - autopsy
---

_the impulse for this article came from a colleague in need for help, making sure to recover all files from a failing hard-drive._  

In this article we will briefly cover the different techniques that can be used for data recovery and their impact on the expected output.
Whilst exploring those techniques we will examine available tools for each approach and detail their abilities and typical use-cases.  
As this topic is one of the bigger specialties of cyber securities, we will just barely scratch the surface in this article.

### Collection Levels
When collecting digital evidence in the wake of forensics or just creating a backup for data restoration purposes, there are different types of data collection.
The images below illustrate the differences between the possible levels, which we will examine in the following.

{% image "./logical-vs-physical-copy.png", "Difference of logical vs physical Data Copy" %}
[1]

In theory, it is always possible to directly work on the disk we want to restore data from or do forensic evidence collection.
But in reality we are strongly discouraged to do so out of different reasons.
When working with a failing disk, we want to induce as litte additional strain to the hard-drive as possible.  
Enlarging our chance of success in retrieving all data from it.
When working with evidence, it is important to ensure not being able to (accidentally) temper with evidence.
Therefore, an image is used for all analytical purposes.  
In order to be sure to achieve only reading data and not writing any, physical and software write blockers can be utilized.

#### Logical Collection
The least valuable in terms of data restoration and from an evidence collection standpoint is the logical collection of the data present in the filesystem.
To utilize this variant it is necessary to mount the filesystem, which can be tricky with specific filesystem, like Apples APFS which have no native Linux-Support.
This one allows us to collect all files and folder as well as their metadata present, in the same way one would copy files to an external thumb drive.
But at the same time we lose the ability to retrieve filesystem metadata, which would help in restoring corrupted or deleted files.
Therefore, this variant should only be utilized in the most basic cases, with no necessity for recovery, rather than plain data retrieval.

#### Physical / Forensic Collection
Extending on our previous approach to data collection we can utilize a physical copy of our disk in formats like `.img` and `.iso`.
Those formats not only include the data transparently present on the filesystem (in one partition) but the empty and unallocated space, including every partition as well. 
As digital forensics is used in court cases and crime investigations in general, the field is heavily dependent on proofable, reproducible backups.
Therefore, the expert witness format `.ewf` exists on top of the previous mentioned ones.
This allows for things like checksums and other advanced features.[3]

{% image "./collection-levels.png", "Different Data Collection Levels" %}
[2]

The primary used (Linux) Tools for Image creation are the omnipresent **dd** for a bit-for-bit copy of the disk and **fktimager** and **ewfaquire** as the forensic tools of choice.

### Analysis
Afterward we need to mount the images, with tools like **losetup**, **mount** and **ewfmount**.  
This allows us to examine the disk for our precious data or forensic evidence.  
In order to recover files, tools like **photorec** provide an easy-to-use CLI with straightforward usage and often sufficient results.  
For the process of gathering evidence, the Open-Source forensic suite consisting of **autopsy** and **sleuthkit** can be utilized to collect case data.
These tools provide a GUI Interface which makes it easy to collect, cluster, structure and organise data which can be processed further.
Whilst a file focussed tool like photorec can recover deleted images, autopsy automatically analyses the present browsers data and processes them into bookmarks, history and so forth.

### Desaster Recovery and Disassembly based Collection
Extending the approach of low level data collection even further, the option to tamper with hardware always remains.
In Cases where the SSD or Hard-Drive Controller is damaged, there is the last resort option to conduct professionals wo can chipoff the NAND from your SSD or transplant the disks of your hard-drive into a donor one.
As this measure needs to be carried out in an industrial clean room and requires vast experience, it is a very costly move.
But the chance to recover your precious crypto-wallet is maximized.  
Afterward the usual recovery process, explained above takes place.
But keep in mind, that Drives are susceptible to Bit-Rot too.[4]

---
## Sources
<a href="https://www.slideshare.net/usainvestigators/cf-slides" target="_blank">[1] - Overview of the Digital Forensics Process</a>  
<a href="https://percipient.co/overview-the-three-types-of-forensic-collections-physical-vs-logical-vs-targeted/" target="_blank">[2] - Overview: The Three Types of Forensic Collections – Physical vs. Logical vs. Targeted</a>  
<a href="https://www.loc.gov/preservation/digital/formats/fdd/fdd000406.shtml/" target="_blank">[3] - Expert Witness Disk Image Format (EWF) Family</a>  
<a href="https://www.backblaze.com/blog/managing-for-hard-drive-failures-data-corruption/" target="_blank">[4] - The Shocking Truth — Managing for Hard Drive Failure and Data Corruption</a>  