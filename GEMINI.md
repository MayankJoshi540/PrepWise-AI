# PrepWise AI - Project Instructions

## Authentication UI Rules (STRICT)
These rules are foundational mandates for all development and AI-assisted tasks in this repository.

- **Component Usage:** NEVER import `SignedIn` or `SignedOut` from `@clerk/nextjs`. Use the project's custom `Show` component instead.
- **Generation Rule:** NEVER generate code or refactorings that use `SignedIn` or `SignedOut` directly.
- **Allowed Imports:** From `@clerk/nextjs`, only import UI triggers and state hooks:
  - `import { SignInButton, SignUpButton, UserButton, useAuth, useUser } from '@clerk/nextjs'`
- **Wrapper Syntax:**
  - Authenticated content: `<Show when="signed-in">...</Show>`
  - Guest/Public content: `<Show when="signed-out">...</Show>`
  - Loading/Skeleton states: `<Show when="loading">...</Show>`
- **Source:** Always import `Show` from `@/components/auth`.

## Tech Stack & Conventions
- **Next.js:** 15+ (App Router).
- **Styling:** Tailwind CSS 4, Framer Motion.
- **Design:** Strict Dark Mode with Gold/Amber accents (`#f8b81f`).
- **Typography:** Instrument Serif (Headers), Plus Jakarta Sans (Body).
