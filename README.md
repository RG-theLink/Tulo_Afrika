# Tuto ki Tulo mwa Afrika — Developer README

> **"Education is Victory for Africa"**
>
> A unified AI-powered learning portal for African students, educators, and schools.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Architecture Overview](#4-architecture-overview)
5. [Features: Implemented vs Placeholder](#5-features-implemented-vs-placeholder)
6. [User Roles & Access](#6-user-roles--access)
7. [Authentication System](#7-authentication-system)
8. [AI Integration](#8-ai-integration)
9. [Database Schema](#9-database-schema)
10. [API Routes Reference](#10-api-routes-reference)
11. [Frontend Pages & Components](#11-frontend-pages--components)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Environment Variables](#13-environment-variables)
14. [Local Development Setup](#14-local-development-setup)
15. [Known Bugs & Issues](#15-known-bugs--issues)
16. [What's Next / Not Yet Built](#16-whats-next--not-yet-built)

---

## 1. Project Overview

**Tuto ki Tulo mwa Afrika** (stylised: "Tulo Afrika") is an educational SaaS platform targeting African schools and learners. It is currently in **demo/pre-launch mode**. The platform aggregates:

- A learning management system (LMS) for schools
- AI-powered tutoring and search for students
- Educator tools (lesson planning, announcements, scheduling)
- Admin dashboard for platform management
- A Discord-style real-time messaging platform (UI only, no backend socket)
- Subscription/pricing tiers for students, educators, and schools

One school is currently registered: **Swakopmund Christian Academy** (Namibia), which has an active integration with the platform's e-learning portal.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript, Vite, Tailwind CSS |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Backend (Prod) | Cloudflare Pages Functions (Edge Workers) |
| Backend (Dev) | Express.js (`server.js`) on port 3001 |
| Database (Prod) | Cloudflare D1 (SQLite-compatible) |
| Database (Alt) | Supabase (PostgreSQL) — partially wired, not primary |
| Session Storage | Cloudflare KV |
| AI Provider 1 | Google Gemma (via Google AI Studio REST API) |
| AI Provider 2 | Cloudflare Workers AI (REST fallback) |
| AI Provider 3 | OpenRouter — configured but not confirmed active |
| Voice Widget | ElevenLabs ConvAI (embedded widget, agent ID hardcoded) |
| Process Manager | PM2 (config present, used for Node dev server) |
| Deployment | Cloudflare Pages (primary), Netlify (proxied frontend) |

---

## 3. Repository Structure

```
/
├── src/                          # React frontend source
│   ├── App.tsx                   # Root router, all routes defined here
│   ├── pages/                    # Full-page route components
│   ├── components/
│   │   ├── admin/                # Admin dashboard suite
│   │   ├── auth/                 # Auth forms + custom AuthContext (non-Supabase)
│   │   ├── common/               # Shared UI components
│   │   ├── dashboard/
│   │   │   ├── student/          # Student-specific dashboard views
│   │   │   ├── educator/         # Educator-specific dashboard views
│   │   │   ├── messaging/        # Messaging platform UI
│   │   │   └── widgets/          # Dashboard widget cards
│   │   └── forms/                # Student & School signup forms
│   ├── contexts/                 # Supabase-based AuthContext (UNUSED in main app)
│   ├── lib/
│   │   ├── api.ts                # All frontend API calls
│   │   └── supabase.ts           # Supabase client (UNUSED in main app flow)
│   └── config/
│       └── api.config.ts         # API base URL resolution logic
│
├── functions/                    # Cloudflare Pages Functions (Edge API)
│   ├── api/[[path]].ts           # Catch-all API router
│   ├── routes/                   # Individual route handlers
│   │   ├── auth.ts               # Register, login, logout, verify
│   │   ├── ai.ts                 # Chat, search, copilot (with AI fallback chain)
│   │   ├── users.ts              # User CRUD
│   │   ├── resources.ts          # Educational resources CRUD
│   │   ├── messages.ts           # Inbox/send messages (DB-backed)
│   │   ├── waitlist.ts           # Waitlist sign-up
│   │   └── diagnostic.ts         # Debug/health check endpoint
│   └── utils/
│       ├── auth.ts               # Password hash, session, token (primary)
│       └── auth-fixed.ts         # Duplicate of auth.ts (historical fix artifact)
│
├── netlify/functions/            # Netlify serverless functions (legacy/alt)
│   ├── db-health.ts
│   ├── schools-list.ts
│   └── schools-add.ts
│
├── supabase/migrations/          # Supabase SQL migrations (not primary DB path)
├── schema.sql                    # Primary D1 schema (SQLite)
├── schema-d1.sql                 # Alternate/duplicate D1 schema file
├── d1-seed.sql                   # Seed data for D1
├── server.js                     # Express dev server (in-memory storage, demo mode)
├── wrangler.toml                 # Cloudflare Workers/Pages config
├── netlify.toml                  # Netlify config (proxies /api/* to Cloudflare)
├── vite.config.ts                # Vite config (dev proxy: /api -> localhost:3001)
├── tailwind.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── ecosystem.config.cjs / .js    # PM2 config (for Node server in prod-like envs)
```

---

## 4. Architecture Overview

```
Browser (React SPA)
       |
       +-- Dev: Vite proxy /api -> Express server (localhost:3001, in-memory DB)
       |
       +-- Prod: Netlify hosts built dist/
                  +-- netlify.toml proxies /api/* -> https://tulo-afrika.pages.dev/api
                                                          |
                                               Cloudflare Pages Functions
                                               (functions/api/[[path]].ts)
                                                          |
                                          +--------------+----------------+
                                      D1 Database    KV Sessions     Workers AI
                                      (SQLite)
```

**Key point:** The frontend and API are split across two platforms — Netlify (UI) and Cloudflare Pages (API). The `netlify.toml` proxy is the bridge.

---

## 5. Features: Implemented vs Placeholder

### Implemented & Functional

| Feature | Notes |
|---|---|
| Landing page | Hero, Features, Educators, RegisteredSchools, Footer sections |
| Login flow | Email/password login using custom AuthContext; demo users hardcoded |
| Demo credentials | See [User Roles](#6-user-roles--access) section |
| Student dashboard | Layout with sidebar, header, widgets, sub-pages |
| Educator dashboard | Separate view with educator-specific widgets |
| Admin dashboard | Overview, student/educator/resource/subscription management views |
| AI Co-Pilot widget | Calls `/api/ai/copilot` — functional with fallback chain |
| AI Search & Chat | Calls `/api/ai/search` and `/api/ai/chat` — functional with fallback chain |
| AI provider fallback | Tries Google Gemma -> Cloudflare Workers AI -> hardcoded fallback response |
| Messaging UI | Full Discord-like UI (channels, DMs, emoji picker, reactions) — **UI-only** |
| Pricing page | Three tiers each for students, educators, schools — display only |
| Waitlist form | Collects name/email, simulated submission (no real DB write from frontend) |
| Donation form | Opens local email client via `mailto:` link |
| ElevenLabs voice widget | Embeds ConvAI agent (agent ID: `agent_01jxqqea5wfqyv8mmr43x455x6`) |
| School details page | Swakopmund Christian Academy profile |
| Signup forms (UI) | Student and School signup multi-step forms — **UI only, no submit action** |
| Auth guard component | Exists but **not applied** to any protected route in App.tsx |
| Backend auth routes | Register, login, logout, verify — wired to D1 |
| Backend messages routes | Send/receive/read messages — wired to D1 |
| Backend waitlist route | D1-backed waitlist entry creation |
| Backend resources CRUD | D1-backed |
| Backend users CRUD | D1-backed |
| D1 database schema | Fully defined: users, schools, students, educators, resources, ai_chat_history, messages, sessions, waitlist |
| AI debug panel | `/debug/ai` route — developer tool to test AI connectivity |

### Partially Implemented

| Feature | Status |
|---|---|
| Registration flow | Backend route exists; frontend signup forms do **not** call the API on submit |
| Password reset | `ForgotPasswordForm` and `ResetPasswordForm` components exist but use `supabase.auth` — which is not the primary auth system |
| Supabase integration | `src/lib/supabase.ts` and `src/contexts/AuthContext.tsx` are wired for Supabase auth, but the app's main flow uses the custom `src/components/auth/AuthContext.tsx` instead |
| Messaging backend | Backend `messages.ts` route is D1-backed, but the `MessagingPlatform` component uses only local state (no API calls) |
| `MessagingPage` route | `/messaging` exists in router but hardcodes `userType = 'student'` instead of reading from auth context |
| AuthGuard | Component exists but is **never used** in `App.tsx` — all routes are unprotected |
| Admin data | All stats/activity shown in `AdminOverview` are hardcoded mock data |
| Educator dashboard data | All courses, schedules, groups are static mock data |
| Student progress/courses | Static mock data; no connection to backend |

### Not Implemented (UI shell only)

| Feature | Notes |
|---|---|
| Payment / subscription processing | Pricing page is display-only; no Stripe or payment gateway |
| Real-time messaging | No WebSocket or Cloudflare Durable Objects; messages are local state only |
| File uploads / attachments | Messaging UI has attachment buttons; no upload logic |
| Parental controls | Listed as a feature; no implementation exists |
| Google account provisioning | Listed as a feature; no implementation exists |
| Certified Google Workspace integration | Described in marketing; no implementation |
| Course content management | Resources listed by type but no actual content delivery |
| LMS curriculum builder | Advertised but not built |
| Educator online classes | `OnlineClassesPage.tsx` exists as a stub |
| Notification system | No push/email notifications wired |

---

## 6. User Roles & Access

Four roles are defined: `student`, `educator`, `admin`, `school`.

### Demo Credentials (hardcoded in both `server.js` and `AuthContext.tsx`)

| Role | Email | Password |
|---|---|---|
| Student | `demo.student@tutokitulo.africa` | `student123` |
| Educator | `demo.educator@tutokitulo.africa` | `educator123` |
| Admin | `admin@tutokitulo.africa` | `admin123` |

> **Security note:** These credentials are committed to source code in plaintext in `AuthContext.tsx`. This is acceptable for demo mode but must be removed before any real user-facing launch.

---

## 7. Authentication System

There are **two competing auth systems** in the codebase:

### System A — Custom (Active, Primary)
- File: `src/components/auth/AuthContext.tsx`
- Uses custom API calls (`/api/auth/*`) backed by Cloudflare D1 + KV
- Falls back to hardcoded demo users if the API fails
- Token stored in `localStorage` as `authToken`
- Used by: `Login.tsx`, `DashboardLayout.tsx`, `AdminDashboard.tsx`, `LandingPage.tsx`

### System B — Supabase (Inactive / Legacy)
- File: `src/contexts/AuthContext.tsx`
- Uses `@supabase/supabase-js` auth
- Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars
- Used by: `AuthGuard.tsx`, `SignupForm.tsx`, `ForgotPasswordForm.tsx`, `ResetPasswordForm.tsx`
- **Problem:** These components are not rendered in any active route in `App.tsx`

### Password Hashing
The production auth uses `crypto.subtle.digest('SHA-256', ...)` — a plain SHA-256 hash with no salt. This is a security risk. Passwords should use bcrypt or Argon2 with salting before launch.

---

## 8. AI Integration

The AI system uses a **waterfall fallback chain** defined in `functions/routes/ai.ts`:

```
1. Google Gemma (via Google AI Studio REST API)
   -> env.GOOGLE_AI_API_KEY required
2. Cloudflare Workers AI REST API
   -> env.CLOUDFLARE_ACCOUNT_ID + env.CLOUDFLARE_AI_TOKEN required
3. Cloudflare Workers AI binding
   -> env.AI binding required (set in wrangler.toml)
4. OpenRouter API
   -> env.OPENROUTER_API_KEY required
5. Hardcoded static fallback response
```

The AI router in production intentionally allows **unauthenticated requests** by substituting a demo user if no valid token is present. This is documented in code as intentional for testing.

Three AI endpoints exist:
- `POST /api/ai/chat` — conversational chat with history
- `POST /api/ai/search` — educational search query
- `POST /api/ai/copilot` — role-aware assistant (student/educator/admin context)

**ElevenLabs Voice Widget** is embedded on the landing page as a fixed bottom-right widget. The agent ID is hardcoded (`agent_01jxqqea5wfqyv8mmr43x455x6`). No config or fallback exists if the agent is unavailable.

---

## 9. Database Schema

Defined in `schema.sql` (SQLite / Cloudflare D1):

| Table | Purpose |
|---|---|
| `users` | All user accounts (student, educator, admin, school) |
| `schools` | Registered school profiles |
| `students` | Extended student profiles, links to users + schools |
| `educators` | Extended educator profiles |
| `resources` | Learning resources (video, document, quiz, assignment, article) |
| `ai_chat_history` | AI conversation logs per user/session |
| `messages` | User-to-user direct messages |
| `sessions` | Auth session tokens (also mirrored to KV) |
| `waitlist` | Pre-launch email capture |

Migrations are also present under `supabase/migrations/` — these target the unused Supabase backend and may conflict or be out of sync with `schema.sql`.

---

## 10. API Routes Reference

All routes live under `functions/api/[[path]].ts` and are served at `/api/*`.

| Method | Path | Auth Required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account (D1) |
| POST | `/api/auth/login` | No | Login, returns token |
| POST | `/api/auth/logout` | Yes | Invalidate session |
| GET | `/api/auth/verify` | Yes | Verify current token |
| POST | `/api/ai/chat` | Optional* | AI chat with history |
| POST | `/api/ai/search` | Optional* | AI educational search |
| POST | `/api/ai/copilot` | Optional* | Role-aware AI assistant |
| GET | `/api/users` | Yes | List all users (admin) |
| GET | `/api/users/:id` | Yes | Get user by ID |
| PUT | `/api/users/:id` | Yes | Update user |
| DELETE | `/api/users/:id` | Yes | Delete user |
| GET | `/api/resources` | Yes | List resources (filterable) |
| GET | `/api/resources/:id` | Yes | Get resource |
| POST | `/api/resources` | Yes | Create resource |
| PUT | `/api/resources/:id` | Yes | Update resource |
| DELETE | `/api/resources/:id` | Yes | Delete resource |
| GET | `/api/messages` | Yes | Get inbox or sent |
| POST | `/api/messages` | Yes | Send message |
| PUT | `/api/messages/read` | Yes | Mark as read |
| POST | `/api/waitlist` | No | Join waitlist |
| GET | `/api/waitlist` | No | List waitlist entries |
| GET | `/api/diagnostic` | No | Health check / env check |

*AI routes degrade gracefully to demo mode if no token is provided.

---

## 11. Frontend Pages & Components

### Routes (defined in `App.tsx`)

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | View-switches internally (landing/login/dashboard/admin/waitlist/donation) |
| `/pricing` | `PricingPage` | Display only |
| `/resources` | `ResourcesPage` | Display only |
| `/international-curricula` | `InternationalCurriculumsPage` | Display only |
| `/security-details` | `SecurityDetailsPage` | Display only |
| `/school-details` | `SchoolDetailsPage` | Swakopmund school profile |
| `/partnership-details` | `PartnershipDetailsPage` | Partner info page |
| `/signup/student` | `StudentSignupForm` | Multi-step UI, no submit wired |
| `/signup/school` | `SchoolSignupForm` | Multi-step UI, no submit wired |
| `/messaging` | `MessagingPage` | Standalone messaging, hardcoded userType |
| `/dashboard` | `DashboardLayout` | Protected only by manual auth check, no AuthGuard |
| `/admin` | `AdminDashboard` | No route protection |
| `/debug/ai` | `AIDebugPanel` | Dev tool, should be removed/protected in production |

### Dashboard Sub-Views (student)

- `WelcomeWidget`, `AICoPilotWidget`, `MyCoursesWidget`, `ProgressWidget`, `AnnouncementsWidget`, `ELearningToolsWidget`
- `AISearchEngine` — full search + chat interface
- `MyCoursesPage`, `GoalsPage`, `ProgressPage`, `SchedulePage`, `FeedbackPage`

### Dashboard Sub-Views (educator)

- `EducatorDashboard`, `EducatorWelcomeWidget`, `AnnouncementsWidget`, `MyGroupsWidget`
- `EducatorGoalsPage`, `EducatorSchedulePage`, `OnlineClassesPage`

---

## 12. Deployment Architecture

### Primary Deployment
- **Frontend:** Netlify (serves `dist/` built by Vite)
- **API:** Cloudflare Pages Functions at `https://tulo-afrika.pages.dev`
- **Netlify proxies** all `/api/*` requests to Cloudflare via `netlify.toml`

### Secondary / Dev
- `npm run dev` starts Vite on port 5173 with proxy to localhost:3001
- `npm run dev:api` starts Express server on port 3001 (in-memory, demo mode)
- `npm run dev:all` runs both concurrently

### Cloudflare Resources
- **D1 Database:** `tulo-db` (ID: `78845220-9123-4a9d-a008-40ebfcd3d578`)
- **KV Namespace:** `SESSIONS` (ID: `1e8b079621b243de93dbf55f43481395`)
- **Workers AI binding:** `AI`

### Database Setup Commands
```bash
# Apply schema locally (for testing with wrangler)
npm run db:init

# Apply schema to production D1
npm run db:migrate
```

---

## 13. Environment Variables

### Frontend (`.env` / Vite)

| Variable | Required | Purpose |
|---|---|---|
| `VITE_API_URL` | Optional | Override API base URL |
| `VITE_SUPABASE_URL` | No (legacy) | Supabase URL — only needed if Supabase auth is used |
| `VITE_SUPABASE_ANON_KEY` | No (legacy) | Supabase anon key |

> **Warning:** `src/lib/supabase.ts` throws an error at import time if `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing. This file is not directly imported in the main app flow, but `SignupForm.tsx` and `AuthGuard.tsx` import from `../../contexts/AuthContext` which imports `supabase.ts`. If those components are ever rendered, the app will crash without these env vars.

### Backend (Cloudflare Dashboard secrets)

| Variable | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | Optional | AI via OpenRouter |
| `CLOUDFLARE_ACCOUNT_ID` | For AI | Cloudflare AI REST fallback |
| `CLOUDFLARE_AI_TOKEN` | For AI | Cloudflare AI REST fallback |
| `GOOGLE_AI_API_KEY` | For AI | Google Gemma (primary AI) |
| `GOOGLE_AI_MODEL` | Optional | Override default model |

---

## 14. Local Development Setup

```bash
# Install dependencies
npm install

# Start both Vite dev server + Express API
npm run dev:all

# OR separately:
npm run dev       # Vite on port 5173
npm run dev:api   # Express on port 3001
```

Demo login (works immediately, no DB required):
- Student: `demo.student@tutokitulo.africa` / `student123`
- Educator: `demo.educator@tutokitulo.africa` / `educator123`
- Admin: `admin@tutokitulo.africa` / `admin123`

To test with real Cloudflare D1 locally:
```bash
npx wrangler pages dev dist --port 3000
```

---

## 15. Known Bugs & Issues

### Critical

| # | Issue | Location | Impact |
|---|---|---|---|
| 1 | **No route protection** | `App.tsx` | `/admin` and `/dashboard` are fully public — anyone can access without logging in |
| 2 | **`AuthGuard` never used** | `src/components/auth/AuthGuard.tsx` | The component exists but is not applied to any route |
| 3 | **Unsalted SHA-256 password hashing** | `functions/utils/auth.ts` | Passwords are vulnerable to rainbow table attacks in production |
| 4 | **Plaintext demo passwords in source code** | `AuthContext.tsx`, `server.js` | Must be removed before public launch |
| 5 | **AI endpoint is auth-optional** | `functions/routes/ai.ts` | Any unauthenticated user can query the AI; unintended in production |

### High

| # | Issue | Location | Impact |
|---|---|---|---|
| 6 | **Duplicate AuthContext** | `src/contexts/` vs `src/components/auth/` | Two competing auth systems; Supabase one will crash if env vars missing |
| 7 | **Signup forms not wired to API** | `StudentSignupForm.tsx`, `SchoolSignupForm.tsx` | Users cannot actually register through the signup UI |
| 8 | **Messaging is UI-only** | `MessagingPlatform.tsx` | All message data is local state; nothing is persisted |
| 9 | **`/debug/ai` is publicly accessible** | `App.tsx` | Dev tool exposed in production build |
| 10 | **`MessagingPage` hardcodes `userType = 'student'`** | `MessagingPage.tsx` | Educators/admins navigating to `/messaging` get student view |

### Medium

| # | Issue | Location | Impact |
|---|---|---|---|
| 11 | **Admin dashboard uses mock data** | `AdminOverview.tsx` | Stats like "2,156 students" and "$45,230 revenue" are hardcoded |
| 12 | **`supabase.ts` throws on missing env vars** | `src/lib/supabase.ts` | Will break app if Supabase-using components are rendered without env vars |
| 13 | **`auth-fixed.ts` is a duplicate** | `functions/utils/auth-fixed.ts` | Exact copy of `auth.ts`; creates confusion about which is canonical |
| 14 | **WaitlistForm simulates submission** | `WaitlistForm.tsx` | Frontend form only runs `console.log` — does not call the backend `/api/waitlist` |
| 15 | **`schema.sql` and `schema-d1.sql` may diverge** | Root directory | Two schema files with no clear source-of-truth |
| 16 | **CORS wildcard `*`** | `netlify.toml`, `functions/utils/cors.ts` | Acceptable in development; should be locked to specific origins in production |

### Low

| # | Issue | Location | Impact |
|---|---|---|---|
| 17 | **ElevenLabs agent ID hardcoded** | `ElevenLabsWidget.tsx` | Cannot be configured without code change |
| 18 | **`LandingPage` manages view state internally** | `LandingPage.tsx` | Dashboard rendering happens inside LandingPage via `useState`; browser back button does not work correctly |
| 19 | **`useAuth` imported from two different paths** | Various components | Some import from `../../contexts/AuthContext`, others from `../auth/AuthContext` |
| 20 | **`server.js` placeholder API key** | `server.js` line 10 | `'YOUR_API_KEY_HERE'` is the default; will cause AI calls to fail in dev if env var not set |

---

## 16. What's Next / Not Yet Built

The following are explicitly described in the platform's marketing/feature sections but have no implementation:

- [ ] **Payment processing** — Stripe or similar integration for subscription tiers
- [ ] **Real-time messaging** — WebSocket layer (Cloudflare Durable Objects recommended)
- [ ] **File/media uploads** — Cloudflare R2 or similar object storage
- [ ] **Parental control panel** — Student monitoring, content filtering
- [ ] **Google Workspace provisioning** — Auto-create school Google accounts
- [ ] **Certification programs** — Issuance and tracking of course certificates
- [ ] **Tutor marketplace** — 1-on-1 session booking (mentioned in Tutor Plus tier)
- [ ] **Notification system** — Email/push for messages, announcements, grades
- [ ] **Multi-school onboarding** — Only one school (SCA) is registered; bulk onboarding flow needed
- [ ] **Resource content delivery** — Resources table exists in DB; actual content serving not implemented
- [ ] **Student progress tracking** — Progress widget shows mock data; no backend tracking logic
- [ ] **Wire signup forms to backend** — Both `StudentSignupForm` and `SchoolSignupForm` need submit handlers calling `/api/auth/register`
- [ ] **Apply `AuthGuard` to protected routes** — `/dashboard` and `/admin` must require auth
- [ ] **Supabase consolidation or removal** — Either fully migrate to Supabase or remove all Supabase code

---

*Last updated: April 2026. Generated from codebase analysis.*
