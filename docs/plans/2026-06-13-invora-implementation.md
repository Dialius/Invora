# Invora Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Invora premium professional invoicing web application enabling dynamic generation of DP, Pelunasan, Proforma, and Reguler invoices.

**Architecture:** Client-server architecture with a React single-page frontend application, a Node.js + Express.js backend REST API, and a PostgreSQL database managed via Prisma ORM.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v3, React Router v6, Zustand, Axios, Node.js, Express.js, JWT, Prisma ORM, PostgreSQL.

---

## Phase 1: Database & Workspace Setup

### Task 1: Initialize Workspace Directory Structure
**Files:**
- Create: `package.json` (root)
- Create: `backend/package.json`
- Create: `frontend/package.json`

**Step 1: Write root package.json file**
```json
{
  "name": "invora-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev:backend": "npm run dev --workspace=backend",
    "dev:frontend": "npm run dev --workspace=frontend",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

**Step 2: Commit**
```bash
git add package.json
git commit -m "chore: initialize root package.json for workspaces"
```

---

### Task 2: Configure Database Schema and Migrations
**Files:**
- Create: `backend/prisma/schema.prisma`
- Create: `backend/.env`

**Step 1: Write schema.prisma**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id          String    @id @default(cuid())
  email       String    @unique
  password    String
  name        String
  createdAt   DateTime  @default(now())
  companies   Company[]
  invoices    Invoice[]
}

model Company {
  id          String    @id @default(cuid())
  userId      String
  name        String
  logo        String?
  address     String?
  phone       String?
  email       String?
  website     String?
  npwp        String?
  bankAccounts BankAccount[]
  user        User      @relation(fields: [userId], references: [id])
  invoices    Invoice[]
}

model BankAccount {
  id          String    @id @default(cuid())
  companyId   String
  bankName    String
  accountName String
  accountNo   String
  company     Company   @relation(fields: [companyId], references: [id])
}

model Client {
  id          String    @id @default(cuid())
  userId      String
  name        String
  pic         String?
  address     String?
  phone       String?
  email       String?
  invoices    Invoice[]
}

model Invoice {
  id              String        @id @default(cuid())
  userId          String
  companyId       String
  clientId        String
  invoiceNumber   String        @unique
  type            InvoiceType
  status          InvoiceStatus @default(DRAFT)
  title           String?
  projectRef      String?
  currency        String        @default("IDR")
  invoiceDate     DateTime
  dueDate         DateTime
  subtotal        Decimal
  discountType    String?       // 'percent' or 'nominal'
  discountValue   Decimal?
  taxPercent      Decimal       @default(11)
  taxAmount       Decimal
  extraFee        Decimal?
  total           Decimal
  dpPercent       Decimal?
  dpAmount        Decimal?
  paidAmount      Decimal?
  remainingAmount Decimal?
  notes           String?
  terms           String?
  signature       String?
  items           InvoiceItem[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model InvoiceItem {
  id          String    @id @default(cuid())
  invoiceId   String
  category    String    // 'jasa' or 'produk'
  description String
  qty         Decimal
  unit        String
  unitPrice   Decimal
  discountPct Decimal?
  subtotal    Decimal
  invoice     Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
}

enum InvoiceType {
  DOWN_PAYMENT
  PELUNASAN
  PROFORMA
  REGULER
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}
```

**Step 2: Commit**
```bash
git add backend/prisma/schema.prisma
git commit -m "feat: define database schemas using prisma"
```

---

## Phase 2: Backend Development

### Task 3: Setup Express Server with Authentication
**Files:**
- Create: `backend/src/server.ts`
- Create: `backend/src/middleware/auth.ts`
- Create: `backend/src/routes/auth.ts`

**Step 1: Write auth middleware**
Verify JWT token from secure httpOnly cookies.

**Step 2: Write login, register, and /me endpoints**
Generate and return cookie JWT tokens.

**Step 3: Commit**
```bash
git add backend/src/server.ts backend/src/middleware/auth.ts backend/src/routes/auth.ts
git commit -m "feat: implement JWT auth endpoints and auth check middleware"
```

---

### Task 4: Setup Invoice CRUD API
**Files:**
- Create: `backend/src/routes/invoices.ts`
- Create: `backend/src/controllers/invoices.ts`

**Step 1: Write invoice routes**
`GET /api/invoices`, `GET /api/invoices/:id`, `POST /api/invoices`, `PUT /api/invoices/:id`, `DELETE /api/invoices/:id`

**Step 2: Implement line calculations & auto-numbering**
Generate auto-invoice number with formula `INV/YYYY/MM/XXXX`.

**Step 3: Commit**
```bash
git add backend/src/routes/invoices.ts backend/src/controllers/invoices.ts
git commit -m "feat: implement complete CRUD routes for invoices"
```

---

### Task 5: Implement PDF Generation Service
**Files:**
- Create: `backend/src/services/pdfService.ts`
- Create: `backend/src/routes/pdf.ts`

**Step 1: Write PDF generation service**
Use Puppeteer to convert HTML invoice design into a clean A4 PDF file.

**Step 2: Commit**
```bash
git add backend/src/services/pdfService.ts
git commit -m "feat: add server-side PDF generator service using Puppeteer"
```

---

## Phase 3: Frontend Development

### Task 6: Setup Vite + React + Tailwind Frontend
**Files:**
- Create: `frontend/vite.config.ts`
- Create: `frontend/src/index.css`
- Create: `frontend/src/main.tsx`

**Step 1: Configure Tailwind CSS v3 & Inter fonts in style sheet**
Add custom styling for glassmorphic cards and print targets.

**Step 2: Commit**
```bash
git add frontend/vite.config.ts frontend/src/index.css
git commit -m "feat: setup react runtime with tailwind framework configuration"
```

---

### Task 7: Implement Authentication Store and Router
**Files:**
- Create: `frontend/src/store/authStore.ts`
- Create: `frontend/src/routes.tsx`

**Step 1: Write Zustand state store for user credentials**
**Step 2: Setup React Router with protected paths**
**Step 3: Commit**
```bash
git add frontend/src/store/authStore.ts frontend/src/routes.tsx
git commit -m "feat: create authState container and routing configuration"
```

---

### Task 8: Build Invoicing Form & Dynamic Builders
**Files:**
- Create: `frontend/src/components/InvoiceForm.tsx`
- Create: `frontend/src/components/LineItemsEditor.tsx`

**Step 1: Create LineItemsEditor**
Dynamic component handling dynamic row manipulation, calculating row totals.

**Step 2: Create main InvoiceForm**
Dynamic fields for DP percentage, pelunasan paid amounts, tax configurations, business information, and currency selection (USD, EUR, IDR, etc.) with localized formatting for all calculated figures.

**Step 3: Commit**
```bash
git add frontend/src/components/InvoiceForm.tsx frontend/src/components/LineItemsEditor.tsx
git commit -m "feat: build dynamic invoice form editor with live calculations"
```

---

### Task 9: Build Dashboard and Statistics Page
**Files:**
- Create: `frontend/src/pages/Dashboard.tsx`

**Step 1: Display charts or summary metric blocks**
Display Total revenue, pending payments, overdue items.

**Step 2: Commit**
```bash
git add frontend/src/pages/Dashboard.tsx
git commit -m "feat: build responsive management dashboard page"
```
