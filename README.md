# Tulcan Energy Exploration & Production (E&P)

Enterprise-grade corporate web application and content management system for **Tulcan Energy Exploration and Production Company Limited** — an indigenous Nigerian upstream energy firm specializing in technical geoscience, reservoir asset development, and sustainable hydrocarbon production.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with brand design tokens
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) + [Neon Serverless PostgreSQL](https://neon.tech/)
- **Media Asset Storage**: [Cloudinary](https://cloudinary.com/) (Direct API uploads with fallback resilience)
- **Security**: BCrypt manual admin authentication & secure session token verification

---

## 🌟 Key Features

1. **Corporate Public Experience**:
   - **Hero Carousel**: High-impact, multi-slide operational showcase with progress bars and smooth video/image backgrounds.
   - **Interactive Governance**: "Board & Executive Officers" and "Operating Committee" sections featuring responsive 3-box layouts (400px × 400px) and a black-and-white to color hover effect.
   - **Asset Portfolios**: Upstream concessions, deepwater appraisal, and infrastructure overviews.
   - **Careers & Inquiries**: Dynamic job vacancy listings, resume upload workflows, and contact inquiry dispatch.

2. **Centralized Admin CMS (`/admin`)**:
   - **Secure Authentication**: Email and password credentials verification.
   - **Team Management**: Reorder leadership positions with up/down ranking, assign team categories (*Executive Leadership / Board* vs. *Operating Committee*), edit bios, and upload headshots to Cloudinary.
   - **Articles & Insights**: Publish, edit, and categorize press releases and industry analyses.
   - **Document Vault**: Upload and maintain company profile documents (.PDF).
   - **Applicant Tracking**: Review incoming job applications and downloadable resumes.
   - **Inquiries Inbox**: Monitor, read, and flag corporate partnership inquiries.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### 2. Environment Configuration
Copy the sample environment file and fill in your credentials:
```bash
cp .env.example .env
```

Ensure the following variables are configured in `.env`:
```env
DATABASE_URL="your-postgresql-database-url"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔒 Security Best Practice
Never commit `.env` or `.env*.local` files to version control. The repository includes a `.gitignore` configured to keep your secrets and build artifacts safe.
