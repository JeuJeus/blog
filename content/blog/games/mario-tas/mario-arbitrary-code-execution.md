---
title: On the Turing completeness of Mario - TAS Arbitrary Code Execution
description: How to inject arbitrary Code into Super Mario World on the SNES
date: 2023-08-21
tags:
  - games
  - hacking
  - mario
---

## Is Super Mario World turing complete?
With this TAS (Tool assisted Speedrun) from the Runner "Masterjun" being rather old, and the Title being somewhat clickbaity - lets dive right into the Content itself and let me proof you that this is a rather magnificent achievement.
I want to talk about two Speedruns, <a href="https://tasvideos.org/3957S" target="_blank">the first one being from 2013</a> and <a href="https://tasvideos.org/4156S" target="_blank">the second one from 2014</a>.  

<a href="https://www.youtube.com/watch?v=OPcV9uIY5i4" target="_blank">The Screen Recording of AGDQ 2014</a> initially left me completely baffled (see e.g. Screenshot below).
So lets wrap our Head around what is going on here and what makes this particular run so special.

{% image "./mario-pong.png", "Pong in Mario after TAS arbitrary Code Execution" %}

Foremost, this run was done on actual Hardware, controlled by a Raspberry Pi used for the Input, which is not the norm for TAS.
Additionally and much more mind bending, the Games input and nothing else is used on the basis of a <a href="https://tasvideos.org/Forum/Topics/500?CurrentPage=107&Highlight=299597#299597" target="_blank">Stun Glitch</a> to inject arbitrary Code into the Games Memory.  
So in more simple Terms, the Games Input is used to reprogram the Memory, more specifically to inject the Code for the Game Pong in this example.
Afterward Pong gets started and is available to be played.

### So what about Turing Completeness?
By definition, any system that can simulate a universal Turing machine is Turing complete.
While the Arbitrary Code Execution itself proves that a Turing Machine could theoretically be implemented in Super Mario World, the available memory is the biggest limitation.
Not only would this be one of the most impractical implementations of a Turing Machine (which is kind of the whole point of the example), but it would also be quite limited.
So, in theory, this TAS-based injection provides Turing completeness for Super Mario World, but the limitations quickly become apparent.
<a href="https://www.youtube.com/watch?v=hB6eY73sLV0" target="_blank">But that does not hinder anyone from implementing more Games inside the Game itself.</a>