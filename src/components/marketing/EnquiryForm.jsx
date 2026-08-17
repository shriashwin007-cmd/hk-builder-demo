'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnquiry } from '@/lib/actions/enquiry';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-gold" disabled={pending}>
      {pending ? 'Sending…' : 'Send enquiry →'}
    </button>
  );
}

export default function EnquiryForm({ ts, intent = 'general', project, minDate, maxDate }) {
  const [state, formAction] = useActionState(submitEnquiry, { ok: false, errors: {} });
  const err = state?.errors ?? {};
  const showVisit = intent === 'site-visit';

  return (
    <form className="enquiry-form" action={formAction} noValidate>
      {/* Signed at render time; the action rejects instant and stale posts. */}
      <input type="hidden" name="ts" value={ts} />
      <input type="hidden" name="intent" value={intent} />
      {project ? <input type="hidden" name="project" value={project} /> : null}

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {err.form ? (
        <p className="form-error form-error--top" role="alert">
          {err.form}
        </p>
      ) : null}

      <div className="field">
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" required autoComplete="name" aria-invalid={!!err.name}
               aria-describedby={err.name ? 'name-err' : undefined} />
        {err.name ? <p className="form-error" id="name-err">{err.name}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="phone">Mobile number *</label>
        <input id="phone" name="phone" required inputMode="tel" autoComplete="tel"
               placeholder="98765 43210" aria-invalid={!!err.phone}
               aria-describedby={err.phone ? 'phone-err' : undefined} />
        {err.phone ? <p className="form-error" id="phone-err">{err.phone}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email"
               aria-invalid={!!err.email}
               aria-describedby={err.email ? 'email-err' : undefined} />
        {err.email ? <p className="form-error" id="email-err">{err.email}</p> : null}
      </div>

      {showVisit ? (
        <div className="field-row">
          <div className="field">
            <label htmlFor="visitDate">Preferred date</label>
            <input id="visitDate" name="visitDate" type="date" min={minDate} max={maxDate} />
          </div>
          <div className="field">
            <label htmlFor="visitSlot">Preferred time</label>
            <select id="visitSlot" name="visitSlot" defaultValue="">
              <option value="">No preference</option>
              <option value="morning">Morning (9–12)</option>
              <option value="afternoon">Afternoon (12–4)</option>
              <option value="evening">Evening (4–7)</option>
            </select>
          </div>
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} />
      </div>

      <SubmitButton />
      <p className="form-note">
        By submitting you agree to be contacted about this enquiry. See our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
