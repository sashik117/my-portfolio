# Deployment Runbook

This runbook keeps deploy setup boring and predictable.

## 1. Database

Create a MongoDB Atlas database and copy the connection string.

Required server values:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio
MONGODB_DB=portfolio
```

## 2. Backend on Render or Railway

Deploy the `server` workspace.

Render settings:

- Build command: `npm install -w server`
- Start command: `npm start -w server`
- Health check path: `/api/health`

Required server secrets:

```env
NODE_ENV=production
JWT_SECRET=long-random-secret-at-least-24-characters
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=strong-admin-password
CLIENT_URLS=https://your-frontend-domain.vercel.app
REFRESH_COOKIE_SAMESITE=none
REFRESH_COOKIE_SECURE=true
```

Optional but recommended:

```env
FILE_STORAGE_DRIVER=cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO=...
```

## 3. Frontend on Vercel

Deploy the `client` workspace.

Required client env:

```env
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-portfolio-domain.com
```

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, sitemap, and social previews.

## 4. GitHub Secrets

For deploy workflow:

```env
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
RENDER_DEPLOY_HOOK_URL=
```

For production smoke workflow:

```env
E2E_PRODUCTION_URL=
E2E_ADMIN_EMAIL=
E2E_ADMIN_PASSWORD=
E2E_CONTACT_EMAIL=
```

For optional integration verification:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_TO=
SMTP_TEST_TO=
```

## 5. Preflight Commands

Run locally before deploy when env files are ready:

```bash
npm run audit:env
npm run verify:seo
npm run test:server
npm run lint -w client
npm run build -w client
npm run test:e2e -w client
```

Run after deploy:

```bash
npm run test:e2e:production -w client
```

## 6. Manual Smoke Checklist

- Public page loads.
- Telegram/LinkedIn preview shows `og-image.png`.
- Project modal opens and closes on mobile.
- Language switch works.
- Contact form stores a message.
- Admin login works.
- Admin can create, edit, reorder, and delete a project.
- Uploaded project images still work after backend restart.
