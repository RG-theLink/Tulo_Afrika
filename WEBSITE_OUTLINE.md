# Tulo Afrika Website Outline, Data Connections, and Feature Inventory

## 1. Platform Snapshot
- **Application type:** React 18 + TypeScript single-page application built with the Vite toolchain, styled via Tailwind CSS, and routed with React Router v6.
- **Hosting pattern:** Marketing SPA deployed to Netlify while server-side logic runs on Cloudflare Pages Functions; local development mirrors the API with an Express server (`server.js`).
- **State foundations:** Authentication context (`AuthContext.tsx`) exposes JWT-like session tokens stored in `localStorage`, with demo user fallbacks for offline exploration.
- **AI foundation:** Primary inference through Cloudflare Workers AI with OpenRouter as a backup provider.

## 2. Frontend Experience & Navigation
- **Root router (`src/App.tsx`):**
  - `/` → `LandingPage` (hero, feature highlights, CTA modals)
  - `/pricing`, `/resources`, `/international-curricula`, `/security-details`, `/school-details`, `/partnership-details`
  - `/signup/student`, `/signup/school` multi-step onboarding flows
  - `/messaging` → messaging workspace
  - `/dashboard` → authenticated dashboard layout with role-aware widgets
  - `/admin` → admin management console
  - `/debug/ai` → AI diagnostics & prompt testing
- **Landing sub-views:** `LandingPage` orchestrates modal-based flows for login, waitlist, dashboards, donations, and partnership inquiries.
- **Dashboard layout (`DashboardLayout`):** Switches between student- and educator-centric widgets; includes AI search widgets, progress trackers, and resource cards.
- **Admin suite (`AdminDashboard`):** Provides overview cards plus modules for user, school, resource, and messaging management.
- **Feature highlights (`components/Features.tsx`):** Grid of marketing cards summarizing AI tutor, curriculum alignment, analytics, messaging, and community tools.

## 3. Authentication & Session Flow
- **Context-driven auth:** `AuthContext` handles login, logout, token persistence, and graceful fallback to predefined demo users if API requests fail.
- **Token model:** Backend issues opaque session tokens (JWT-like strings) stored in both D1 and Cloudflare KV; client persists tokens in `localStorage`.
- **Verification:** `auth.verify()` endpoint refreshes session data; `auth.login`/`auth.logout` orchestrate credential validation and cleanup.
- **Role support:** Student, educator, admin, and school personas supported throughout UI components and database schema.

## 4. Backend & API Layers
### 4.1 Local Development (Express `server.js`)
- Provides mock endpoints for auth, AI chat/search/copilot, resources, messages, and waitlist entries using in-memory data stores.
- Handles OpenRouter AI fallback, session simulation, and demo messaging threads for rapid prototyping.

### 4.2 Production Stack (Cloudflare Pages Functions)
- **Router:** `functions/api/[[path]].ts` routes requests to modular handlers under `functions/routes/`.
- **Modules:**
  - `ai.ts` – chat, search, and co-pilot endpoints with dual-provider orchestration (Cloudflare Workers AI primary, OpenRouter fallback).
  - `auth.ts` – signup, login, logout, profile fetch, session validation.
  - `users.ts`, `resources.ts`, `messages.ts`, `waitlist.ts` – CRUD and workflow operations.
  - `diagnostic.ts` – health checks, provider reachability tests.
- **Utilities:** Shared helpers for session validation, error handling, CORS, and response formatting reside under `functions/utils/` and `functions/types.ts`.

### 4.3 API Consumption (`src/lib/api.ts`)
- Centralized fetch wrapper applying auth headers, error handling, and JSON parsing.
- Segment-specific clients: `auth`, `ai`, `users`, `resources`, `messages`, `waitlist`, plus Supabase utilities for richer analytics.

## 5. Database Connections & Schemas
### 5.1 Cloudflare D1 (Primary Production Database)
- Schema defined in `schema.sql` / `schema-d1.sql`; key tables include:
  - `users`, `schools`, `students`, `educators` with relational links.
  - `resources`, `resource_tags`, `resource_access_logs` for content management.
  - `ai_chat_history`, `ai_search_history`, `ai_sessions` capturing AI interactions.
  - `messages`, `message_threads`, `notifications` enabling communication features.
  - `waitlist_entries`, `form_submissions`, `session_tokens` for onboarding and auth.
- Sessions stored in both D1 (`sessions` table) and Cloudflare KV (bound as `SESSIONS`) for fast token lookups.

### 5.2 Supabase Integration (`src/lib/supabase.ts`)
- Initialized via `@supabase/supabase-js` for extended analytics, messaging, and profile data.
- Migrations under `supabase/migrations/` cover:
  - Profile enrichment (`profiles`, `student_profiles`, `educator_profiles`).
  - Learning analytics (`learning_progress`, `assessment_results`, `study_sessions`).
  - Community & messaging (`conversation_members`, `messages`, `announcements`).
  - Feedback loops (`feedback_entries`, `survey_responses`).
  - Operational data (support tickets, waitlist analytics, school partnerships).

### 5.3 Development Mode Data
- Express server uses in-memory stores and JSON mocks, simulating the API without requiring D1 or Supabase during local prototyping.

## 6. AI & Data Intelligence Stack
- **Primary provider:** Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct`) invoked through REST requests with Account ID + token.
- **Fallback provider:** OpenRouter (e.g., `openai/gpt-3.5-turbo`) engaged when Workers AI is unavailable or rate limited.
- **Endpoints:** `/api/ai/chat`, `/api/ai/search`, `/api/ai/copilot` route through `ai.ts`, caching results and storing transcripts/history in D1.
- **Developer tooling:** `/debug/ai` page surfaces prompt testing, response logs, and provider diagnostics for rapid iteration.

## 7. Feature Inventory
### 7.1 Marketing & Acquisition
- Landing hero with modular CTAs, feature carousel, testimonials, and partner outreach forms.
- Pricing, curriculum, security, school, and partnership detail pages for stakeholders.
- Waitlist form (`components/WaitlistForm.tsx`) capturing interest and desired features.

### 7.2 Onboarding & Forms
- Student signup wizard (`StudentSignupForm.tsx`) with multi-step academic background capture, guardian info, objectives, and AI tutor preferences.
- School signup (`SchoolSignupForm.tsx`) gathering institution details, enrollment stats, curriculum alignment, and partnership data.
- Donation and support modals accessible from landing workflow.

### 7.3 Student Experience
- Personalized dashboard widgets: AI search engine (`dashboard/student/AISearchEngine.tsx`), study trackers, recommended resources, calendar snippets, badges.
- AI co-pilot chat panels for tutoring and Q&A, tied into D1 history for continuity.
- Resource library browsing with filters for subject, grade, and format.

### 7.4 Educator Experience
- Educator dashboard layout offering class overviews, assignment planning, shared resource management, and analytics previews.
- Messaging center for student/guardian communication and announcements.
- Curriculum alignment tools and AI-supported lesson planning prototypes.

### 7.5 Admin & Operations
- Admin dashboard modules for user management, school partnerships, resource moderation, AI usage diagnostics, and incident logs.
- Diagnostic tools to monitor API health, AI provider status, and database connectivity.

### 7.6 Shared & Cross-Cutting Features
- Global messaging workspace (`MessagingPage`) with threaded conversations and notifications.
- Feature cards highlighting AI tutor, analytics, resource marketplace, and collaboration tools.
- Theme-consistent Tailwind UI components, including responsive navigation, cards, tabs, accordions, and modal frameworks.

## 8. Data Capture & Analytics
- Form submissions persisted to D1/Supabase for conversion tracking and onboarding triage.
- AI interaction logs enable analytics dashboards planned in Supabase migrations.
- Resource access logs and waitlist analytics feed future growth experiments.

## 9. Key Supporting Assets
- **Configuration:** `vite.config.ts`, `tailwind.config.js`, `wrangler.toml`, `netlify.toml` tune build, styling, and deployment.
- **Environment templates:** `.env.example`, `.env.production` delineate Netlify and Cloudflare credentials (API URLs, AI tokens, database bindings).
- **Automation scripts:** `deploy-to-cloudflare.sh`, `quick-deploy.sh`, and `ecosystem.config.*` for PM2-managed services in development.

---
**Reference:** This document summarizes the current implementation captured across `/src`, `/functions`, `schema.sql`, and `supabase/migrations/`, fulfilling the request for an up-to-date website outline, database connections overview, and feature catalog.