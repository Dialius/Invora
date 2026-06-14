# Documentation & Licensing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a root LICENSE, root README.md, sub-directory READMEs for frontend and backend, and push the changes to GitHub.

**Architecture:** Standard monorepo documentation structure with a proprietary license, a comprehensive root guide, and contextual local guides.

**Tech Stack:** Markdown, Git, GitHub

---

### Task 1: Create Root LICENSE

**Files:**
- Create: `LICENSE`

**Step 1: Write License content**
Write the following content to `LICENSE`:
```text
Copyright (c) 2026 Dialius / Invora. All rights reserved.

CONFIDENTIAL AND PROPRIETARY.
This software and its documentation are the confidential and proprietary information of Dialius / Invora.
No part of this software may be copied, reproduced, distributed, modified, or transmitted in any form 
or by any means without the prior written consent of the copyright owner.
```

**Step 2: Run verification**
Verify that the file exists and is populated correctly.
Run: `Get-Content LICENSE` (PowerShell)

**Step 3: Commit**
```bash
git add LICENSE
git commit -m "docs: add proprietary license"
```

---

### Task 2: Create frontend/README.md

**Files:**
- Create: `frontend/README.md`

**Step 1: Write Frontend README content**
Write the following content:
```markdown
# Invora Frontend

The client-side Single Page Application (SPA) for Invora, built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Fully responsive invoicing customizer with real-time preview (Regular, Proforma, DP, and Pelunasan).
- Interactive dashboard for revenue tracking and invoice list management.
- Multi-currency support and locale-aware formatting.
- Secure session handling integrating JWT cookies.

## Development Setup

First, ensure root dependencies are installed. From this directory, you can run:

```bash
# Run local dev server (default port 5173)
npm run dev

# Compile TypeScript and build for production
npm run build

# Preview production build locally
npm run preview
```
```

**Step 2: Run verification**
Verify the file content.
Run: `Get-Content frontend/README.md`

**Step 3: Commit**
```bash
git add frontend/README.md
git commit -m "docs: add frontend readme"
```

---

### Task 3: Create backend/README.md

**Files:**
- Create: `backend/README.md`

**Step 1: Write Backend README content**
Write the following content:
```markdown
# Invora Backend

The server-side REST API for Invora, built with Node.js, Express, Prisma ORM, PostgreSQL, and Puppeteer.

## Features
- Secure JWT-based authentication via `httpOnly` cookies.
- Robust data validation schemas utilizing Zod.
- PDF generation engine rendering A4 templates via Puppeteer.
- Relational database schema migrations using Prisma.

## Configuration

Create a `.env` file in this directory based on the project requirements:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/invora"
JWT_SECRET="your-jwt-secret"
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

## Development Setup

First, ensure root dependencies are installed. From this directory, you can run:

```bash
# Run backend dev server with nodemon reload
npm run dev

# Build the TypeScript project
npm run build

# Start the compiled production server
npm run start

# Generate Prisma Client
npm run prisma:generate

# Run Prisma migrations
npm run prisma:migrate
```
```

**Step 2: Run verification**
Verify the file content.
Run: `Get-Content backend/README.md`

**Step 3: Commit**
```bash
git add backend/README.md
git commit -m "docs: add backend readme"
```

---

### Task 4: Create Root README.md

**Files:**
- Create: `README.md`

**Step 1: Write Root README content**
Write the following content:
```markdown
# Invora - Professional Invoicing System

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

Invora is a premium client-server invoicing platform designed to simplify professional billing, down payment management, and statement generation. It features a custom branding suite, a real-time invoice customizer, automated PDF generation, and dashboard telemetry.

## Features

- **Dynamic Invoice Architect**: Draft regular, proforma, Down Payment (DP), and Pelunasan (settlement) invoices.
- **Auto-Calculations Engine**: Computes subtotal, tax, discounts, custom shipping fees, and deposits in real-time.
- **Backend PDF Renderer**: Converts client invoice drafts into high-quality, print-ready A4 PDFs using Puppeteer.
- **Soft Editorial & Clean Theme**: A beautiful, premium visual design optimized for readability and responsive across all screens.
- **Secure Authentication**: JWT-based session management stored in secure, `httpOnly` cookies.

## Monorepo Directory Structure

```text
invora/
├── backend/          # Node.js + Express + Prisma + Puppeteer server
├── frontend/         # React 18 + TypeScript + Vite + Tailwind client
├── docs/             # Documentation and design/implementation plans
├── package.json      # Monorepo workspace configuration
└── LICENSE           # Proprietary license agreement
```

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** database

## Getting Started

Follow these steps to run Invora locally:

### 1. Install Dependencies
At the root directory, install the monorepo dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```bash
cp backend/.env.example backend/.env
```
Update the values in `backend/.env` with your PostgreSQL database URL and JWT secret keys.

### 3. Database Migration
Run the Prisma migrations to set up your database schema:
```bash
npm run prisma:migrate --workspace=backend
```

### 4. Run the Application
Start both the frontend and backend servers concurrently:
```bash
npm run dev
```
The application will launch:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## License

Invora is a proprietary application. All rights reserved. See the [`LICENSE`](LICENSE) file for the legal agreement.
```

**Step 2: Run verification**
Verify the file content.
Run: `Get-Content README.md`

**Step 3: Commit**
```bash
git add README.md
git commit -m "docs: add root readme"
```

---

### Task 5: Commit and Push to GitHub

**Files:**
- Modify: Git repository state

**Step 1: Commit design docs and implementation plan**
Add the design document and implementation plan:
```bash
git add docs/plans/2026-06-14-readme-license-design.md docs/plans/2026-06-14-readme-license-implementation.md
git commit -m "docs: add design document and implementation plan for readmes and license"
```

**Step 2: Push changes to remote origin**
Push the branch to the repository:
```bash
git push origin feature/invoice-app
```

**Step 3: Verify push**
Verify that the output indicates a successful push to the GitHub repository.
