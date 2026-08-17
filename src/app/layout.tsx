import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';

// Deliberately bare. The global stylesheet is imported by (site)/layout.tsx so
// its resets never reach the embedded Sanity Studio at /studio.

export const metadata: Metadata = {
  title: 'HK Builder',
};

export const viewport: Viewport = {
  themeColor: '#0F2E1F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: the inline script below adds a `js` class to
       <html> before React hydrates, so this element legitimately differs
       between server and client markup. */
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so scroll-reveal content is
            visible by default to crawlers and no-JS users. See .reveal in index.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
