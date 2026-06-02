# my-portfolio

Premium interactive portfolio with a Next.js frontend, Express API, MongoDB-backed CMS, admin dashboard, image uploads, contact messages, animations, and responsive layouts.

## Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB/Mongoose
- Auth: JWT + bcrypt
- Uploads: Multer
- Email: Nodemailer

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

```bash
copy client\.env.example client\.env.local
copy server\.env.example server\.env
```

3. Put your MongoDB connection string in `server/.env`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/portfolio
```

4. Start both apps:

```bash
npm run dev
```

- Frontend: http://localhost:3000 (or your chosen dev port, e.g. http://localhost:3178)
- Backend: http://localhost:5050
- Admin: http://localhost:3000/admin

Default local admin credentials come from `server/.env`.

## Quality Checks

```bash
npm run lint -w client
npm run build -w client
npm run test:server
```

Server tests run against an in-memory MongoDB instance and cover auth, project CRUD, image upload cleanup, contact messages, and CORS behavior.

## CMS Behavior

- Projects are managed dynamically through the admin CMS.
- Project order is stored in the database and can be changed from the admin dashboard.
- Replacing or deleting project preview images cleans up old local upload files.
- Admin JWT lifetime is controlled by `ADMIN_TOKEN_EXPIRES_IN` and defaults to `7d`.

## Deployment

- Deploy `client` to Vercel or Netlify. If Vercel asks for the root directory, use `client`.
- Deploy `server` to Render or Railway. A Render blueprint is included in `render.yaml`.
- Set `NEXT_PUBLIC_API_URL` on the frontend to your deployed backend URL, ending with `/api`, for example `https://your-api.onrender.com/api`.
- Set `CLIENT_URL` on the backend to your deployed frontend URL, or `CLIENT_URLS` for multiple allowed origins separated by commas.
- Keep `JWT_SECRET` long and private. The server refuses to start if it is shorter than 24 characters.
- For production uploads, set `FILE_STORAGE_DRIVER=cloudinary` and add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and optionally `CLOUDINARY_FOLDER`.
- If `FILE_STORAGE_DRIVER=local`, uploaded images are stored in `server/src/uploads`. Render free filesystem is ephemeral, so Cloudinary or another persistent file store is recommended for a serious deployment.

## Notes

The portfolio UI includes fallback demo projects so the design can be viewed immediately. Real project management happens through the admin panel once MongoDB is connected.
