export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hk-builder-demo.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'HK Builder';
export const SITE_TAGLINE = 'Crafting Communities';

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Digits-only, E.164-ish, for tel: and WhatsApp links. */
export function toIntlPhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  return digits.startsWith('91') ? digits : `91${digits}`;
}

export function whatsappHref(number, message) {
  const base = `https://wa.me/${toIntlPhone(number)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
