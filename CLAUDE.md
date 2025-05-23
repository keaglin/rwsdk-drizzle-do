# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a RedwoodSDK application built on Cloudflare Workers with:

- **Framework**: RedwoodSDK with Vite for building and development
- **Database**: D1 (SQLite) with Drizzle ORM for database operations
- **Session Management**: Durable Objects for persistent session storage
- **Authentication**: Better Auth with WebAuthn/Passkey support
- **Frontend**: React with Server Components (RSC) and Client Components
- **Styling**: shadcn with Tailwind v4 

### Key Files Structure

- `src/worker.tsx` - Main application entry point, defines routes and middleware
- `src/client.tsx` - Client-side initialization
- `src/app/` - React components and pages
  - `Document.tsx` - Root document component
  - `pages/` - Page components (Home, user auth pages)
  - `components/ui/` - Reusable UI components
  - `lib/` - Authentication and utility functions
- `src/db/` - Database schema and types
- `src/session/` - Session management with Durable Objects
- `drizzle-dev.config.ts` & `drizzle-prod.config.ts` - Database configurations for different environments

### Database Management

The project uses separate configurations for development and production:
- Development uses local SQLite file via `.wrangler/state/`
- Production uses Cloudflare D1 with HTTP driver
- Schema files: `src/db/schema.ts` and `src/db/auth-schema.ts`

## Common Development Commands

### Development
```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm types            # Type check the project
pnpm check            # Generate types and run type checking
```

### Database Operations

**Local Development:**
```bash
npm run local:db:generate    # Generate migrations for local dev
npm run local:db:migrate     # Apply migrations to local dev DB
npm run local:db:push        # Push schema changes to local dev DB
npm run local:db:studio      # Open Drizzle Studio for local dev DB
```

**Production:**
```bash
npm run db:generate     # Generate migrations for production
npm run db:migrate      # Apply migrations to production DB
npm run db:push         # Push schema changes to production DB
npm run db:studio       # Open Drizzle Studio for production DB
```

**Combined Operations:**
```bash
npm run migrate:dev     # Generate and migrate for development
npm run migrate:new     # Generate, migrate, and seed database
npm run seed            # Run seed script
```

### Authentication
```bash
npm run auth:db:migrate    # Generate auth schema and migrate database
```

### Deployment
```bash
npm run release         # Full deployment: clean, generate, build, and deploy to Cloudflare
```

## React Component Guidelines

### Server Components (Default)
- All components are server components by default
- Can directly fetch data and include async operations
- Cannot use client-side interactivity (state, effects, event handlers)
- Rendered on server and streamed as HTML

### Client Components
- Must include `"use client";` directive at top of file
- Required for interactivity, browser APIs, event handlers, client-side state
- Will be hydrated in the browser

### Data Fetching
- Server components can directly fetch data without useEffect
- Use Suspense boundaries for loading states with async server components
- Pass context (ctx) through props to child components

## Configuration Notes

- The project uses `wrangler.jsonc` for Cloudflare Worker configuration
- Durable Objects are configured for session management (`SessionDurableObject`)
- D1 database binding is set up as `DB`
- Environment variables are managed through Cloudflare Workers secrets