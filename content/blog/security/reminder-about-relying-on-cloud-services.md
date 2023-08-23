---
title: What happens when you rely on Cloud Services - What about your (Ops)Backups?
description: As a result of a ransomware attack, a Danish cloud provider irrevocably loses all customer data.
date: 2023-08-23
tags:
  - security
  - ransomware
  - data loss
  - cloud
  - backups
  - desaster recovery
---

## Do you practice backup best practice? 

Relying solely on one Cloud Provider for infrastructure or backups might not be ideal as they could potentially lose all your data.


This was the case with the Danish cloud provider, <a href="https://cloudnordic.com/" target="_blank">"CloudNordic,"</a> when they were hit with a ransomware infection in the early hours of August 18th, <a href="https://www.theregister.com/2023/08/23/ransomware_wipes_cloudnordic/" target="_blank">as reported by The Register</a>.  
The provider refused to pay the hackers' ransom, resulting in the loss of most of their customers' data.

It should be noted that the provider denies any occurrence of a data breach, yet admits to having no knowledge of how the hack was conducted at present.
These two statements do not align well.

### So what is the Key Takeaway? What can we learn from this?

#### Regarding Trust
Firstly, security is not a state, but rather a process.
Therefore, it is not advisable to rely on third parties for ensuring the safety and security of your operations and data.

#### Regarding Backups
But much more important - implement a backup strategy that does make sense.
A simple rule of thumb is the <a href="https://www.backblaze.com/blog/the-3-2-1-backup-strategy/" target="_blank">3-2-1 Backup Strategy</a>.  

- Keep (at least) *3* copies of your data.
- *2* local copies on _different_ mediums (e.g. Computer and NAS/Server)
- *1* off-site copy (e.g. a external HDD in your moms house / a bank deposit box)

#### Regarding Desaster Recovery
Backups are beneficial, but having a plan for restoring usable data after a catastrophic failure is superior.
It is crucial to have a comprehensive strategy in place.

- Have a Desaster Recovery plan for your Ops _before_ Disaster happens
- Validate your Backups (Software like Vorta/Borg or ZFS-Snapshots provide repair+integrity checks with convenience)
- Be sure to not only encrypt your data but being able to decrypt it too.
- Validate that restoring from Backup works
- Prepare not only for Data failure but for failing devices (and subsequent necessary setup) too 

But always keep-it-simple-stupid. Overengineered, cool and fancy solutions do not help if the threshold to actually use them is too high due to their absurd complexity.



