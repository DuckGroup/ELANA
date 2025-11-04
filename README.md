# Project Name
> A modern full-stack application built with **Turborepo** monorepo architecture

## 📋 Table of Contents
- [Overview](#overview)
- [Apps and Packages](#apps-and-packages)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Turborepo Features](#turborepo-features)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Useful Links](#useful-links)

---

## Apps and Packages
- `docs`: a [Next.js](https://nextjs.org/) app for documentation
- `web`: the main [Next.js](https://nextjs.org/) frontend application
- `apps/frontend`: frontend app (Vite + React or Next.js)
- `apps/backend`: backend API (Node.js with Express or similar)
- `@repo/ui`: shared React component library used by `web` and `docs`
- `@repo/eslint-config`: shared ESLint config (includes `eslint-config-next`, `prettier`)
- `@repo/typescript-config`: shared `tsconfig.json` files across the monorepo

> **All packages and apps are 100% [TypeScript](https://www.typescriptlang.org/)**.

### Built-in Tools
- [TypeScript](https://www.typescriptlang.org/) – static type checking
- [ESLint](https://eslint.org/) – code linting
- [Prettier](https://prettier.io) – code formatting

---

## Prerequisites
Before starting, ensure you have:

- **Bun** >= 1.0.0 → [Install Bun](https://bun.sh)
- **Node.js** >= 18.0.0 (optional, for certain tools)
- **Git**

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   ```
2. **install dependencies**
     ```bun install```
3. Set up environment variables
# Frontend
cp apps/frontend/.env.example apps/frontend/.env

# Backend
cp apps/backend/.env.example apps/backend/.env

4. Start development servers ```bun run dev```

# Tech Stack

* Monorepo: Turborepo
* Runtime: Bun
* Frontend: Next.js / Vite + React
* Backend: Node.js (Express or Fastify)
* Language: TypeScript
* Styling: Tailwind CSS (or CSS Modules)
* Database: PostgreSQL / MongoDB (via DATABASE_URL)
* Auth: JWT


## Turborepo Features

* Task Pipelines – parallel & cached builds
* Remote Caching – share cache across CI/CD
* Filtering – run commands on specific packages
* Zero-config – works out of the box with Bun

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


# API Endpoints
**Authentication**

* Method Endpoint,Description
* POST/auth/register,Register a new user
* POST/auth/login,Login user
* POST/auth/logout,Logout user

**Example: POST /auth/register**

Request:

{
  "email": "user@example.com",
  "password": "securepassword"
} 

Response: 

{
  "success": true,
  
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  
  "user": {
    
    "id": "123e4567-e89b-12d3-a456-426614174000",
    
    "email": "user@example.com"
  }
}


### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

