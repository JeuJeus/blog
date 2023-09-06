---
title: Hacking Shadows with 0x5F3759DF - Fast inverse square Root with magic numbers
description: Sometimes, modern hardware cannot keep pace with the demand for increasingly graphics-intensive games. This is where shortcuts in mathematics, referred to as "magic numbers", can be used.
date: 2023-09-06
tags:
  - games
  - math
  - code
  - quake III Arena 
---

{% image "./quake-iii-arena-screenshot.jpg", "Screenshot of Quake III Arena" %}[1]

Excerpt from Quake III Arenas original Code:
{% highlight "C" %}
float Q_rsqrt( float number )
{
long i;
float x2, y;
const float threehalfs = 1.5F;

x2 = number * 0.5F;
y  = number;
i  = * ( long * ) &y;                       // evil floating point bit level hacking
i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
y  = * ( float * ) &i;
y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
// y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

return y;
}
{% endhighlight %}[2]


---
<a href="https://store.steampowered.com/app/2200/Quake_III_Arena/" target="_blank">[1] -  Quake III Arena, Steam</a>    
<a href="https://archive.softwareheritage.org/browse/content/sha1_git:bb0faf6919fc60636b2696f32ec9b3c2adb247fe/?origin_url=https://github.com/id-Software/Quake-III-Arena&path=code/game/q_math.c&revision=dbe4ddb10315479fc00086f08e25d968b4b43c49&snapshot=4ab9bcef131aaf449a7c01370aff8c91dcecbf5f#L549-L572" target="_blank">[2] -  Quake III Arena, id Software</a>  