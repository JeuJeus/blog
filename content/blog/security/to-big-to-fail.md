---
title: To Big To Fail - from Microsoft to "the Cloud" in general
description: The modern internet substantially relies on large corporations. This article will examine through a thought experiment whether they are too big to fail.
date: 2023-10-14
tags:
  - to big to fail
  - cooperations
  - security
  - internet
  - overreliance
---

Over the last few months, the hack of Microsoft's cloud infrastructure by the Chinese APT Storm-0558 has been widely
reported.
The impact of the hack has become increasingly clear in recent weeks, as IT professionals have gained a better
understanding of the situation.

Reports from July indicated that the hack had a significant impact:
> "The compromised key was trusted to sign any OpenID v2.0 access token for personal accounts and mixed-audience (
> multi-tenant or personal account) AAD applications."[2]

In the meantime, there have been reports about Microsoft's entire cloud infrastructure, including Windows (Login), being
compromised.
> "In my estimation, not only are large parts of the Microsoft O365 service compromised, but also all Windows computers
> that were connected to it. A super disaster of epic proportions - many people don't seem to be aware of it at the
> moment."[3] - translated from German

More problematic is the fact that potentially, even Microsoft themselves (potentially) do not know the entire impact of
Threat Actors' actions.
> "The problem is that you have no way to verify what may or may not have been done by malicious actors using
> compromised keys in the meantime." [4]

> "The attackers first managed to get access to Microsoft's development network, noticed a crashdump, understood the
> possible significance of that, dug through it, found a private key, then acquired enough insight into Microsofts
> authentication systems to understand how this key could be used beyond its intended purpose and then executed on that.
> And you don't believe they left persistent backdoors in some high-profile targets?"[5]

Let us steer clear of speculation and avoid potentially ambiguous language.
Instead, let us take a broader perspective, set loose from this specific hack, and engage in a thought experiment.

## A thought Experiment

Imagine a world where the technology we use daily is reliant on large corporations such as _MacroHard_, _Pear_,
_Numbers_, _Caspian_, _BackNewspaper_ and _Djin_.

Two companies, out of the six primary options available, dominate the market for mobile device operating systems for
smartphones and tablets, holding virtually all the consumer market share.
Out of the four popular operating systems, almost all of the market share in the consumer market is held by just two
companies.
The two remaining open-source operating systems currently dominate the server market. One of these is supported by a
large corporation, while both of them heavily relie on the infrastructure provided by these giants - exemplarily git,
servers, cdns, and secure boot.
The same can be said for a large proportion of web services, which either use the resources the giants directly or
provide authentication through these.  
In our world of experiment, everyone uses the ubiquitous cloud to store their data and to edit documents.
This applies not only to private data, but to all corporate data too.
It is incorrect to assume that governments only use their own infrastructure, as everyone is also reliant on large
corporations.

Therefore, it can be inferred that a significant proportion of the world's technological power is concentrated in the
hands of a few major players.

### The Meltdown

In theory, this question is easy to answer.
If one of these large corporations accounts for a significant portion of our digital world, it would create a
significant issue if it were to fail.
However, what if it cannot fa(i/l)l?

Let us imagine a situation where, by sheer luck, nothing serious has happened to the world of technology and the digital
lives of everyone connected to it.
Then, a Threat Actor suddenly arrives at the scene and, manages to successfully copy the Golden Masterkey, without being
catched.
He can now make his moves unnoticed for a while.
However, he is eventually caught, and the enchanted golden key is confiscated and reissued.
> As a result, we are now safe again!
> But can we really be sure?

### What are the Implications?

Let's begin with the simpler ones. 
There is a mechanism in place to replace the figurative "golden master key".
It would be wise for an intruder to ensure they have persistent access by creating a "golden key" alternative backdoor.  
Addressing the elephant in the room - a golden master key implies a chain of trust infrastructure.
Unfortunately, every device, data, login, and binary relying on this giant has to be considered corrupt.
So if we rely on the cloud for all our data, even if it can be corrupted? 
Yes, and the same goes for our devices and programs, even those not in the cloud.  
The solution is straightforward: replace the Chain of Trust starting by generating a new master key.
However, the intruder's persistent access complicates matters.
As we were unable to monitor all of their movements within our sacred halls, we cannot be certain that this action will remove them.  
Fortunately, there is a solution.
In cases where persistent threat actors have successfully penetrated a network this deeply, it is recommended to rebuild from scratch.
This approach will undoubtedly eradicate the intruder and restore trust, despite the possibility of data corruption and exfiltration of intellectual property having taken place before anyways.  

And here comes trouble: **Starting from Scratch will not suffice, we are _to big to fail_**.  

We cannot afford to rebuild every modern device and half of the internet from scratch.
This is not feasible.
This will not happen.

### What are the Takeaways?

As previously established, a period of time existed between the intrusion and the capture of the Threat Actor. During
this time, unobserved actions could have occurred.
In light of this, how can we prevent such actions from taking place?  
It is technically impossible to prevent all intruders, particularly those backed by nation-states with advanced
capabilities, from accessing our systems.
As a result, we must always assume that the attacker has the means to manipulate our systems.
However, what measures can we take to combat this?
We could incorporate immutable event logging, with enough information to be able to trace the actions of intruders in a
verifiable way.
However, this solution could prove costly, intricate, and ultimately ineffective in addressing the issue of thought
experiment giants experiencing impact and on the verge of tipping over.

> Imagine if the above were not merely a thought experiment, but rather the reality in which we live. This would be
> detrimental, would it not?

---
<a href="https://msrc.microsoft.com/blog/2023/09/results-of-major-technical-investigations-for-storm-0558-key-acquisition/" target="_blank">[1] -
Results of Major Technical Investigations for Storm-0558 Key Acquisition, MSRC, Microsoft</a>  
<a href="https://www.wiz.io/blog/storm-0558-compromised-microsoft-key-enables-authentication-of-countless-micr" target="_blank">[2] -
Compromised Microsoft Key: More Impactful Than We Thought, Shir Tamari, Wiz</a>  
<a href="https://social.tchncs.de/@kuketzblog/110773607467923832" target="_blank">[3] - Post [German], Mike Kuketz,
Mastodon</a>  
<a href="https://news.ycombinator.com/item?id=37707459" target="_blank">[4] - Comment, eqvinox, Hackernews</a>  
<a href="https://news.ycombinator.com/item?id=37710471" target="_blank">[5] - Comment, eqvinox, Hackernews</a>  