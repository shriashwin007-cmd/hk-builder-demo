/**
 * Best-effort in-memory rate limit.
 *
 * Serverless instances are ephemeral and not shared, so this is a speed bump,
 * not a guarantee. Set UPSTASH_REDIS_REST_URL/TOKEN to get a durable limit —
 * see .env.example. Documented rather than silently weak.
 */
const hits = new Map();

export function rateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}
