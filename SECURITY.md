# Security Policy

This portfolio is a personal fullstack project, but it still follows production-minded defaults.

## Current Security Features

- Helmet security headers.
- Exact-origin CORS configuration for production.
- Disabled `x-powered-by`.
- Auth and contact rate limits.
- JWT access tokens with rotating refresh tokens in httpOnly cookies.
- Refresh-token reuse detection and logout revocation.
- Contact form honeypot.
- Zod request validation.
- Upload size/type validation.
- Request IDs in API responses and logs.

## Reporting

If you notice a security issue, contact:

- Email: `sanyoklolik@gmail.com`
- GitHub: https://github.com/sashik117

Please do not open public issues for sensitive vulnerabilities.

## Production Notes

- Keep `JWT_SECRET`, MongoDB credentials, SMTP credentials, Cloudinary credentials, and admin password private.
- Use `REFRESH_COOKIE_SECURE=true` in production.
- Use `REFRESH_COOKIE_SAMESITE=none` when frontend and backend are deployed on different domains.
- Use Cloudinary or another persistent storage provider for uploaded project images.
