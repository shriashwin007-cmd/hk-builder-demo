'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * Client-side navigation swaps the document without a reload, so ScrollTrigger
 * keeps measurements (pin distances, page height) from the previous route.
 * Recalculate them after each route paints.
 */
export default function ScrollTriggerRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
