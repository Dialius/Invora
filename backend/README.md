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
