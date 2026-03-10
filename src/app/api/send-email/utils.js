// Email validation and sanitization utilities

/**
 * Validates email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitizes text input to prevent XSS
 */
export function sanitizeText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateLength(text, maxLength, fieldName) {
  if (!text || typeof text !== "string") {
    throw new Error(`${fieldName} is required`);
  }
  if (text.length > maxLength) {
    throw new Error(`${fieldName} must be less than ${maxLength} characters`);
  }
  return true;
}

/**
 * Rate limiting storage (in-memory for simplicity)
 * For production, use Redis or similar
 */
const rateLimitStore = new Map();

/**
 * Simple rate limiter
 * @param {string} identifier - IP address or email
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 */
export function checkRateLimit(identifier, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const userRecord = rateLimitStore.get(identifier);

  if (!userRecord) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (now > userRecord.resetTime) {
    // Reset the window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (userRecord.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((userRecord.resetTime - now) / 1000),
    };
  }

  userRecord.count++;
  return { allowed: true, remaining: maxRequests - userRecord.count };
}

/**
 * Clean up old rate limit entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime + 60000) {
      rateLimitStore.delete(key);
    }
  }
}, 300000);
