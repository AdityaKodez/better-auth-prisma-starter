# Better Auth Starter Template

A complete authentication starter template with Better Auth, Prisma ORM, and Neon PostgreSQL.

## Features

- ✅ Email/Password authentication with email verification (OTP)
- ✅ Google OAuth integration
- ✅ Protected routes (middleware + page-level)
- ✅ Prisma ORM with Neon PostgreSQL
- ✅ React Hook Form + Zod validation
- ✅ shadcn/ui components
- ✅ Custom fonts (Inter for headings, JetBrains Mono for body)

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

**Required Environment Variables:**

- `NEON_NEON_DATABASE_URL` - Already configured from Neon integration
- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` - Get from [Google Cloud Console](https://console.cloud.google.com/)
- `GOOGLE_CLIENT_SECRET` - Get from Google Cloud Console
- `RESEND_API_KEY` - Get from [Resend](https://resend.com/)
- `EMAIL_FROM` - Your verified sender email in Resend

### 3. Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 4. Setup Resend

1. Sign up at [Resend](https://resend.com/)
2. Verify your domain or use their test domain
3. Create an API key
4. Add to `.env.local`

### 5. Setup Database

\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
\`\`\`

### 6. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000/signup` to test the authentication flow.

## Authentication Flow

### Signup Flow
1. User enters email/password → submits form
2. Better Auth creates unverified user
3. OTP sent to email via Resend
4. User redirected to `/verify-email`
5. User enters OTP → account verified → redirect to `/dashboard`

### Login Flow
1. User enters credentials or clicks Google
2. Better Auth validates
3. Redirect to `/dashboard` if verified
4. Redirect to `/verify-email` if unverified

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. OAuth popup/redirect
3. Better Auth handles callback
4. Auto-verified → redirect to `/dashboard`

## Protection Levels

This template implements **dual-layer protection**:

1. **Middleware Protection** (`middleware.ts`)
   - Checks authentication at the edge
   - Redirects unauthenticated users before page loads

2. **Page-Level Protection** (`app/dashboard/page.tsx`)
   - Server-side session check in page component
   - Additional security layer
   - Prevents unauthorized access even if middleware is bypassed

## Project Structure

\`\`\`
├── app/
│   ├── api/auth/[...all]/route.ts  # Auth API handler
│   ├── signup/page.tsx              # Signup page
│   ├── login/page.tsx               # Login page
│   ├── verify-email/page.tsx        # OTP verification
│   └── dashboard/page.tsx           # Protected dashboard
├── components/
│   └── auth/
│       ├── signup-form.tsx          # Signup form component
│       ├── login-form.tsx           # Login form component
│       └── verify-email-form.tsx    # OTP verification form
├── lib/
│   ├── auth.ts                      # Better Auth config
│   ├── auth-client.ts               # Client-side auth utilities
│   ├── auth-guard.tsx               # Client-side auth guard
│   └── prisma.ts                    # Prisma client
├── prisma/
│   └── schema.prisma                # Database schema
└── middleware.ts                    # Route protection
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## Tech Stack

- **Framework:** Next.js 16
- **Auth:** Better Auth 1.1+
- **Database:** Neon PostgreSQL
- **ORM:** Prisma 6+
- **Email:** Resend
- **Forms:** React Hook Form + Zod
- **UI:** shadcn/ui + Tailwind CSS v4
- **Fonts:** Inter (headings) + JetBrains Mono (body)
