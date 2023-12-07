---
title: Success in fighting Censorship - DNS Resolvers Role in Copyright Infringement  
description: Large corporations are constantly seeking legal action to persuade courts to prevent DNS providers from resolving certain domains. This approach has implications in the area of censorship and is at the same time only symptom-fighting rather than really meaningful.
date: 2023-12-07
tags:
  - net politics
  - dns
  - quad 9
  - dns resolvers
  - copyright
  - infringement
  - drm
  - censorship
  - court ruling
  - sony
---
_In this article we will take a look at the implications of lawsuits from large cooperation's pursuing copyright infringements.  
We will start by detailing the recent results of court ruling in germany, where sony sued against a dns resolver.  
Afterward we will have a look on the meaningfulness of this proceed and the implications for censorship._

## What is the Court Case about?

>Sony Entertainment (Germany) started a legal proceeding against Quad9 more than two years ago to force Quad9 to stop resolving certain domain names which they claimed were involved in copyright infringement behavior.
[1]

Generally speaking Lawsuits like these are problematic (in Germany) since they can set a precedent, which forth following court-ruling will probably follow.
The Approach was "[...] such that commercial rights holders could demand that sites on the internet be made unreachable by forcing recursive resolvers to block content."

Noteworthy is the fact that neither the servers in question nor the TLD are registered in Germany.
Also, Quad9 is not a German company neither - but there exists a legal basis to be sued as a non German company in Germany.

The Lawsuit passed several Courts over the last two years including Hamburg, Leipzig and Dresden in Germany.
Whilst initially the courts ruled in favor of Sony, stating that the "[...] DNS resolver plays a "central role" in the publication of the copyrighted material leading to liability as a wrongdoer".[1]
Summing up the initial court rulings declared Quad9 liable for resolving the DNS entry.  

The recent Court ruling from Dresden did completely overthrow the previous ones.
Not only did they declare, that a DNS-Resolver does not play a central role and therefore is not liable.
But that they also "[...] enjoy liability privileges as access providers".  
Additionally the Court set this decision as finally (and whilst the case itself can not be fought, the decision that the ruling is final indeed can).
Also, the edge case, in which a "[...] DNS resolver operator can be required to block as a matter of last resort if the claiming party has taken appropriate means [...]" remains.[1]

### Similar previous Court rulings

Just as a site note, german courts previously wanted to enforce ISPs to block (via DNS) a specific adult site due to their lacking protection of minors.
They enforced a DNS-Blockage of the Germany targeted subdomain `de.insertpornsitehere.com` instead of blocking `de.insertpornsitehere.com`.
This quickly led to the site quickly migrating their web presence from `de.insertpornsitehere.com` to `deu.insertpornsitehere.com`.
Therefore, quickly omitting any blockage (not that `insertpornsitehere2.com` existed before the court ruling, which was not affected).[3]

## Takeaway

This incident itself is not as relevant as the implications that arise from it.
I would like to address the following two points in particular.

### Meaningfulness of this juristic approach
To get a better overview of the usefulness of the procedure of blocking content with the help of DNS providers, we will first look at an example.

{% image "./traffic-routing.png", "traffic routing" %}  
[2]

Several components are involved in opening up a webpage.
1. The _**User**_ who wants to visit a specific Webpage
2. The _**Browser**_ used to fulfill the action of loading and displaying the website.
3. The _**DNS-Resolver**_ helping in translating the human-readable address into an IP-Address.
4. The _**Web-Server**_ serving the Webpage for the desired Domain/IP-Address.
5. (Not displayed in this example) _**ISP**_ providing the routing and transport of the traffic between the involved parties.

What matters with this setup is the fact, that even when completely omitting the DNS-Server the (questionable) content is still served without a problem.
This brings us to the question - what exactly enforcing DNS-Resolvers to block certain requests help?
As the examples above in combination with the missing necessity for DNS-Servers in the first place demonstrate well - nothing!
Only symptoms are being combated here instead of problems.

Instead, blocking should rely on removing the illegal content.
This includes enforcing the removal from the webserver responsible for dissemination.
All real Leverage comes from this starting point.

Which brings us to a dilemma - a game of cat and mouse - because nowadays, it is incredibly easy to set up a new (virtual) server quickly and easily.

Therefore, if leveraging the Webserver or DNS-Resolver is not sufficient, we are left with tampering with the Browser or the ISP in order to refrain the user from accessing block worthy content.  
But it is not as easy as this, Browsers are only one way to connect to the Internet.
Amongst dedicated Apps for services there are still many other ways to consume content & exchange information.  
This strikes Browser from the realistic Target list to control available content (information, media etc.).  
But at the same time this implies that it is not as easy as prohibiting network operators from delivering certain web server content.
This is where other protocols and services besides the web come into play.
In principle, it is already sufficient to exchange the blocked files via an (encrypted) e-mail connection instead.
This approach would make it necessary for providers to (decrypt and) check their users packets.

But wait a minute - the ability to monitor all network traffic sounds not only technically difficult to implement, but also like a gateway for other questionable uses.  
_As a quick side note, regarding the _technical difficulty_ hurdle - progress is already on the wa implementing such a backdoor in the EU.[4]_

### Implications for Censorship

I am currently a German Citizen, therefore affected by the German- and EU-Legislation.  
As I do oppose getting this article stuck in political opinions I want to approach this problem more general.  

That is why I would like to introduce a thought experiment here.
Instead of thinking about whether the state that is responsible for us is trustworthy, I would like to turn the idea around.
I take the position that we do not live in a world in which there is no state that does not commit injustice.

In this unjust state, state legislation that obliges network operators to block content and deny their residents access to it on the basis of court rulings poses a threat to (information) freedom.
Who has the right to decide which content is illegal and which is dangerous and for which it would be better to block it?
Please do not get me wrong, I am not talking about Hate, CSAM or any other form of abuse - I am only talking about freedom of the press.

> "freedom of speech is worth more than your worthless opinion"

And therein lies the difficulty of this topic - which authority has the power to decide what content should be blocked, and which mechanisms exist for this? 
Any process that makes it possible to block hate also makes it possible to silence politically oppositional opinions.
It will always be a delicate balance.

---
## Sources
<a href="https://www.quad9.net/news/blog/quad9-turns-the-sony-case-around-in-dresden" target="_blank">[1] - Quad9 Turns the Sony Case Around in Dresden, quad9</a>    
<a href="https://aws.amazon.com/route53/what-is-dns" target="_blank">[2] - What is DNS?, AWS</a>  
<a href="https://netzpolitik.org/2022/netzsperre-fuer-pornoseite-xhamster-fuehrt-medienaufsicht-vor/" target="_blank">[3] - xHamster führt Medienaufsicht vor, netzpolitik [German]</a>  
<a href="https://www.internetgovernance.org/2023/11/07/fragmenting-the-web-the-eus-identity-power-play/" target="_blank">[4] - Fragmenting the Web: The EU’s Identity Power Play, Internet Governance Project</a>  

