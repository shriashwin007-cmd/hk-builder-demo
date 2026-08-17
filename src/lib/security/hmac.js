import crypto from 'node:crypto';

// Falls back to a build-stable dev secret so the form works locally without
// env setup. Production MUST set FORM_SECRET — see .env.example.
const SECRET = process.env.FORM_SECRET ?? 'dev-only-insecure-secret';

export function sign(value) {
  const mac = crypto.createHmac('sha256', SECRET).update(String(value)).digest('base64url');
  return `${value}.${mac}`;
}

export function verify(signed, { maxAgeMs, minAgeMs } = {}) {
  if (typeof signed !== 'string' || !signed.includes('.')) return false;
  const idx = signed.lastIndexOf('.');
  const value = signed.slice(0, idx);
  const mac = signed.slice(idx + 1);

  const expected = crypto.createHmac('sha256', SECRET).update(value).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const ts = Number(value);
  if (!Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  if (typeof minAgeMs === 'number' && age < minAgeMs) return false;
  if (typeof maxAgeMs === 'number' && age > maxAgeMs) return false;
  return true;
}

export function issueTimestamp() {
  return sign(Date.now());
}
