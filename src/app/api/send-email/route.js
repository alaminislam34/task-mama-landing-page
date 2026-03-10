import nodemailer from "nodemailer";
import {
  isValidEmail,
  sanitizeText,
  validateLength,
  checkRateLimit,
} from "./utils";
import { getDownloadEmailTemplate, getContactEmailTemplate } from "./templates";

// Constants
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_REQUESTS = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

/**
 * Get client IP address from request
 */
function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

/**
 * Create nodemailer transporter with error handling
 */
function createTransporter() {
  const requiredEnvVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Connection timeout
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // Add debug logging in development
    debug: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development",
  });
}

/**
 * Send email with retry logic
 */
async function sendEmailWithRetry(transporter, mailOptions, maxRetries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      lastError = error;

      // Don't retry on authentication errors
      if (error.code === "EAUTH" || error.responseCode === 535) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
      }
    }
  }

  throw lastError;
}

/**
 * Main POST handler for email sending
 */
export async function POST(req) {
  const startTime = Date.now();
  let emailType = "unknown";

  try {
    // Parse request body with timeout protection
    const body = await Promise.race([
      req.json(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 5000),
      ),
    ]);

    const { type, email, subject, message } = body;
    emailType = type || "unknown";

    // Validate email type
    const validTypes = ["download", "contact"];
    if (!type || !validTypes.includes(type)) {
      return new Response(
        JSON.stringify({
          error: "Invalid email type",
          validTypes,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Rate limiting
    const clientIp = getClientIp(req);
    const rateLimitKey = `${clientIp}-${type}`;
    const rateLimit = checkRateLimit(
      rateLimitKey,
      RATE_LIMIT_REQUESTS,
      RATE_LIMIT_WINDOW_MS,
    );

    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}, type: ${type}`);
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimit.retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": rateLimit.retryAfter.toString(),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    let mailOptions;

    if (type === "download") {
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      validateLength(email, MAX_EMAIL_LENGTH, "Email");

      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ error: "Invalid email format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      mailOptions = getDownloadEmailTemplate(email);
    } else if (type === "contact") {
      // Validate all required fields
      if (!email || !subject || !message) {
        return new Response(
          JSON.stringify({ error: "All fields are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // Validate lengths
      validateLength(email, MAX_EMAIL_LENGTH, "Email");
      validateLength(subject, MAX_SUBJECT_LENGTH, "Subject");
      validateLength(message, MAX_MESSAGE_LENGTH, "Message");

      // Validate email format
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ error: "Invalid email format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Sanitize inputs to prevent XSS
      const sanitizedEmail = sanitizeText(email);
      const sanitizedSubject = sanitizeText(subject);
      const sanitizedMessage = sanitizeText(message);

      mailOptions = getContactEmailTemplate(
        sanitizedEmail,
        sanitizedSubject,
        sanitizedMessage,
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Send email with retry logic
    const info = await sendEmailWithRetry(transporter, mailOptions);

    // Log success with detailed information
    const duration = Date.now() - startTime;
    console.log(
      `✅ Email sent successfully - Type: ${type}, Duration: ${duration}ms, MessageID: ${info.messageId}, To: ${mailOptions.to}, Response: ${info.response}`,
    );

    return new Response(
      JSON.stringify({
        message: "Email sent successfully!",
        messageId: info.messageId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      },
    );
  } catch (error) {
    const duration = Date.now() - startTime;

    // Log error with details
    console.error("❌ Email send error:", {
      type: emailType,
      error: error.message,
      code: error.code,
      duration: `${duration}ms`,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Determine appropriate error response
    let statusCode = 500;
    let errorMessage = "Failed to send email. Please try again later.";

    if (error.message === "Request timeout") {
      statusCode = 408;
      errorMessage = "Request timeout. Please try again.";
    } else if (error.code === "EAUTH" || error.responseCode === 535) {
      statusCode = 500;
      errorMessage = "Email service configuration error.";
      console.error("🔴 SMTP Authentication failed - check credentials");
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      statusCode = 503;
      errorMessage = "Email service temporarily unavailable.";
    } else if (error.message.includes("environment variables")) {
      statusCode = 500;
      errorMessage = "Email service configuration error.";
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        ...(process.env.NODE_ENV === "development" && {
          details: error.message,
          code: error.code,
        }),
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
