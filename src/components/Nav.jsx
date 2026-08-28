'use client';

import { usePathname } from 'next/navigation';
import PillNav from './PillNav/PillNav';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <PillNav
      key={pathname}
      logo="/logo-mark.svg"
      logoAlt="HK Builder — home"
      items={NAV_LINKS}
      activeHref={pathname}
      baseColor="var(--green-deep)"
      pillColor="var(--cream)"
      pillTextColor="var(--navy)"
      hoveredPillTextColor="var(--cream)"
      initialLoadAnimation={false}
    />
  );
}
