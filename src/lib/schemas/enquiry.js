import { z } from 'zod';

// Indian mobile numbers. Not worth pulling in libphonenumber-js for one country.
const PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;

export const INTENTS = ['general', 'site-visit', 'loan', 'brochure'];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ''))
    .refine((v) => PHONE.test(v), 'Enter a valid 10-digit Indian mobile number'),
  email: z.union([z.literal(''), z.string().trim().email('Enter a valid email address')]).optional(),
  message: z.string().trim().max(1000).optional(),
  intent: z.enum(INTENTS).default('general'),
  project: z.string().trim().max(120).optional(),

  // Site-visit specific
  visitDate: z.string().trim().optional(),
  visitSlot: z.enum(['', 'morning', 'afternoon', 'evening']).optional(),

  // Anti-spam. Never surfaced to real users.
  company: z.string().max(0, 'Rejected').optional(), // honeypot
  ts: z.string().optional(), // HMAC-signed render timestamp
});

export function formatZodErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
