---
title: Weird Quirks of Java - E02 - Gotos?
description: The Language Design of Java is heavily based on C, therefore some weird quirks were directly ported and are still present within the Language today, whilst primarily remaining unknown or unrevealed.
date: 2023-10-31
tags:
  - java
  - jvm
  - c
  - quirks
  - gotos
  - label
  - 'conditional breaks'
  - 'language design'
---

This episode briefly explores the history and current status of goto statements in Java.

## The History

`Goto` statements originated more than 50 years ago in the late 60s when ALGOL was a widely used programming language.
At that time, contemporary features such as structured programming, which includes loops like _while_ and _for,_ branch statements like _switch_ and _case_ or proper tail calls, did not exist.  
While the use of gotos has steadily declined with more modern languages and features, they are still widely used.
For example, the Linux kernel source yields more than 190 thousand occurrences of Goto[1], and the Coding Style Guide still advises their use in certain instances[5].  
Particularly in larger programmes, gotos are seen as making the code harder to read.

## Gotos in Java

The Founder of Java initially implemented the JVM with support for Gotos, but decided on a later point to remove them.[2]
Today Java indeed still lists `goto` under the reserved Language Keywords, but they are marked as unused.[3]

## What is still left
While gotos have been removed from Java, conditionally labelled breaks remain in the language as a form of goto.[4]
Let us have a look at the following example:

{% highlight "java" %}
class Scratch {

    public static void main(String[] args) {
        var loopIndex = 0;
        var input = new String[]{"test", "goto", "example"};
        var searchFor = "goto";

        search:
        {
            for (loopIndex = 0; loopIndex < input.length; loopIndex++) {
                if (input[loopIndex].equals(searchFor)) {
                    break search;
                }
            }
        }

        System.out.printf("Found at position %d%n", loopIndex);
    }

}
{% endhighlight %}

Let us unroll what happens here.
Logically our programm is used to determine the index of the `searchFor` String _goto_ inside the `input` Array.  
Therefore a label is set above the loop enclosing it with braces.
The for Loop iterates over the Array until an Array-element that String-equals the searchFor String is found.
Then the labelled break is executed.
This stops the Loop execution and the print statement below is able to just print the current index position of the Loop.

You have probably never seen this in the wild, or only rarely.
This is true, since the above example can be rewritten to also find and print the matching index, and stop the loop execution after the result is found.
But at the same time, the following example is more concise:

{% highlight "java" %}
class Scratch {

    public static void main(String[] args) {
        var input = new String[]{"test", "goto", "example"};
        var searchFor = "goto";

        for (int loopIndex = 0; loopIndex < input.length; loopIndex++) {
            if (input[loopIndex].equals(searchFor)) {
                System.out.printf("Found at position %d%n", loopIndex);
                break;
            }
        }
    }

}
{% endhighlight %}

This is it for today. 
Stay tuned for followups to this miniseries.  
Consider subscribing to the [RSS-Feed](https://blog.jeujeus.de/feed/feed.xml).

---
<a href="https://www.vidarholen.net/contents/wordcount/?#goto" target="_blank">[1] - Wordcount Linux Kernel, Vidarholen</a>  
<a href="https://www.youtube.com/watch?v=9ei-rbULWoA&t=1045s" target="_blank">[2] - James Gosling on Apple, Apache, Google, Oracle and the Future of Java, YouTube</a>  
<a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html" target="_blank">[3] - Java Language Keywords, Oracle</a>  
<a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/branch.html" target="_blank">[4] - Branching Statements , Oracle</a>
<a href="https://www.kernel.org/doc/html/v4.19/process/coding-style.html#:~:text=The%20goto%20statement%20comes%20in,or%20why%20the%20goto%20exists." target="_blank">[5] - Coding Style, Centralized exiting of functions, Kernel</a>