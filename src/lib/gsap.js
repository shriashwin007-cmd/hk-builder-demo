'use client';

/**
 * The single place GSAP plugins are registered.
 *
 * registerPlugin() has module-scope side effects, so importing it from several
 * components risks pulling GSAP into a server-component graph. Every consumer
 * imports from here instead.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP };
