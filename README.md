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

- Frontend: http://localhost:3000
- Backend: http://localhost:5050
- Admin: http://localhost:3000/admin

Default local admin credentials come from `server/.env`.

## Deployment

- Deploy `client` to Vercel or Netlify.
- Deploy `server` to Render or Railway.
- Set `NEXT_PUBLIC_API_URL` on the frontend to your deployed backend URL, ending with `/api`.
- Set `CLIENT_URL` on the backend to your deployed frontend URL.

## Notes

The portfolio UI includes fallback demo projects so the design can be viewed immediately. Real project management happens through the admin panel once MongoDB is connected.
