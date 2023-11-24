---
title: Escaping the Browser Sandbox - Chromiums Rule of 2
description: Web browsers are not only complex but also have extensive access to the underlying operating system. To safeguard against attacks from the internet, implementing sensible methods and established approaches is vital. In this regard, we will examine an example exploit to demonstrate one of these principles.
date: 2023-11-24
tags:
  - security
  - browser
  - windows
  - microsoft
  - chromium
  - edge
  - fuzzing
  - memory corruption
  - exploit
  - speech synthesis
---

_In this article, I would like to present a bug that I find very fascinating.
However, far more interesting than the bug itself is the rule that has been broken, which makes the bug a vulnerability in the first place._

## A 20-Year-old Bug in a Microsoft Library

The reason for this article was a publication by the Micorsoft Edge Research Team.
This deals with a security vulnerability in a Windows library that has existed for over 20 years.
Specifically, however, this vulnerability can be exploited in all Chromium-based browsers via the Internet and used to bypass the browser's security mechanisms.[2]  

Specifically, browsers utilise underlying system libraries from JavaScript at various points to provide functionality.
The same applies to speech synthesis, which, if called in Javascript, makes an inter-process communication call to the render process that calls the system library.[1]

>Effectively, calling the speak JavaScript API crosses a privilege boundary, and any bug that we trigger in the browser code may allow an attacker to gain code execution outside of the context of the sandbox.
>Chromium does not have a custom TTS engine, as such the SpeechSynthesis interface is just a wrapper around the platform-specific service.
>In the case of Windows, the “speak” method will call into the ISpVoice COM interface [...]
[1]

With the help of black box fuzzing, the researchers have found a stack buffer overflow bug that can be exploited.

The DLL in question accepts various XML standards for speech synthesis.
A maximum of 10 attributes can be assigned to a tag within the standard.
As soon as more than 10 attributes are added, this leads to unexpected behaviour by the parser and possibly a crash of the browser.

The following example Javascript code can be used to reproduce the bug in affected versions of Chromium and Windows.

{% highlight "js" %}
let text = `<PARTOFSP PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" PART="modifier" ></PARTOFSP>`;
speechSynthesis.speak(new SpeechSynthesisUtterance(text));
{% endhighlight %}
[1]

## Making the Bug a Vulnerability

There are no non-trivial necessary criteria that make bugs in code a vulnerability.
Rather, there are common patterns in the form of a combination of various sufficient criteria that are problematic and usually lead to security vulnerabilities.

I would like to take this opportunity to discuss the breached rule that caused this bug to become a security vulnerability.  

Web browsers are all about handling and dealing with untrusted code from the internet.
Therefore, it is highly relevant to make sure that we execute the code we are dealing with safely.  
For this reason the Chromium project, provides a guideline in the form of the **Rule of Two**, which is presented in the picture below.

<div class="invert-in-darkmode">
    {% image "./rule-of-two.png", "Rule of Two" %}
</div>
[3]

The rule is quite simple.
No Webbrowser code should apply more than two of the three rules from above.
Any code that applies all three rules is potentially problematic or vulnerable.  
Therefore, no untrustworthy inputs should be handled by code written in an unsafe language at a high privilege (Which is exactly what caused the vulnerability described in the opening).[3]

### Takeaway and Mitigations

The simplicity of this rule allows it to be easily reversed to derive the necessary improvements to help prevent such gaps.

- _untrustworthy inputs_ - There are basically two approaches to eliminating insecure inputs.
  - The first approach is to cryptographically ensure that the input comes from a secure source, for example via transport encryption (TLS).
  - The other approach is to normalise the input using a given minimal grammar.
- _unsafe implementation language_ - To prevent this problem, memory-safe languages and secure, extensively fuzzed and tested exchange formats for the IPC can be used.
- _privileged execution_ - Code should be executed in an environment that has only reduced privileges and runs with minimal permissions.
[3]

---

### Sources

<a href="https://microsoftedge.github.io/edgevr/posts/Escaping-the-sandbox-A-bug-that-speaks-for-itself/" target="_blank">[1] -
Escaping the sandbox: A bug that speaks for itself, Marco Bartoli, Giulio Candreva</a>  
<a href="https://msrc.microsoft.com/update-guide/vulnerability/CVE-2023-36719" target="_blank">[2] - CVE-2023-36719,
Microsoft</a>  
<a href="https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md" target="_blank">[3] - The
Rule Of 2, Chromium Project</a>  



