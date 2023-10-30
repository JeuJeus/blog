---
title: Microsoft researchers leak 38TB of internal data - for the sake of "AI"
description: Microsoft AI researchers aimed to share a model featured in a paper. Consequently, they generated a SAS token to retrieve the model from a storage bucket and shared a link publicly on GitHub. Unfortunately, the link unintentionally provided access to all the Buckets contents. This article discusses the resulting implications.
date: 2023-09-19
tags:
  - security
  - microsoft
  - Sensitive Information Disclosure
  - Storage Bucket
  - SAS Token
---
## Regarding the Risk of Admin for all Tokens

Whilst releasing a repository of open-source training data on GitHub, the AI research team from Microsoft inadvertently exposed 38 terabytes of additional private data.
This included a disk backup of two staff members' workstations comprising of sensitive information such as passwords, private keys, secrets, and over 30,000 internal Microsoft Teams dialogues.
The researchers shared their files employing an Azure feature identified as SAS tokens, which enables sharing of data from Azure Storage accounts.  

Security researchers from WIZ discovered that the GitHub repository called "robust-models-transfer" was located within Microsoft's account linked to the bucket.

{% image "./github-screenshot.webp", "Screenshot of the Repository [1]" %}

This leads to a significant error.
While the bucket remained private, the origin of the leak was the token's scope.
The token provided not only full access to the 38TB data in the bucket, but also full permission, including write access.[1]

A notable issue is the lack of visibility an administrator has into the vulnerability in the first place.
Furthermore, there exists a lack of monitoring capabilities when it comes to SAS-Tokens, rendering them as an effective way of granting access to malicious actors following initial ingress. 
This has been acknowledged by Microsoft themselves. [2]

It is intriguing that prior to its discovery, this token was accessible to the public from July 2020 until June 2023 - a period of three years.
Interestingly, despite being scheduled to expire after one year, its expiration date was subsequently updated to 2051(!).
It was not until June 2023 that the security vulnerability was detected and subsequently reported.

### Implications and Thoughts
Microsoft, being one of the world's largest cloud providers, has a role model function. 
Despite a number of significant incidents occurring recently (e.g. [3], such occurrences serve to erode the trust of clients and partners alike.    
This begs the question as to how it is possible to create tokens with such a wide range of private resources without any alarms being raised at all.
It is highly questionable why a member of Microsoft staff required this capability.
Furthermore, it is intriguing that a member of staff apparently has access to 38TB of internal data, such as their colleagues' backups.  

If Microsoft cannot secure their own data, why should I trust them with my company's data?

## Takeaway

It is important to implement best practices for security.
As this case points out, even the basics are critical, so lets start with them.  

I want to talk about the **Principle of Least Privilege** [4].
This principle is based on the assumption that every actor, whether a person or a program, should only be granted the necessary permissions and access needed to complete their assigned tasks.
Any unnecessary permissions and access should be revoked to prevent potential security breaches, such as a staff member granting a token with an excessive scope. 
Adhering to this principle ensures that such exposures are prevented from occurring in the first place.

At the same time, this incident highlights the importance of having effective **monitoring, logging and alarm systems** in place.
A robust infrastructure must be established for administrators to be alerted of excessive tokens.
If, as it appears to be the case with Microsoft, such data control was not intended, then the information publishing process should be improved at the very least.
GitHub already has automated vulnerability scanning in place, which can and should be extended as well as secured by human Review.
Prior to article publication, code review and monitoring of linked bucket permissions should occur.

---
<a href="https://www.wiz.io/blog/38-terabytes-of-private-data-accidentally-exposed-by-microsoft-ai-researchers" target="_blank">[1] - 38TB of data accidentally exposed by Microsoft AI researchers, WIZ</a>  
<a href="https://www.microsoft.com/en-us/security/blog/2023/09/07/cloud-storage-security-whats-new-in-the-threat-matrix/#:~:text=Create%20SAS%20Token" target="_blank">[2] - Cloud storage security: What’s new in the threat matrix, Microsoft</a>  
<a href="https://thehackernews.com/2023/09/outlook-breach-microsoft-reveals-how.html" target="_blank">[3] - Outlook Hack, Hackernews</a>  
<a href="https://csrc.nist.gov/glossary/term/least_privilege" target="_blank">[4] - least privilege, NIST</a>

