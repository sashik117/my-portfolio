# Oleksandra Portfolio

![Oleksandra portfolio preview](client/public/og-image.png)

Premium fullstack portfolio for Oleksandra: a dark, animated, mobile-first developer website with a real admin CMS, Express API, MongoDB data layer, image upload pipeline, contact inbox, CI/CD, E2E tests, and production-ready polish.

This is built to feel like a small product, not a static resume page. Projects can be managed from the admin panel, contact messages are stored in the CMS, uploaded preview images can move to Cloudinary in production, and the frontend keeps a polished fallback dataset so the site still looks complete while the API is unavailable.

## Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** short-lived JWT access tokens + rotating refresh tokens in httpOnly cookies
- **CMS:** admin dashboard for projects, images, links, ordering, and messages
- **Uploads:** local Multer storage in development, optional Cloudinary for production
- **Email:** Nodemailer SMTP notifications for contact form submissions
- **Quality:** Node test runner, Supertest, MongoDB Memory Server, Playwright, GitHub Actions
- **Deployment:** Vercel client, Render/Railway server, MongoDB Atlas

## Highlights

- Interactive portfolio UI with dark premium styling, glassmorphism, glow accents, motion, language switching, and mobile-first layout.
- Dynamic project grid backed by API data with fallback project content for resilient rendering.
- Admin CMS for adding, editing, deleting, publishing, reordering, and uploading project previews without changing source code.
- Contact form with validation, honeypot spam protection, CMS inbox storage, and optional SMTP email alerts.
- Refresh-token rotation with reuse detection, logout revocation, secure cookie config, and short access-token lifetime.
- Production SEO package: metadata, OpenGraph image, Twitter preview, favicon, manifest, robots, and sitemap.
- CI/CD workflows for tests/builds plus optional production smoke checks and deploy hooks.
- Structured request/error logging with request IDs for easier debugging after deploy.

## Featured Projects

| Project | Stack signal | Product angle |
| --- | --- | --- |
| **DreamTune** | React, Node.js, Express, PostgreSQL, Capacitor | Music platform with Spotify sync, YouTube audio sourcing, offline direction, and Android-first UX. |
| **GymEngine** | Flutter, Dart, NestJS, TypeScript, SQLite | Strength training companion focused on fast workout logging and mobile routine flow. |
| **NutriAI** | React, Node.js, PostgreSQL, Gemini AI | Nutrition platform with AI meal analysis, tracking, rewards, and structured data persistence. |
| **PajamaTalk** | Kotlin Compose, FastAPI, JWT, WebSockets | Cozy language learning app with SRS scheduling and real-time speech-practice direction. |
| **DrivePrep / PDRPrep** | React, FastAPI, Python, PostgreSQL | Ukrainian driving theory exam platform with tests, progress analytics, battles, and premium-tier structure. |
| **Menu Portal** | PHP, Laravel, Blade, MySQL | Menu management CMS direction with CRUD flows, validation, and admin content structure. |

More detailed notes live in [docs/project-case-studies.md](docs/project-case-studies.md).

## Architecture

```text
my-portfolio/
  client/
    src/app/                         Next.js routes, metadata, SEO files
    src/components/portfolio/        Public UI sections and shared interaction pieces
    src/features/portfolio/          Portfolio data, hooks, services, i18n, project modules
    src/features/admin/              Admin CMS API, components, hooks, form mapping
    e2e/                             Playwright portfolio/admin/production smoke tests
  server/
    src/controllers/                 Auth, project, and message handlers
    src/models/                      Admin, Project, Message, RefreshToken schemas
    src/middleware/                  Auth, upload, request id, error handling
    src/scripts/                     Cloudinary, SMTP, and env verification scripts
    src/utils/                       Logging, mail, uploads, seed admin, token helpers
  .github/workflows/                 CI, deploy, and optional production smoke workflows
```

## Local Setup

```bash
npm install
copy client\.env.example client\.env.local
copy server\.env.example server\.env
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:3000` or custom dev port such as `http://localhost:3178`
- Backend: `http://localhost:5050`
- Admin: `http://localhost:3000/admin`

The server needs a real `.env` for local live mode:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio
JWT_SECRET=use-a-long-random-secret-at-least-24-characters
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password
CLIENT_URLS=http://localhost:3000,http://localhost:3178
```

## Scripts

```bash
npm run dev
npm run build -w client
npm run lint -w client
npm run test:server
npm run test:e2e -w client
npm run test:e2e:production -w client
npm run audit:env
npm run verify:cloudinary
npm run verify:smtp
```

## Testing

- `npm run test:server` covers CORS, auth, refresh-token rotation, project CRUD, upload cleanup, project ordering, contact validation, honeypot filtering, and admin message management.
- `npm run test:e2e -w client` runs Playwright against desktop Chrome and Pixel 5.
- `npm run test:e2e:production -w client` is optional and skipped without `E2E_PRODUCTION_URL`.

Production smoke secrets:

```env
E2E_PRODUCTION_URL=https://your-portfolio.vercel.app
E2E_ADMIN_EMAIL=admin@example.com
E2E_ADMIN_PASSWORD=strong-password
E2E_CONTACT_EMAIL=you@example.com
```

## Production Checklist

- Full deployment runbook: [docs/deployment.md](docs/deployment.md).
- Compact launch checklist: [docs/production-checklist.md](docs/production-checklist.md).

- Set `NEXT_PUBLIC_SITE_URL` for correct canonical, sitemap, OpenGraph, and social previews.
- Set `NEXT_PUBLIC_API_URL` to the deployed API URL ending in `/api`.
- Set `CLIENT_URL` or `CLIENT_URLS` on the backend so production CORS allows only known frontend origins.
- Use MongoDB Atlas or another persistent MongoDB host.
- Keep `JWT_SECRET` private and long.
- Use `REFRESH_COOKIE_SECURE=true` and `REFRESH_COOKIE_SAMESITE=none` for cross-site Vercel/Render deploys.
- Use `FILE_STORAGE_DRIVER=cloudinary` plus Cloudinary secrets for durable uploaded project images.
- Add SMTP credentials if email alerts from the contact form should be sent.
- Run `npm run audit:env` before deployment.

## CI/CD

The repo includes GitHub Actions workflows:

- **CI:** installs dependencies, runs server tests, typechecks the client, builds the client, installs Chromium, and runs Playwright E2E.
- **Deploy:** optionally deploys the client to Vercel and triggers a Render deploy hook when secrets exist.
- **Production Smoke:** manual workflow for deployed public/contact/admin CMS checks.

Missing deployment secrets do not break workflows; those steps are skipped with a clear message.

## Security And Reliability

- Exact-origin CORS configuration for production.
- Helmet security headers and disabled `x-powered-by`.
- Rate limits for auth and contact endpoints.
- Honeypot protection for the contact form.
- Request IDs returned in API responses and logs.
- Structured production error logging.
- Refresh-token rotation with reuse detection and logout revocation.

## Notes

The public portfolio has polished fallback content so it can be reviewed immediately. Real project management happens through the admin CMS once the backend, database, and production storage are configured.
