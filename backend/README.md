# Tulcan Energy E&P — Standalone Backend API Service

This directory (`backend/`) contains the standalone RESTful API server for the **Tulcan Energy Exploration & Production** web platform and Admin CMS portal.

It is decoupled from the Next.js frontend and can be deployed independently to cloud platforms like **Render**, **Railway**, **Fly.io**, **AWS**, **DigitalOcean**, or **Heroku**.

---

## 1. Tech Stack & Dependencies

- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL (Hosted on Neon serverless PostgreSQL)
- **ORM**: Prisma Client v6.x
- **Language**: TypeScript / tsx

---

## 2. API Endpoints Directory

### Health Check
- `GET /api/health`: Service health and timestamp.

### Admin CMS Portal Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/overview` | Aggregated telemetry (inquiries, applications, blogs, staff counters) |
| `GET` | `/api/admin/inquiries` | Fetch all contact form inquiries |
| `PATCH` | `/api/admin/inquiries` | Mark inquiry as read / unread (`{ id, isRead }`) |
| `DELETE` | `/api/admin/inquiries?id=:id` | Delete an inquiry record |
| `GET` | `/api/admin/applications` | Fetch all job applications & resumes |
| `PATCH` | `/api/admin/applications` | Update applicant status (`{ id, status }`) |
| `GET` | `/api/admin/blogs` | Fetch all blog dispatches & categories |
| `POST` | `/api/admin/blogs` | Create a new blog post (`{ title, content, ... }`) |
| `PATCH` | `/api/admin/blogs` | Update an existing blog post |
| `DELETE` | `/api/admin/blogs?id=:id` | Delete a blog post |
| `GET` | `/api/admin/teams` | Fetch all staff (Leadership & Operating Committee) |
| `POST` | `/api/admin/teams` | Add a team member (`{ firstName, lastName, position, category, ... }`) |
| `PATCH` | `/api/admin/teams` | Update a team member's details |
| `DELETE` | `/api/admin/teams?id=:id` | Delete a team member |

### Public Web Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit technical inquiry from website |
| `POST` | `/api/careers/apply` | Submit job application and CV resume |

---

## 3. Local Setup & Execution

### Install Dependencies
```bash
cd backend
npm install
```

### Generate Prisma Client
```bash
npm run prisma:generate
```

### Start Development Server
```bash
npm run dev
```
The API will start listening at: `http://localhost:5000`

---

## 4. Production Build & Deployment

### Build TypeScript:
```bash
npm run build
npm start
```

### Deploying to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your repository and set the **Root Directory** to `backend`.
3. Set **Build Command**: `npm install && npx prisma generate && npm run build`
4. Set **Start Command**: `npm start`
5. Add Environment Variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `FRONTEND_URL`: URL of your deployed Next.js site (e.g. `https://tulcanepc.com`).
   - `NODE_ENV`: `production`

### Deploying to Railway
1. Create a new project on [Railway](https://railway.app).
2. Select repository and set root directory to `/backend`.
3. Railway automatically detects `package.json` and runs `npm run build && npm start`.
4. Configure `DATABASE_URL` in Railway Variables.

---

## 5. Connecting Frontend to this Backend

In the Next.js frontend root directory (`../`):
Set the environment variable in `.env.local` or in your frontend hosting dashboard (Vercel, Netlify):

```env
NEXT_PUBLIC_API_URL="https://your-deployed-backend-api.onrender.com"
```

If `NEXT_PUBLIC_API_URL` is omitted, the frontend automatically falls back to local relative endpoints.
