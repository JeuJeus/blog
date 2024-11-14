---
title: Exposed Shell in your 5G modem? Send over Commands as Root!
description: The AT commands standard sets the basis for communication between modems and their host. This standard allows for sending over commands to the host. Lets talk about that.
date: 2023-10-01
tags:   
  - AT
  - modem
  - embedded
  - linux
  - security
  - Smartphone
---
Today, we will explore AT commands, their historical background, present relevance, and the possibility of them exposing potential vulnerabilities.

## Setting the Context - back to the 80s
AT commands are a text-based command language used to control modems.
The Hayes command set was initially created by Hayes Microcomputer Products in 1981 for their Smartmodem 300 and subsequently emerged as the standard for modem control, still in use by most modems to date.  
During the modem's early days, AT commands provided the sole means for control.[1] 

## AT Commands and their specific quirks
AT commands are primarily employed to configure and debug modems and establish network connections with carriers in GSM, GPRS and mobile phone modems. 
They enable developers to send and receive a variety of device and network parameters from the modem, including the present network status indication, roaming status, and the current network technology being used (e.g. 4G, NB-IoT, 2G, etc.). 

The AT commands for GSM/IoT modules enable access to several essential services including:
- device and SIM information
- SMS and MMS services
- voice and data services.

Today, these AT commands continue to be utilized for configuring and establishing network connections on modern 5G modems.[1]

## Implementation of AT Commands today
AT Commands are single-line instructions that need to be sent in sequence and are blocking, requiring the answer to be waited for before proceeding with a new command.
The commands can be communicated with the modem through either UART, USB or the network.

AT commands provide a command line structure, which relies on a fixed command setup that is terminated by a carrier return.
Multiple commands can be separated by a semicolon in a single line.
Two types of AT commands exist: basic and extended commands, the latter of which starts with a '+' symbol.[1]

{% highlight "bash" %}
AT<COMMAND><SUFFIX><DATA>
{% endhighlight %}

As described above, AT commands are still widely used in 4G and 5G modems.  
One of the more interesting and widely-used variant is the following:

{% highlight "bash" %}
AT+LINUXCMD=
{% endhighlight %}

This functionality permits the sending of instructions trough modem's firmware to be executed on the host, bypassing the security controls of the operating system of the device.[2]
As we shall observe in the forthcoming examples, employing this particular instruction to obtain RCE may not even be necessary.

## Vulnerabilities and Attack Vectors

The following examples serve very well at illustrating that the AT command interface contains an alarming amount of unconstrained functionality and represents a broad attack surface.

### Android 

For example on Android, the Abstract Control Module (ACM) which can be utilized to send AT Commands to the Phone via USB is exposed via `/dev/ttyACM0`.
As exemplary illustrated in the Image below.

{% image "./visualization-of-at-attack-vector.png", "Visualization of Attach Vectors" %}
[4] Implementation of AT Interface for Android (2019)

This was utilized by researchers who systematically retrieve and extract 3,500 AT commands from over 2,000 Android smartphone firmware images across 11 vendors. 
They tested the collected AT commands against different devices through their USB interface
This resulted in findings regarding: [3]
- the ability to rewrite device firmware
- bypass Android security mechanisms
- exfiltrate sensitive device information
- perform screen unlocks
- inject touch events solely through the use of AT commands

One example for the LG G4 is the following:

{% highlight "bash" %}
AT%KEYLOCK=0
{% endhighlight %}

This command allows the Phone to be unlocked via AT without the need for Authentication via Password or Fingerprint.[3]

### 5G-Modems

But it gets even better. 
Let us examine this exemplary AT command in the Quectel RG500Q-EA 5G modem.

{% highlight "bash" %}
AT+QFOTADL="https://sif.ee/Quectel-OTA.bin"
{% endhighlight %}

The modem downloads the OTA, extracts it, verifies whether it is installable, and finally installs it onto the modem device.
Prior to downloading, the Link undergoes compliance checks to ensure validity with the applicable schema.
Upon passing this test, the Download executes according to the displayed Screenshot of the Firmwares Code.

{% image "./Quectel-OTA-Download.png", "Quectel OTA Download" %}    
[5] Download of OTA Images with Schema Validation

Since this is an unsecure instance of String Template Replacement, we can observe the presence of an RCE vulnerability.
Specifically, CVE-2022-26147 has a score of 9.8, which means that there is a great risk of RCE exploitation through the AT Commands.

{% highlight "bash" %}
AT+QFOTADL="http://`reboot`"
{% endhighlight %}

## Summing up

AT Commands are a control mechanism for modems that has been historically evolved from a time when security was an afterthought.
As demonstrated by the aforementioned examples, these conditions pose a challenge for modems to maintain resilience against attacks.
Furthermore, the potential risks of network-connected tech products running their OS with remote Root Access vulnerabilities is cause for concern.  
Good to note that our CPUs lack any Management Engine, which runs a custom version of Minix with a Ring -3 Access to our hardware as well as its own web server.[6]
Perhaps we should examine this further at some point...

---
<a href="https://www.cavliwireless.com/blog/nerdiest-of-things/an-introduction-to-cellular-at-commands.html" target="_blank">[1] - AT cellular Commands Instruction, Cavli Wireless</a>  
<a href="http://esr.ibiblio.org/?p=7333&cpage=1#comment-1802568" target="_blank">[2] - Things Every Hacker Once Knew: 1.4, Explanatory Comment regarding AT</a>  
<a href="https://www.usenix.org/system/files/conference/usenixsecurity18/sec18-tian.pdf" target="_blank">[3] - Android AT Commands Exploration Paper</a>  
<a href="https://www.securitynewspaper.com/2019/11/14/how-to-use-headphones-or-bluetooth-to-hack-and-take-control-of-any-android-device/" target="_blank">[4] - Android Bluetooth AT Commands Hacking</a>  
<a href="https://nns.ee/blog/2022/06/21/modem-rce2.html" target="_blank">[5] - Code execution as root via AT commands on the Quectel RG500Q-EA 5G modem</a>  
<a href="https://www.youtube.com/watch?v=TsXzDFjXj2s" target="_blank">[6] - Talk, Video, Black Hat, Behind the Scenes of Intel Security and Manageability Engine</a>  
