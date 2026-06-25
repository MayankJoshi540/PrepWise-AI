import arcjet, { tokenBucket } from "@arcjet/next";

/**
 * Creates a pre-configured Arcjet instance with token bucket rate limiting.
 *
 * @param {Object} options
 * @param {number} options.refillRate  - tokens added per interval
 * @param {string} options.interval    - e.g. "1h", "1m"
 * @param {number} options.capacity    - max burst size
 */
export function createRateLimiter({ refillRate, interval, capacity }) {
  const key = process.env.ARCJET_KEY || "ajkey_placeholder";
  return arcjet({
    key,
    characteristics: ["userId"], // fingerprint by Clerk user ID, not IP
    rules: [
      tokenBucket({
        mode: "LIVE",
        refillRate,
        interval,
        capacity,
      }),
    ],
  });
}

/**
 * Runs an Arcjet decision and returns an error string if denied, null if allowed.
 * userId is the Clerk user ID — passed as the fingerprint characteristic.
 *
 * @param {import("@arcjet/next").ArcjetInstance} aj
 * @param {Request} req
 * @param {string} userId
 * @returns {Promise<string|null>}
 */
export async function checkRateLimit(aj, req, userId) {
  try {
    if (!process.env.ARCJET_KEY || process.env.ARCJET_KEY === "ajkey_placeholder") {
      console.warn("WARN: ARCJET_KEY environment variable is missing or placeholder. Rate limiting is bypassed.");
      return null;
    }
    const decision = await aj.protect(req, { userId, requested: 1 });
    if (decision.isDenied()) {
      return decision.reason.isRateLimit()
        ? "Too many requests. Please try again later."
        : "Request blocked by rate limiter.";
    }
    return null;
  } catch (error) {
    console.error("Arcjet protection error (bypassing rate limit):", error);
    return null;
  }
}