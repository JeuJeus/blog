---
title: On German Law working against Disclosure [Links in German]
description: The public prosecutor's office in Cologne obtains a criminal case against the security researcher in the Modern Solution trial
date: 2023-08-16
tags:
  - security
  - germany
  - jurisdiction
---

## Goodbye to Disclosure of Vulnerabilities?
_This is a short summarization of the events, not the full story, therefore i linked the relevant articles._

In 2021, Mark Steier a security researcher found a vulnerability in Modern Solution's software.
This consisted of the fact that the credentials of the live database was hardcoded in the source code.
This Breach exposed 700.000 customers Datasets, consisting of several large german Companies Data.  
<a href="https://www.heise.de/news/Modern-Solution-Jetzt-doch-Hackerparagraf-Verfahren-gegen-Sicherheitsforscher-9246117.html" target="_blank">Link to related Source from Mark Steier [in German]</a>

This Vulnerability was disclosed to the Distributor of the Software.
But instead of expressing gratitude - Steier was sued.
<a href="https://www.heise.de/news/Modern-Solution-Jetzt-doch-Hackerparagraf-Verfahren-gegen-Sicherheitsforscher-9246117.html" target="_blank">Link to related Source [in German]</a>

After some back and forth, Steier is now facing a lawsuit after the public prosecutor's office in Cologne ruled that decompiling the source code _"requires a deep understanding of programming languages and software development"_.
Therefore he is no threated under the so called "Hackerparagraph" (§202 StGb) for _"Spying out data"_.
<a href="https://www.heise.de/news/Modern-Solution-Jetzt-doch-Hackerparagraf-Verfahren-gegen-Sicherheitsforscher-9246117.html" target="_blank">Link to related News Article from Heise [in German]</a>

### Consequences
This case as a whole, and the prosecution in particular, sets a dangerous precedent.
Based on the decision, future responsible disclosure attempts could decrease significantly.
Faced with being sued for a good deed, it is likely that those who find security vulnerabilities will think twice about disclosing them to the originator.
