# 🎯 PrepWise AI

[![Live Demo](https://img.shields.io/badge/Live%20Demo-preppwisee.vercel.app-gold?style=for-the-badge&logo=vercel&logoColor=black&labelColor=white)](https://preppwisee.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6c47ff?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.dev)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

**PrepWise AI** is a premium, AI-driven mock interview and preparation platform designed to elevate the engineering interview experience. Featuring a highly responsive dashboard, tailored roles for both candidates (interviewees) and engineering leads (interviewers), and automated performance metrics.

Experience the live application here: **[https://preppwisee.vercel.app](https://preppwisee.vercel.app)**

---

## ✨ Features

- 👤 **Role-Based Experience**: Automatically adapts depending on whether you are a **Candidate (Interviewee)** or an **Interviewer**.
- 🔒 **Role Guarded Routes**: Secure access management. Interviewers are automatically redirected away from student-facing routes (like `/explore`) directly to their portal.
- 📅 **Interactive Timeline**: Clean chronological tracking of upcoming, active, and past preparation sessions complete with countdown timers.
- 📊 **Dynamic Statistics & Analytics**: Live insights calculating total completed hours, upcoming sessions, and aggregated performance rating labels.
- 🧠 **AI & Expert Review Themes**: Dynamic feedback panels highlighting top strengths and core growth focus areas compiled directly from session records.
- 💅 **Ultra-Premium Dark Aesthetic**: Crafted with rich dark tones, soft glassmorphic borders, custom typography pairing (`Instrument Serif` & `Plus Jakarta Sans`), and subtle gold accents (`#f8b81f`).

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Database & ORM:** [Supabase](https://supabase.com/) (PostgreSQL) with [Prisma](https://www.prisma.io/)
*   **Authentication:** [Clerk](https://clerk.com/) (with custom synchronization wrappers)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js (v20+)](https://nodejs.org/) and `npm` installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MayankJoshi540/PrepWise-AI.git
    cd PrepWise-AI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:
    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Database
    DATABASE_URL="postgresql://postgres:your_password@db.your_supabase_project.supabase.co:5432/postgres?pgbouncer=true"
    DIRECT_URL="postgresql://postgres:your_password@db.your_supabase_project.supabase.co:5432/postgres"
    ```

4.  **Database Migration:**
    Initialize your database schema:
    ```bash
    npx prisma db push
    ```

5.  **Run locally:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Authentication Guidelines

To keep auth components unified, the project utilizes a custom `<Show>` wrapper.

*   **Avoid** importing `SignedIn` or `SignedOut` directly from `@clerk/nextjs`.
*   **Instead**, import the custom helper component:
    ```javascript
    import { Show } from '@/components/auth';
    
    // Usage:
    <Show when="signed-in">
      <p>Welcome back!</p>
    </Show>
    <Show when="signed-out">
      <button>Log In</button>
    </Show>
    ```

---

## 📂 Key Directory Tour

```
├── actions/             # Database interaction layers (e.g. appointments.js)
├── app/                 # Next.js pages & routing context
│   ├── appointments/    # Interview Portal and Dashboard Views
│   ├── dashboard/       # Entry route redirect handlers
│   └── explore/         # Candidate browsing directory (guarded)
├── components/          # Reusable UI components
│   ├── auth/            # Auth wrapper components (Show.jsx)
│   └── layout/          # Page layout elements (Header/Footer)
├── lib/                 # Utility libraries, client configurations & sync hooks
└── prisma/              # Prisma schema & migration state
```

---

## 📄 License

This project is licensed under the MIT License.
