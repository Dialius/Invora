# Design Document: Invora Monorepo Documentation and Licensing
**Date:** 2026-06-14
**Status:** Approved

---

## 1. Objective
Add comprehensive documentation and proper commercial licensing to the Invora invoicing system repository. Ensure that developers or users can easily set up and run the monorepo locally, and publish the repository to GitHub.

---

## 2. Document Specifications

### 2.1 Root LICENSE
- **Path**: `LICENSE` (at repository root)
- **License Type**: Proprietary / All Rights Reserved
- **Content**: Expressly prohibits copying, reproduction, distribution, modification, or transmission of the software without permission from the copyright owner (Dialius / Invora).

### 2.2 Root README.md
- **Path**: `README.md` (at repository root)
- **Sections**:
  - Project title and professional description.
  - Core features overview (billing models, calculation engine, A4 print layout, dashboard, auth).
  - Directory structure layout (showing root, frontend, backend, and docs).
  - Quickstart guide (installing dependencies, database setup, environment variable configuration).
  - Complete list of scripts available at root `package.json`.

### 2.3 Frontend README.md
- **Path**: `frontend/README.md`
- **Sections**:
  - Description of the frontend stack (React 18, TypeScript, Vite, Tailwind CSS 3.4.1).
  - Command reference for package-specific development, building, and previewing.

### 2.4 Backend README.md
- **Path**: `backend/README.md`
- **Sections**:
  - Description of the backend stack (Node.js, Express.js, Prisma ORM, Puppeteer, PostgreSQL).
  - Contextual explanation of required environment variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`, etc.).
  - Command reference for backend execution and database migrations.

---

## 3. Git & GitHub Integration Plan
- Verify git status.
- Commit the newly created design document and implementation files.
- Push the changes to the remote origin (`https://github.com/Dialius/Invora.git`) on the current branch or target branch.
