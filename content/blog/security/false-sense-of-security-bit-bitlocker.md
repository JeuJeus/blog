---
title: Bitlocker offers a deceptive sense of security
description: The standard configuration of Windows Disk Encryption BitLocker can create a misleading impression of safety due to the fact that it transmits the Decryption Key in plaintext during boot, thus allowing the encryption to be bypassed by intercepting the key.
date: 2023-08-26
tags:
  - security
  - bitlocker
  - windows
  - tpm
  - deceptive security
---

## What makes BitLocker less secure?

BitLocker is a reliable method for encrypting your Windows installation, suitable for both personal and business purposes.
Using BitLocker is acceptable and advisable.  
Problematic is the default way the Decryption is implemented and configured.
By default Bitlocker relies on transporting the Decryption Key for the encrypted partition in cleartext from the TPM to the CPU.  

The emergence of a new report on this vulnerability has reminded me of the potential issues raised by this approach. [1]  
But this should not come as a surprise, as there was already an article on arstechnica in 2021 covering the same problem. [2]  
This implementation presents a vulnerability as it allows for the interception of traffic between the TPM and CPU, enabling attackers to bypass disk encryption with relative ease using low-cost and relatively simple hardware.

The issue in this case is that, in theory, TPMs enable the use of encrypted sessions that could mitigate passive sniffing attacks, similar to how it is implemented on Linux with LUKS.[3]

### What can be done about this?
Microsoft already provides clear documentation on BitLocker in their FAQ, recommending the addition of a PIN for the decryption process to begin. [4]
This method provides sufficient mitigation with relative ease. [5]

### Takeaway - Or why Linux/Luks/ZFS require Pin-Input for the Boot process to begin
The standard BitLocker implementation can give an inaccurate perception of security.  
While it would be possible for Microsoft to upgrade the TPM communication to encrypted traffic, thereby mitigating the vulnerability, a more effective solution would be to require the user to set a pin for the Boot process.
Currently, this is the standard for Linux-based systems.

*So, if anyone asks why a password is required for encrypted Linux installations to boot while Windows can boot without one, now you know.*

### Sources
<a href="https://www.errno.fr/BypassingBitlocker.html" target="_blank">[1] - Bypassing Bitlocker using a cheap logic analyzer on a Lenovo laptop, Guillaume Quéré</a>  
<a href="https://arstechnica.com/gadgets/2021/08/how-to-go-from-stolen-pc-to-network-intrusion-in-30-minutes/" target="_blank">[2] - Trusted platform module security defeated in 30 minutes, no soldering required, DAN GOODIN </a>  
<a href="https://news.ycombinator.com/item?id=37250963" target="_blank">[3] - Hacker News, als0</a>  
<a href="https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/prepare-your-organization-for-bitlocker-planning-and-policies#what-areas-of-the-organization-need-a-more-secure-level-of-data-protection" target="_blank">[4] - Prepare an organization for BitLocker: Planning and policies, paolomatarazzo</a>
<a href="https://ekiwi-blog.de/en/50353/bitlocker-activate-pre-boot-bitlocker-pin/" target="_blank">[5] - Bitlocker – Activate Pre-Boot Bitlocker PIN, Andy</a>