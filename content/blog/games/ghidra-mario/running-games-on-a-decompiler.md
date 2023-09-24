---
title: Regarding the Madness of running Mario on a Decompiler
description: Ghidra is an Open Source Reverse Engineering Framework, the question is can it run Mario? The Answer is Yes!
date: 2023-09-24
tags:
  - games
  - mario
  - ghidra
  - emulation 
  - TAS 
  - decompiler 
  - NES
  - ROM
---
_A shot but rather interesting episode for today._

# Asking Why and WTF may be Tempting

It was only a matter of time before someone wondered if Ghidra [2] was capable of running games.
This is exactly what nevesnunes did before implementing the ability to run NES ROMs in Ghidra's PC Code Emulator.

Essentially, he took an existing emulator and stripped it of its CPU logic support.
Then he replaced it with a socket-based protocol for delegating CPU execution to Ghidra's PCode emulator (server).
Everything else is still handled by the modified emulator (client), such as keyboard input and PPU logic[1].

This makes Ghidra strictly the emulator of the game, whereas in reality only the CPU logic is running inside Ghidra and everything else is still handled by the original emulator.
But the fact that Ghidra is used to play the "TAS" (used very loosely here) makes it not only the emulator but also the player.

{% image "./screenshot-mario-ghidra.png", "Screenshot of Super Mario Bros and Ghidra" %}[1]

This screenshot shows Super Mario Bros for the NES running on Ghidra.
He even recorded a TAS for it, using keyboard input events to complete the first level.
Based on the rather slow emulation speed, the level can be completed in 316 but 32 minutes of real time[1].
---
<a href="https://github.com/nevesnunes/ghidra-plays-mario" target="_blank">[1] -  Ghidra plays Mario,Github nevesnunes</a>    
<a href="https://github.com/NationalSecurityAgency/ghidra" target="_blank">[2] -  Ghidra,Github NSA</a>    