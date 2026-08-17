/**
 * Standard reducing-balance EMI.
 *   EMI = P·r·(1+r)^n / ((1+r)^n − 1)
 * where r is the monthly rate and n the number of months.
 */
export function calculateEmi({ principal, annualRatePct, years }) {
  const n = Math.round(years * 12);
  const r = annualRatePct / 100 / 12;

  if (!principal || !n) return { emi: 0, total: 0, interest: 0 };
  // Zero-interest is a valid input and would divide by zero below.
  if (r === 0) {
    const emi = principal / n;
    return { emi, total: principal, interest: 0 };
  }

  const growth = Math.pow(1 + r, n);
  const emi = (principal * r * growth) / (growth - 1);
  const total = emi * n;
  return { emi, total, interest: total - principal };
}

export function formatInr(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0));
}
