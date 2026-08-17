import { Fraunces, Work_Sans, JetBrains_Mono } from 'next/font/google';

// Self-hosted via next/font: no render-blocking third-party request, and no
// race with SplitText's document.fonts.ready wait.
export const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-display',
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const fontVariables = `${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable}`;
