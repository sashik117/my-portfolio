# Production Checklist

Use this before sharing the portfolio link publicly.

## Required

- [ ] `NEXT_PUBLIC_SITE_URL` points to the real frontend URL.
- [ ] `NEXT_PUBLIC_API_URL` points to the deployed backend URL ending in `/api`.
- [ ] `CLIENT_URLS` contains only the real frontend domains.
- [ ] `MONGODB_URI` uses a production MongoDB database.
- [ ] `JWT_SECRET` is long, random, and private.
- [ ] `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set.
- [ ] `REFRESH_COOKIE_SECURE=true`.
- [ ] `REFRESH_COOKIE_SAMESITE=none` for cross-site Vercel/Render deploys.
- [ ] `npm run audit:env` passes in production or strict mode.

## Recommended

- [ ] Cloudinary is enabled for durable project image uploads.
- [ ] SMTP is enabled for contact-form email alerts.
- [ ] GitHub Actions CI is green.
- [ ] Production Smoke workflow is configured.
- [ ] Domain is connected.
- [ ] OpenGraph preview looks good in Telegram/LinkedIn/GitHub.
- [ ] README screenshots and project notes are up to date.

## Nice To Have Later

- [ ] Sentry or another hosted error tracker.
- [ ] Analytics with privacy-friendly settings.
- [ ] Custom domain email address.
- [ ] More real screenshots or short GIFs for each project.
