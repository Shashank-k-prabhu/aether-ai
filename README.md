# Aether AI

> **Live demo →** [aether-ai-skp.vercel.app](https://aether-ai-skp.vercel.app)  
> **Repo →** [github.com/Shashank-k-prabhu/aether-ai](https://github.com/Shashank-k-prabhu/aether-ai)

An AI agent management platform built with Next.js 16, MongoDB, and NextAuth. You can deploy, configure, and monitor AI agents through a role-based authenticated dashboard. Admins get full control across all users; regular users manage only their own agents.

---

## 🔑 Test Credentials

Log in immediately — no registration required.

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | `admin@aether.ai` | `Admin@123` | Full — all agents, user management, delete any account |
| **User** | `user@aether.ai` | `User@123` | Own agents only — `/dashboard/users` redirects away |

---

## ✅ What's Done

- **Marketing site** — Landing page with animated hero, features, agent preview, About and Services pages (Framer Motion)
- **Authentication** — Register + Login with bcrypt hashing, JWT sessions via NextAuth, error states inline on forms
- **Role-based access control** — `admin` and `user` enforced at the layout level (server-side) and on every API route
- **Protected routes** — `getServerSession()` in `layout.tsx` redirects unauthenticated users before any page renders
- **Agents CRUD** — Create, read, update, delete with search, pagination (9/page), Zod + React Hook Form validation, delete confirmation dialog, loading skeletons, empty states
- **User Administration** — Admin-only panel with all registered accounts, role badges, search, delete with self-deletion guard
- **Dashboard overview** — Live stats (total agents, active agents, total users) queried directly from MongoDB at render time
- **Custom scrollbar** — Thin themed scrollbar matching the dark console aesthetic (webkit + Firefox)
- **CI/CD** — GitHub Actions pipeline: lint → type check → build on every push to `main`
- **Deployment** — Auto-deployed to Vercel from `main`

<!-- ## ⚠️ What's Not Done / Trade-offs

- **No automated tests** — Would add Playwright for E2E and Vitest for unit tests given more time
- **No email verification** — Register flow accepts any email; production would need Resend or Nodemailer
- **No image uploads** — Agents don't have avatars; would use Cloudinary or S3 pre-signed URLs
- **"API Status" card is static** — Shows "Online" always; a real system would ping a health endpoint -->

---

## 🚀 Local Setup

### 1. Clone and install

```bash
git clone https://github.com/Shashank-k-prabhu/aether-ai.git
cd aether-ai
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values (see table below).

### 3. Seed the database

Creates the admin and demo user accounts with hashed passwords:

```bash
node scripts/seed-admin.mjs
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string (or local `mongodb://localhost:27017/aether-db`) |
| `NEXTAUTH_SECRET` | ✅ | Random 32-char secret — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | ✅ | Full URL of the app — `http://localhost:3000` for local dev |

A template with descriptions is in [`.env.example`](.env.example). **No real secrets are committed to this repo.**

---

## 🏗️ Architecture

```
Browser
  │
  ├── GET /              → Next.js Server Component (marketing site)
  ├── GET /login         → Client Component (NextAuth signIn)
  ├── GET /dashboard/**  → Server Layout (session check → redirect or render)
  │
  └── Fetch /api/**
        ├── /api/auth/[...nextauth]  ← NextAuth handler (JWT strategy)
        ├── /api/agents              ← GET all, POST create
        ├── /api/agents/[id]         ← PUT update, DELETE delete
        ├── /api/users               ← GET all (admin only)
        └── /api/users/[id]          ← PUT role, DELETE (admin only)
              │
              └── MongoDB Atlas
                    ├── users       { name, email, password(bcrypt), role, timestamps }
                    └── agents      { name, description, type, status, createdBy→User, timestamps }
```

### Data Models

**User**
```ts
{
  name:      string           // display name
  email:     string           // unique, lowercased
  password:  string           // bcrypt hash (cost 12) — never stored plain
  role:      "admin" | "user" // default: "user"
  createdAt: Date
  updatedAt: Date
}
```

**Agent**
```ts
{
  name:        string                               // 2–50 chars
  description: string                               // optional, max 500 chars
  type:        "assistant" | "copilot" | "custom"
  status:      "idle" | "running" | "paused" | "failed"
  createdBy:   ObjectId → User                      // for ownership scoping
  createdAt:   Date
  updatedAt:   Date
}
```

### Auth Flow

```
User submits login form
  → NextAuth authorize() callback
  → bcrypt.compare(password, hash)
  → JWT issued: { id, name, email, role }
  → Cookie set (httpOnly, 7-day TTL)
  → Redirect to /dashboard

Every dashboard page/API route:
  → getServerSession() reads JWT from cookie
  → No DB query — role lives in the token
  → If no session → redirect /login
  → If wrong role → redirect /dashboard
```

### Role-Based Access

```
Route                   | Admin | User
------------------------|-------|------
GET /dashboard          |  ✅   |  ✅
GET /dashboard/agents   |  ✅   |  ✅  (own agents only)
GET /dashboard/users    |  ✅   |  ❌  → redirected
DELETE /api/agents/[id] |  ✅   |  ✅  (own only, enforced server-side)
GET /api/users          |  ✅   |  ❌  → 403
DELETE /api/users/[id]  |  ✅   |  ❌  → 403
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       # Sign-in form
│   │   └── register/page.tsx    # Sign-up form with validation
│   ├── dashboard/
│   │   ├── layout.tsx           # Server auth gate + sidebar/header shell
│   │   ├── page.tsx             # Overview (live DB stats)
│   │   ├── agents/page.tsx      # Full CRUD — all in one client component
│   │   └── users/page.tsx       # Admin-only user management
│   ├── about/page.tsx
│   ├── services/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/  # NextAuth
│       ├── agents/route.ts      # GET, POST
│       ├── agents/[id]/route.ts # PUT, DELETE
│       ├── users/route.ts       # GET (admin)
│       └── users/[id]/route.ts  # PUT, DELETE (admin)
├── models/
│   ├── User.ts
│   └── Agent.ts
├── lib/
│   ├── auth.ts                  # NextAuth config
│   └── mongodb.ts               # Singleton connection
└── components/
    ├── dashboard/
    │   ├── dashboard-sidebar.tsx
    │   ├── dashboard-header.tsx
    │   └── users-container.tsx
    ├── marketing/               # Landing page sections
    └── ui/                      # shadcn/ui components
```

---

## 🤖 How I Used AI

**Tool:** Antigravity (Google DeepMind's agentic coding assistant), used throughout as a pair programmer.

### What I actually used it for

I used AI as a force multiplier for **structure and boilerplate** — not for product decisions. Things like: wiring up the NextAuth JWT + session callbacks, scaffolding the Zod schemas, and generating the initial CRUD form with the slide-out Sheet component. I'd describe exactly what I wanted, review the output, tweak it, and move on.

### A prompt I accepted almost as-is

I asked it to write the `authorize()` callback in `lib/auth.ts` — the bcrypt comparison, the specific error messages ("No account found with that email" vs "Incorrect password"), and the JWT/session callback chain. The output was clean and production-ready. I kept it because it matched how I'd write it myself — it already knew to lowercase and trim the email before the DB query, which is an easy bug to miss.

### Where it got it wrong and I corrected it

Two places stand out.

**1. Hardcoded dashboard stats.** The first version of the dashboard overview had `"Active Agents: 0"` and `"Total Users: 1"` — just static placeholder strings. I caught this, pushed back, and told it to replace them with real `countDocuments()` queries from MongoDB. More importantly, I specified the scoping rule: admins get totals across all users, regular users get counts scoped to their own `createdBy` field. That business rule wasn't in the initial code — I had to drive it.

**2. Client-side fetch for dashboard stats.** It initially suggested using `useEffect` + a fetch call to `/api/agents` to get the count. I overruled it — the dashboard page is a server component, so I can query MongoDB directly at render time. No extra API route, no client-side loading state, one fewer network round-trip. That was a technical judgement call I made, not the AI.

### My honest take

AI is fast at generating structurally correct code. What it doesn't know is *your product* — the business rules, which UX trade-offs matter, what the feature is actually supposed to do. I found myself using it most effectively when I already had a clear picture of what I wanted and just needed it faster. The parts of the code I'm most satisfied with (role-based scoping, the redirect logic, the stat queries, the delete-self guard on the users table) all required me to think through the decision before the AI could help with implementation.

---

## ⚙️ CI/CD

GitHub Actions runs on every push and PR to `main`:

1. `npm ci` — clean install
2. `npm run lint` — ESLint
3. `npx tsc --noEmit` — TypeScript check
4. `npm run build` — Next.js production build

Vercel auto-deploys from `main` after the workflow passes. Environment variables are set in the Vercel project dashboard.
