---
title: Recommendation Corner - Handy Browser Extensions  
description: Browsers functionality and security can be vastly extended by Plugins. In this article we will examine my current collection of Plugins.
date: 2023-12-08
tags:
  - browser
  - chrome
  - firefox
  - brave
  - edge
  - chromium
  - plugins
  - extensions
  - security
---

In this article we will take a look at my collection of Browser Extensions, which I accumulated over the last decade.
At least the ones that stayed.

## Browser

Although I am currently using Google Chrome as my Desktop Browser - this shall not be the point of the current article.
All the presented plugins should provide extensions for and function in all current major browsers.  

Nevertheless, I want to present my reasons for sticking to Chrome.
I was a lifelong Firefox user, until in 2021 i decided to change for workflow reasons.
It makes most sense to do Web-Development in Chrome due to its Market-share.
Also, as I am sticking to Googles Android Ecosystem and therefore Chrome provides the best Integration to their services.  
But with Things like Manifest v3 on the Horizon[1] - a defacto end to Adblocking as we know it - that may change sooner than later.  

In General, I welcome change, and since my mobile Browser Workflow is still mainly based on Firefox due to its Addon Support (ironically) maybe I will revert the switch.

But my Browser of Choice should be topic of another blog entry.

## Plugins

In order to introduce more structure I have divided all Plugins into categories.  
Four Extensions are excepted for today which are blurred, due to missing relevance or lack of updates and unsafety introduced trough that.
(If you look very closely you can see from the blurred colors, that 2 out of 4 are disabled for that reason).
The Image below gives an overview of all remaining 17 of them.

{% image "./plugins.png", "My browser Plugins" %}

### Security / Safety
- **ClearURLs** removes Tracking Parameters from URL, keeping you more private whilst browsing.
- **Consent-O-Matic** is developed by a Danish University and helps with auto-clicking Cookie Banners, but in contrast to my previous candidate for that _I don't care about Cookies_ this one is designed to configure the Cookie Settings to the Users likes as well.
- **Cookie Autodelete** allows to remove and delete Cookies as well as Cache/Localstorage and so on by either timers after closing a tab, Browser Restarts or by rules. This works great with _Consent-O-Matic_. 
- **Decentraleyes** replaces loading additional JS and CSS from external CDNs enabling the ability for them to track you, by serving it locally.
- **NoScript** is my most important Addon, it gives Users the ability to fine granular configure which JS is loaded by which pages based on static and dynamic rules.   
- **uBlock Origin** is the defacto best Adblocker, from its small impact on performance to its wide support for custom Blocklists and blocking specific Elements (I call you Wikipedia before Christmas). And in Contrast to _Adblock Plus_ without Ads ;)
- **User-Agent Switcher and Manager** is great for bypassing arbitrary filters like "this Website is only supported in Internet Explorer" or for bypassing any Authentication by imitating Googles Webcrawler.

### Quality of Life
- **Everything Metric - Auto Unit Converter** is one of the Extensions i planned to develop during a camping trip, only to discover it already existed. This makes the Web usable for people used to sane Measuring Units.
- **GNOME Shell Integration** allows to install Gnome Shell Extensions straight from the Browser.
- **Keepa - Amazon Price Tracker** is great for disillusion during "Black Week" since you get plotted Price History for any item.
- **Nitter Redirect** allows to open Twitter Links without visiting x.com, just redirecting every Link to Nitter.
- **Sponsorblock for YouTube** enables you to skip the in Video Ads by community driven timestamps that automatically get skipped. Allows for Categories of events and rules.
- **Tampermonkey** is great for customizing Webpages with additional JS to provide further functionality quickly. One of the good things Manifest v3 will bring by default.

### Productivity
- **Grammar Checker & Paraphraser - LanguageTool** paired with a local instance of Languagetool running from my startup-folder, this allows Grammar Checking and Correction on a high level locally.
- **KeepassXC-Browser** is the native Extension for my Password manager, which allows me to interact with Login-forms trough Hotkeys, automatically filling Content or creating new Entries in my vault.
- **Vimium** allows for Vim like Navigation in the Web. A steep learning curve but most important Addon number two for me. 
- **Zotero** is an integration to my Bibtex Library and Content Management Software, allowing to Download and catalog new Documents and Content with a Button click.

---
## Sources
<a href="https://developer.chrome.com/docs/extensions/develop/migrate" target="_blank">[1] - Manifest v3, Google</a>  
