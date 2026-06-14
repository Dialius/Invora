# Invora Full-Stack Redesign & Feature Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the frontend of the Invora invoicing platform with multiple public landing routes, a live toggleable A4 invoice preview under the form, signature drawing pad, logo uploader, and safe profile deletion with duplicate checks.

**Architecture:** Extended React Router routes in frontend, custom CSS input styling, HTML5 Signature Canvas component, and new DELETE routes with constraint checks in Express backend.

**Tech Stack:** React (Vite), Tailwind CSS, Lucide icons, Express, Prisma, PostgreSQL (Supabase).

---

### Task 1: Backend DELETE Endpoints & Duplicate Validation

**Files:**
- Modify: `backend/src/routes/companies.ts`
- Modify: `backend/src/routes/clients.ts`
- Modify: `backend/src/controllers/companies.ts`
- Modify: `backend/src/controllers/clients.ts`

**Step 1: Write backend tests or verify code structure**
We will verify that we check references before deletion and case-insensitive duplicates on creation.

**Step 2: Add DELETE routes in Companies & Clients routers**
Update routers to include `DELETE /:id`.

**Step 3: Implement minimal controller logic**
In `backend/src/controllers/companies.ts`:
- Check if company has active invoices. If yes, return `400` error.
- Check case-insensitive name duplication in `createCompany`.
```typescript
// Add deleteCompany
export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const invoiceCount = await prisma.invoice.count({ where: { companyId: id } });
  if (invoiceCount > 0) return res.status(400).json({ error: "Company is used in invoices" });
  await prisma.company.delete({ where: { id } });
  return res.status(200).json({ message: "Deleted successfully" });
};
```

In `backend/src/controllers/clients.ts`:
- Check if client has active invoices. If yes, return `400` error.
- Check case-insensitive name duplication in `createClient`.
```typescript
// Add deleteClient
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const invoiceCount = await prisma.invoice.count({ where: { clientId: id } });
  if (invoiceCount > 0) return res.status(400).json({ error: "Client is used in invoices" });
  await prisma.client.delete({ where: { id } });
  return res.status(200).json({ message: "Deleted successfully" });
};
```

**Step 4: Verify endpoints**
Run the backend server and test endpoints.

**Step 5: Commit**
```bash
git add backend/src/controllers/ backend/src/routes/
git commit -m "backend: add safe delete and duplicate validation for company/client"
```

---

### Task 2: Public Multi-Route Components

**Files:**
- Create: `frontend/src/pages/LandingHome.tsx`
- Create: `frontend/src/pages/Features.tsx`
- Create: `frontend/src/pages/Pricing.tsx`
- Create: `frontend/src/pages/FAQ.tsx`
- Create: `frontend/src/pages/Contact.tsx`
- Modify: `frontend/src/App.tsx`

**Step 1: Create Landing Home component**
Implement `/` containing hero section, dynamic sample invoice preview with interactive controls (sliders to change discount percentage and a select menu to change currency, updating the invoice output in real-time).

**Step 2: Create Features page**
Implement `/features` with a modern features description grid.

**Step 3: Create Pricing page**
Implement `/pricing` with three glassmorphic tier comparison cards.

**Step 4: Create FAQ page**
Implement `/faq` with accordion question items.

**Step 5: Create Contact page**
Implement `/contact` with customer contact form.

**Step 6: Update App.tsx Routing**
Add route bindings in `App.tsx` for `/`, `/features`, `/pricing`, `/faq`, `/contact`.

**Step 7: Commit**
```bash
git add frontend/src/pages/ frontend/src/App.tsx
git commit -m "frontend: add public landing routes and layout elements"
```

---

### Task 3: Dropdown & Number Input Redesign

**Files:**
- Modify: `frontend/src/index.css`
- Modify: `frontend/src/components/InvoiceForm.tsx`

**Step 1: Add custom utility classes in CSS**
Add custom styling for selects and number inputs to remove system arrows.
```css
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
```

**Step 2: Update all dropdowns and number fields in InvoiceForm**
Apply premium styling to input fields, currency selections, and numeric controls.

**Step 3: Commit**
```bash
git add frontend/src/index.css frontend/src/components/InvoiceForm.tsx
git commit -m "frontend: style inputs and select fields with premium dark design"
```

---

### Task 4: Base64 Logo Upload & HTML5 Signature Canvas

**Files:**
- Modify: `frontend/src/components/InvoiceForm.tsx`

**Step 1: Add Logo file reader**
In the Company Modal inside `InvoiceForm.tsx`, add a file input that reads images as Base64 data URLs:
```typescript
const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCompany({ ...newCompany, logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
};
```

**Step 2: Add Signature Pad Canvas**
Implement HTML5 canvas signature board inside `InvoiceForm.tsx` with clear drawing state, save coordinates, and options to clear drawings or toggle file upload instead.

**Step 3: Commit**
```bash
git add frontend/src/components/InvoiceForm.tsx
git commit -m "frontend: add company logo uploader and signature drawing pad"
```

---

### Task 5: Live Invoice Preview under the Form

**Files:**
- Modify: `frontend/src/components/InvoiceForm.tsx`

**Step 1: Implement toggle preview state**
Add state `showPreview` (boolean) and a "Show Invoice Preview" button inside the main layout.

**Step 2: Create A4 preview container**
Format notes and terms blocks cleanly. Add custom thank-you message state and inputs. Add toggle for Language (ID/EN) translating labels dynamically. Add delete buttons for active Company/Client profiles with confirmation dialogs.

**Step 3: Commit**
```bash
git add frontend/src/components/InvoiceForm.tsx
git commit -m "frontend: embed toggleable invoice preview, multi-language switcher, and delete controls"
```

---

### Task 6: Read-Only Invoice Details & Public Sharing Page

**Files:**
- Create: `frontend/src/pages/InvoiceDetail.tsx`
- Modify: `frontend/src/App.tsx`

**Step 1: Create InvoiceDetail.tsx**
A public read-only page to view invoice contents by ID. Includes Print/PDF buttons using `window.print()` and a "Copy Share Link" button.

**Step 2: Bind Public Detail Route**
Map `/invoices/:id/view` in `App.tsx` as a public route.

**Step 3: Commit**
```bash
git add frontend/src/pages/InvoiceDetail.tsx frontend/src/App.tsx
git commit -m "frontend: add read-only public invoice viewing and print page"
```
