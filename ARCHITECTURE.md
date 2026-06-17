# Architecture — Aether AI

## Stack Overview

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | Server components + API routes in one repo, no separate backend needed |
| Database | MongoDB Atlas + Mongoose | Flexible document schema for evolving agent configs |
| Auth | NextAuth.js v4 (JWT) | Stateless sessions — no DB hit on every request |
| Passwords | bcrypt (cost 12) | Industry standard; never stored in plaintext |
| Forms | React Hook Form + Zod | Client + server validation with shared schema |
| UI | shadcn/ui + Tailwind v4 | Accessible headless components, full design control |
| Animation | Framer Motion | Marketing site only — dashboard kept lightweight |
| CI/CD | GitHub Actions + Vercel | Lint → typecheck → build gate before every deploy |

---

## System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │ Marketing    │    │ Auth Pages   │    │Dashboard │  │
│  │ / /about     │    │ /login       │    │/dashboard│  │
│  │ /services    │    │ /register    │    │/agents   │  │
│  └──────┬───────┘    └──────┬───────┘    └────┬─────┘  │
└─────────┼───────────────────┼─────────────────┼────────┘
          │                   │                 │
          ▼                   ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                    │
│                                                         │
│  Server Components        │   API Routes                │
│  ─────────────────        │   ──────────                │
│  layout.tsx               │   /api/auth/[...nextauth]   │
│  └─ getServerSession()    │   /api/agents               │
│     └─ redirect /login    │   /api/agents/[id]          │
│        or render page     │   /api/users                │
│                           │   /api/users/[id]           │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     MongoDB Atlas                       │
│                                                         │
│   users collection          agents collection           │
│   ────────────────          ──────────────────          │
│   _id                       _id                         │
│   name                      name                        │
│   email (unique)            description                 │
│   password (bcrypt)         type                        │
│   role (admin|user)         status                      │
│   createdAt                 createdBy → users._id       │
│   updatedAt                 createdAt                   │
│                             updatedAt                   │
└─────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
1. POST /api/auth/callback/credentials
   ├── authorize(credentials)
   │     ├── User.findOne({ email })          ← MongoDB lookup
   │     ├── bcrypt.compare(password, hash)   ← timing-safe compare
   │     └── return { id, name, email, role }
   │
   ├── jwt() callback
   │     └── token ← { id, role }             ← injected into JWT
   │
   └── session() callback
         └── session.user ← { id, role }      ← available to all server components

2. Every protected route / API
   └── getServerSession(authOptions)
         ├── reads JWT from httpOnly cookie (no DB query)
         ├── no session   → redirect /login  (or 401)
         └── wrong role   → redirect /dashboard (or 403)
```

---

## Authorization Matrix

```
                        Admin    User (own)   User (others)
                        ─────    ──────────   ─────────────
GET    /dashboard         ✅         ✅             ✅
GET    /dashboard/agents  ✅         ✅             ✅
GET    /dashboard/users   ✅         ❌ →/dashboard  ❌
GET    /api/agents        ✅ (all)   ✅ (scoped)    n/a
POST   /api/agents        ✅         ✅             n/a
PUT    /api/agents/[id]   ✅         ✅             ❌ 403
DELETE /api/agents/[id]   ✅         ✅             ❌ 403
GET    /api/users         ✅         ❌ 403         ❌ 403
DELETE /api/users/[id]    ✅ *       ❌ 403         ❌ 403

* Admin cannot delete their own account (self-deletion guard)
```

---

## Data Models

### User
```typescript
{
  name:      string           // display name, required, trimmed
  email:     string           // unique, lowercased, trimmed
  password:  string           // bcrypt hash — cost factor 12
  role:      "admin" | "user" // default: "user"
  createdAt: Date             // auto via Mongoose timestamps
  updatedAt: Date
}
```

### Agent
```typescript
{
  name:        string                               // 2–50 chars, required
  description: string                               // optional, max 500 chars
  type:        "assistant" | "copilot" | "custom"   // required
  status:      "idle" | "running" | "paused" | "failed" // default: "idle"
  createdBy:   ObjectId                             // ref: User (ownership)
  createdAt:   Date
  updatedAt:   Date
}
```

The `createdBy` reference is how ownership scoping works — every API query for regular users appends `{ createdBy: session.user.id }` to the filter.

## Key Design Decisions

### Server Components for Auth Gates
Rather than doing auth checks client-side (which causes a flash of content), the dashboard `layout.tsx` is a server component that calls `getServerSession()` before anything renders. If there's no session, the user is redirected before a single byte of dashboard HTML is sent to the browser.

### JWT over Database Sessions
JWT strategy means no database round-trip to validate a session. The token carries `id`, `name`, `email`, and `role`, which is everything the dashboard needs. Sessions expire after 7 days.

### Direct DB Queries on the Dashboard Page
The dashboard overview stats (`totalAgents`, `activeAgents`, `totalUsers`) are fetched with `countDocuments()` directly in the server component, not via a client-side fetch. This means the stats are always fresh on page load with no loading spinner, just server-rendered HTML.

### Zod Validated at Both Layers
Forms validate client-side (instant user feedback) using the same Zod schema that the API route validates server-side. This means frontend validation can never be bypassed; a direct `curl` to the API still gets rejected with a proper 400 and error message.
