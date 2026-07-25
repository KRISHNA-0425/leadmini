import rateLimit from 'express-rate-limit';

// Applies to all /api/* routes as a general safety net
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later' },
});

// Stricter limiter for login/register - protects against brute-force / credential stuffing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only counts failed attempts against the limit
  message: { message: 'Too many login attempts, please try again in 15 minutes' },
});

// Limiter for the public lead submission endpoint - protects against spam/bot submissions
export const leadCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions from this IP, please try again later' },
});