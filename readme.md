# Sprongle

A p5.js program to draw harmonographs, or at least things that look like harmonographs.

The base harmonic function used is:

<img src="https://render.githubusercontent.com/render/math?math=x = \e^{-dt}sin(ft %2B \phi)">


Each axis (x, y and z) uses two harmonics, which may be either summed or multiplied.

All harmonics have independent frequency, phase and decay rate. However, the frequencies chosen are intentionally biased towards integer multiples, as this produces prettier results.

The animation is evolved by slowly changing some of the frequencies.

Colour is provided either as a constant, by the z value, or by the t value.





