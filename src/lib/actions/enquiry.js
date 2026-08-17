'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { enquirySchema, formatZodErrors } from '@/lib/schemas/enquiry';
import { verify } from '@/lib/security/hmac';
import { rateLimit } from '@/lib/security/ratelimit';

function clientIp(h) {
  return (
    h.get('x-vercel-forwarded-for') ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

/**
 * Single action for every entry point (contact, site visit, loan desk,
 * brochure), discriminated by `intent`.
 *
 * Works without JS: the form posts, this runs, and it redirects.
 */
export async function submitEnquiry(_prevState, formData) {
  const raw = Object.fromEntries(formData);

  // 1. Honeypot — a real user never fills this.
  if (raw.company) {
    // Pretend success so bots don't learn what tripped.
    redirect('/thank-you');
  }

  // 2. Time trap: too fast is a bot, too old is a replayed/stale form.
  if (!verify(raw.ts, { minAgeMs: 2500, maxAgeMs: 2 * 60 * 60 * 1000 })) {
    return { ok: false, errors: { form: 'That form expired. Please reload and try again.' } };
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: formatZodErrors(parsed.error), values: raw };
  }

  // 3. Rate limit per IP.
  const h = await headers();
  const limited = rateLimit(`enquiry:${clientIp(h)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return {
      ok: false,
      errors: { form: 'Too many submissions. Please try again in a few minutes.' },
      values: raw,
    };
  }

  const data = parsed.data;

  // Delivery. Both are no-ops until credentials exist, so the form is fully
  // reviewable now and starts working the moment env vars are set.
  const results = await Promise.allSettled([sendEmail(data), persistLead(data)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true);

  if (!delivered) {
    // Never silently swallow a lead. Surfaced in logs until email is wired.
    console.warn('[enquiry] no delivery channel configured; lead captured in logs only:', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      intent: data.intent,
      project: data.project,
      visitDate: data.visitDate,
      visitSlot: data.visitSlot,
      message: data.message,
      at: new Date().toISOString(),
    });
  }

  redirect('/thank-you');
}

async function sendEmail(data) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_INBOX;
  const from = process.env.LEAD_FROM;
  if (!key || !to || !from) return false;

  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Intent: ${data.intent}`,
    data.project ? `Project: ${data.project}` : null,
    data.visitDate ? `Preferred date: ${data.visitDate}` : null,
    data.visitSlot ? `Preferred slot: ${data.visitSlot}` : null,
    data.message ? `\nMessage:\n${data.message}` : null,
  ].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email || undefined,
      subject: `New ${data.intent} enquiry — ${data.name}`,
      text: lines.join('\n'),
    }),
  });
  return res.ok;
}

async function persistLead(data) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!projectId || !dataset || !token) return false;

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: 'enquiry',
              ...data,
              submittedAt: new Date().toISOString(),
            },
          },
        ],
      }),
    }
  );
  return res.ok;
}
