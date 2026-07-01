# Invora - Professional Invoicing System

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

**🌐 Live App: [invora.online](https://www.invora.online/)**

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
