# AI Trip Planner

A conversational AI travel-planning app. Users chat with an assistant that asks one question at a time — origin, destination, group size, budget, duration — then generates a complete trip: hotel options and a day-by-day itinerary with geo-coordinates, pricing, and photos, rendered on an interactive map.

## Features

- **Conversational planner** — an LLM guides the user through a fixed question flow and returns structured JSON (`{ resp, ui }`) that drives inline UI components (group size, budget, trip duration).
- **AI-generated itineraries** — hotels and a per-day activity plan with addresses, ratings, ticket pricing, and geo-coordinates, returned against a strict output schema.
- **Interactive maps** — trip locations plotted with Mapbox GL.
- **Place photos** — hotel/place images resolved via the Google Places API.
- **Auth & user accounts** — sign-in / sign-up handled by Clerk; users and their trips persisted in Convex.
- **Saved trips** — browse previously generated trips under _My Trips_ and reopen a full plan by ID.
- **Rate limiting & plans** — Arcjet token-bucket limits free usage; premium plans lift the cap.

## Tech stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 15 (App Router), React 19, TypeScript |
| Styling       | Tailwind CSS v4, shadcn/ui, Radix UI, Motion  |
| Auth          | Clerk                                         |
| Database      | Convex                                        |
| AI            | OpenAI SDK via OpenRouter (`gpt-4.1-mini`)    |
| Maps & Places | Mapbox GL, Google Places API                  |
| Rate limiting | Arcjet                                        |

## Project structure

```
app/
  (auth)/                 # Clerk sign-in / sign-up routes
  api/
    aimodel/              # Chat + final trip-plan generation (OpenRouter)
    google-place-detail/  # Resolves place photo URLs (Google Places)
    arcjet/               # Shared Arcjet rate-limit config
  create-new-trip/        # Chat UI + inline question components, map, cards
  my-trips/               # List of a user's saved trips
  view-trip/[tripId]/     # Full itinerary view for a saved trip
  pricing/                # Plan / upgrade page
convex/
  schema.ts               # UserTable, TripDetailTable
  user.ts                 # CreateNewUser
  tripDetail.ts           # CreateTripDetail, GetUserTrips, GetTripById
context/                  # User & trip React contexts
components/ui/            # shadcn/ui primitives
middleware.ts             # Clerk route protection
```

## How it works

1. The user chats in **Create New Trip**. Each message hits `POST /api/aimodel`, which sends the system `PROMPT` plus history to the LLM and returns `{ resp, ui }`. The `ui` key (`groupSize` | `budget` | `TripDuration`) swaps in a dedicated input component.
2. Once all details are collected, a final request uses `FINAL_PROMPT` to generate the full plan against a fixed JSON schema (hotels + day-by-day itinerary).
3. `POST /api/google-place-detail` resolves photo URLs for places and hotels.
4. The plan is saved to Convex (`CreateTripDetail`) and can be reopened from **My Trips** via `GetTripById`.
5. **Arcjet** enforces a per-user token bucket; when free credits run out, non-premium users are prompted to upgrade.

## External services

This app is a Next.js frontend wired to several managed services. You need a (free-tier) account and key for each:

| Service       | Used for                    | Get the key from                  |
| ------------- | --------------------------- | --------------------------------- |
| Clerk         | Authentication              | clerk.com → API keys              |
| Convex        | Database & server functions | convex.dev → project              |
| OpenRouter    | LLM (chat + itinerary)      | openrouter.ai → keys              |
| Google Places | Place / hotel photos        | Google Cloud Console → Places API |
| Mapbox        | Interactive map             | mapbox.com → access token         |
| Arcjet        | Rate limiting               | arcjet.com → key                  |

## Run it locally

### Prerequisites

- Node.js 18+
- Accounts/keys for the six services above

### 1. Install

```bash
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Convex (set automatically by `npx convex dev` the first time)
NEXT_PUBLIC_CONVEX_URL=

# AI (OpenRouter)
OPENROUTER_API_KEY=

# Google Places
GOOGLE_PLACE_API_KEY=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# Arcjet
ARCJET_KEY=
```

### 3. Start Convex (terminal 1)

```bash
npx convex dev
```

The first run prompts you to log in and create/link a Convex project, then writes `NEXT_PUBLIC_CONVEX_URL` into `.env.local` for you. Leave this running — it syncs your schema and functions.

### 4. Start Next.js (terminal 2)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # run production build
npm run lint    # lint
```

## Deploy to Vercel

Vercel is the recommended host for this app (zero-config Next.js, free Hobby tier). The one wrinkle is Convex: it runs on Convex's own cloud, so the Vercel build must deploy your Convex functions **and** hand the production Convex URL to the Next.js build. The steps below do exactly that.

### 1. Push to GitHub

Make sure the project is a GitHub repo and `.env.local` is git-ignored (it is by default — never commit real keys).

### 2. Create a Convex production deploy key

In the [Convex dashboard](https://dashboard.convex.dev): select your project → **Settings → Deploy Keys → Generate Production Deploy Key**. Copy it.

### 3. Import the repo into Vercel

At [vercel.com/new](https://vercel.com/new), import your GitHub repo. Vercel auto-detects Next.js — leave the framework preset as **Next.js**.

### 4. Override the Build Command

In the Vercel project's **Settings → Build & Development Settings**, set the **Build Command** to:

```bash
npx convex deploy --cmd 'npm run build'
```

This deploys your Convex functions to production, then runs the Next.js build with `NEXT_PUBLIC_CONVEX_URL` injected automatically — so you do **not** set that variable by hand on Vercel.

### 5. Add environment variables

In **Settings → Environment Variables**, add these for the Production environment:

```bash
CONVEX_DEPLOY_KEY=              # the production deploy key from step 2
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
OPENROUTER_API_KEY=
GOOGLE_PLACE_API_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
ARCJET_KEY=
```

Notes:

- `CONVEX_DEPLOY_KEY` is what the build command reads to publish Convex and resolve `NEXT_PUBLIC_CONVEX_URL`. Don't add `NEXT_PUBLIC_CONVEX_URL` manually.
- Use your **production** keys, not test keys — especially for Clerk (create a production instance in Clerk and point it at your Vercel domain).

### 6. Deploy

Click **Deploy**. Every push to your main branch redeploys, and Convex is republished as part of the build.

### 7. Post-deploy checklist

- In **Clerk**, add your Vercel domain (`your-app.vercel.app`) to the allowed origins / production instance.
- In **Google Cloud**, restrict the Places API key to your domain.
- Confirm **Mapbox** token URL restrictions include your domain.
- Generate one trip end-to-end to confirm the LLM, map, and Convex writes all work in production.

### Cost & abuse note

Every trip generation calls the LLM, which costs money per request on OpenRouter. On a public URL, keep **Arcjet** rate limiting enabled to cap free usage, and consider setting a spending limit on your OpenRouter account.
