# HK Builder — pre-launch checklist

Blocking items are grouped by who owns them.

## Client must supply (blocks launch)

- [ ] **TNRERA registration number.** Tamil Nadu projects over 500 m² / 8 units
      must be RERA-registered, and the number must appear on all advertising.
      Confirm whether SP Galaxy crosses the threshold. Field exists at
      `siteSettings.reraNumber`; the footer currently renders a visible
      "pending" warning until it is set.
- [ ] **Real photography.** Every image in `public/img/` is AI-generated
      (Higgsfield) and is flagged `imageType: 'artists-impression'`, which the
      gallery renders as a visible label. Presenting generated imagery as
      photographs of an actual property is misleading advertising. Replace
      before launch, or keep the labels.
- [ ] **Final copy** for About, and real attributable testimonials (the current
      ones are placeholders).
- [ ] **Privacy Policy / Terms** reviewed. India's DPDP Act 2023 applies to the
      enquiry form, and Google Ads will not approve landing pages without a
      published privacy policy.
- [ ] Confirm phone numbers, email, office address and hours.

## Infrastructure

- [ ] **Re-host the background videos.** Both hot-link Cloudinary account
      `dxvui0xkz` (a personal free tier). Production traffic will exhaust the
      quota and 429 both videos with no warning. Move to the client's account
      and update `siteSettings.heroVideoUrl` / `plansVideoUrl`.
- [ ] Set `FORM_SECRET` in Vercel — without it the anti-bot timestamp is signed
      with a known dev fallback.
- [ ] Set `RESEND_API_KEY`, `LEAD_INBOX`, `LEAD_FROM`, and verify the sending
      domain's DKIM/SPF. **Until this is done, leads are only written to server
      logs** (deliberately loud, see `src/lib/actions/enquiry.js`).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Point the custom domain at the Vercel project.
- [ ] Submit `/sitemap.xml` in Google Search Console.

## Nice to have before launch

- [ ] Sanity project + `CONTENT_SOURCE=sanity` so the client can self-edit.
- [ ] Upstash Redis for durable rate limiting (in-memory limiter does not
      survive across serverless instances).
- [ ] Analytics (`@vercel/analytics`) and a GA4 conversion event on
      `/thank-you`.
- [ ] Frame-sequence performance work — `public/frames/` is 240 JPGs / 11.4 MB
      loaded on mount. See Phase 7 in the plan.
