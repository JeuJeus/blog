---
title: Roller Coaster Tycoon - Writing a best selling PC Game in Assembly
description: A short anecdote about the developer behind a simulation game that has sold millions of copies.
date: 2023-09-04
tags:
  - games
  - assembly
  - roller coaster tycoon
---

## What exactly is Roller Coaster Tycoon?

The fundamental story isn't new - the video game Roller Coaster Tycoon was initially released in the late '90s. 
Nevertheless, this accomplishment is incredibly noteworthy, and I would like to briefly present it today.

Roller Coaster Tycoon is a simulation game by Chris Sawyer, following up on his initial game, Transport Tycoon.
Released in 1999 for PC, it allows players to create a theme park and build rollercoasters using an isometric view based interface (see Screenshot below).

{% image "./game-screenshot.gif", "Screenshot of Roller Coaster Tycoon" %}[1]

What is far more intriguing about the game can be taken from the following quote:

>> "It's 99% written in x86 assembler/machine code (yes, really!), with a small amount of C code used to interface to MS Windows and DirectX." - Chris Sawyer [2]

## Why is this such an accomplishment and what makes this so astonishing?

Compared to a higher level language like the contemporary alternative of writing the game in C, Assembly is a nightmare.
Let us compare the classic Hello World in x86 Assembly with its counterpart in C.

**x86 Assembly** (keep in Mind this is for illustration purposes only)
{% highlight "assembly" %}
; hello-DOS.asm - single-segment, 16-bit "hello world" program
org  0x100        ; .com files always start 256 bytes into the segment

mov  dx, msg      ; the address of or message in dx
mov  ah, 9        ; ah=9 - "print string" sub-function
int  0x21         ; call dos services

mov  ah, 0x4c     ; "terminate program" sub-function
int  0x21         ; call dos services

msg  db 'Hello, World!', 0x0d, 0x0a, '$'   ; $-terminated message
{% endhighlight %}[3]

**C**
{% highlight "C" %}
#include<stdio.h>

int main() {
printf("Hello World\n");
return 0;
}
{% endhighlight %}

Right away it is apparent that not only is the Assembly version more complicated, but less human-readable at the same time.
Low level is the relevant keyword and a double edge sword for ones abilities.  
If - and this is definitely the case for most of the programmers alive, you are able to fluently read Assembly and as well able to write it - you have complete control over everything.
Therefore, in Theory programming in Assembly gives you more headroom for performance improvement as well as fine granular control of your programms hardware utilization.
But at the same time, the cost is non-negligible.
Assembly introduces an absurd amount of complexity and technical hurdles, you loose all higher level abstractions, syntactic sugar and ease of use, whilst at the same time giving up potential for performance improvement by removing the compiler optimisation possible for C.
So it should be evident that developing functional programs in Assembly is quite a difficult task, let alone achieving any noteworthy efficiency whatsoever.  
However, Chris Sawyer manages to develop a AAA game that is both high-performing and stable.
The level of skill in the development of this game is beyond comprehension.

---

<a href="https://www.giantbomb.com/rollercoaster-tycoon/3030-2236/images/" target="_blank">[1] - RollerCoaster Tycoon Screenshots</a>  
<a href="https://www.chrissawyergames.com/faq3.htm" target="_blank">[2] - FAQ, Chris Sawyer</a>  
<a href="https://montcs.bloomu.edu/Information/LowLevel/Assembly/hello-asm.html" target="_blank">[3] - "Hello, World" in x86 Assembly Language</a>  