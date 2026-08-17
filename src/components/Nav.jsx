'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The blend-mode nav only reads over the dark hero; every other route has a
  // light background and needs a solid variant.
  const solid = pathname !== '/';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className={`site-nav${solid ? ' site-nav--solid' : ''}${open ? ' site-nav--open' : ''}`}>
      <Link href="/" className="logo-mark" aria-label="HK Builder — home">
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M4 34V16L14 8V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 34V4L26 12V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M26 34V16L36 22V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 34H38" stroke="#C9A227" strokeWidth="1.6" />
        </svg>
        <span className="logo-text">
          HK Builder
          <span>Crafting Communities</span>
        </span>
      </Link>

      <div className="links">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span className="nav-toggle__bar" aria-hidden="true" />
        <span className="nav-toggle__bar" aria-hidden="true" />
      </button>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <a className="mobile-menu__call" href="tel:9940669066">
          Call 99406 69066
        </a>
      </div>
    </nav>
  );
}
