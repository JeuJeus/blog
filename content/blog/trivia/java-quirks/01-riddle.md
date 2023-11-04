---
title: Weird Quirks of Java - E01- Historic Reasons in Language Design 
description: The Language Design of Java is heavily based on C, therefore some weird quirks were directly ported and are still present within the Language today, whilst primarily remaining unknown or unrevealed.
date: 2023-10-23
tags:
  - java
  - jvm
  - c
  - quirks
  - octals
  - linux
  - 'language design'
  - 'unix file permissions'
  - 'weird quirks of java'
---

In this brief episode, I want to give you a puzzle that is simple in itself, but also not very obvious.
At the same time, this serves as an introduction to a new series exploring oddities of the Java programming language.

Your task is to guess what the output of the following programme will look like.
The Solution and Explanation are found in the collapsable section below the code.

{% highlight "java" %}
public class Magic {
    public static void main(String []args) {
        int magic = 023;
        System.out.println(magic);
    }
}
{% endhighlight %}

<details>
<summary><i>Solution and Explanation</i></summary>

The Solution is _19_ - Congrats if you have guessed that correctly. But Why?  

The design and syntax of the Java language is based on and influenced by the C programming language[1].
This design choice brings the implicit formatting and parsing of numbers in integer literals from C[2] to Java.
This means that any number starting with 0 is treated as octal.
The same is true for hexadecimal with a leading 0x.[3]  

But what use is there for this?  
This is still widely used in POSIX / Unix / Linux, which are mostly implemented in C.
Linux uses operation permission codes, e.g. for file permissions, by using octal-based coding notation[4].

{% highlight "bash" %}
drwxr-x--- 2 jeujeus jeujeus 2048 Oct 23 2023  blog
{% endhighlight %}
The following example above corresponds to the umask of _750_ :

| Octal Representation | Who Part | Permission Bits | Character Flags |
|----------------------|----------|-----------------|-----------------|
| 7                    | O        | 111             | rwx             |
| 5                    | G        | 101             | r-x             |
| 0                    | U        | 000             | ---             |

You can read more regarding Unix File Permissions at [5].
</details>

---
<a href="https://docs.oracle.com/javase/specs/jls/se8/html/jls-1.html" target="_blank">[1] - Oracle, Java Language Specification</a>  
<a href="https://rules.sonarsource.com/c/RSPEC-1314/" target="_blank">[2] - Sonarsource, C static code analysis</a>  
<a href="https://stackoverflow.com/questions/16433781/how-to-set-value-of-octal-in-java" target="_blank">[3] - StackOverflow, Java Octals</a>  
<a href="http://uw714doc.sco.com/en/SDK_sysprog/_Getting_Semaphores.html#ipc_i8" target="_blank">[4] - UnixWare 7 Documentation, Getting semaphores</a>  
<a href="https://docs.nersc.gov/filesystems/unix-file-permissions/" target="_blank">[5] - NERSC Documentation, Unix File Permissions</a>  