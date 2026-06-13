# Invora Platform Redesign & Humanization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign Invora into a light-mode Soft Editorial & Clean console layout, fixing signature offset drawing, print artifacts, custom inputs, and shipping fee calculation.

**Architecture:** Wrap dashboard and invoice views in a global `ConsoleLayout` featuring a collapsible dark left sidebar and off-white workspace. Coordinate mouse strokes on signature canvas by scaling them relative to client bounds, use `@media print` CSS overrides to suppress print margins, and add a `shippingFee` field across the database, backend calculations, and invoice layout.

**Tech Stack:** React, Express, Prisma, Tailwind CSS, PostgreSQL, Puppeteer.

---

### Task 1: Database Schema Migration

**Files:**
- Modify: `d:\Invora\backend\prisma\schema.prisma`

**Step 1: Write the schema modification**
Add `shippingFee` field to the `Invoice` model:
```diff
model Invoice {
  // ... existing fields ...
  signature       String?
  items           InvoiceItem[]
+ shippingFee     Decimal       @default(0)
  createdAt       DateTime      @default(now())
```

**Step 2: Run db push to update database schema**
Run command: `npx prisma db push` (in `d:\Invora\backend`)
Expected: Success message "Your database is now in sync with your Prisma schema".

**Step 3: Commit**
```bash
git add backend/prisma/schema.prisma
git commit -m "db: add shippingFee field to Invoice model"
```

---

### Task 2: Backend Controller Totals Calculation Update

**Files:**
- Modify: `d:\Invora\backend\src\controllers\invoices.ts`

**Step 1: Write the updated calculateInvoiceTotals function and API handlers**
Add `shippingFee` processing to the backend calculation helper:
```diff
export const calculateInvoiceTotals = (invoiceData: any, items: any[]) => {
  // ... existing calculations ...
  const taxPercent = Number(invoiceData.taxPercent) !== undefined ? Number(invoiceData.taxPercent) : 11;
  const taxAmount = taxableAmount * (taxPercent / 100);
  const extraFee = Number(invoiceData.extraFee) || 0;
+ const shippingFee = Number(invoiceData.shippingFee) || 0;
- const total = taxableAmount + taxAmount + extraFee;
+ const total = taxableAmount + taxAmount + extraFee + shippingFee;
  // ...
  return {
    calculatedItems,
    totals: {
      subtotal,
      discountType,
      discountValue,
      taxPercent,
      taxAmount,
      extraFee,
+     shippingFee,
      total,
      // ...
```
Update `createInvoice` and `updateInvoice` to save `shippingFee` in `prisma.invoice.create` and `prisma.invoice.update` operations.

**Step 2: Test backend calculations**
Run the server: `npm run dev`
Expected: Server starts successfully with no Prisma schema compilation errors.

**Step 3: Commit**
```bash
git add backend/src/controllers/invoices.ts
git commit -m "feat: integrate shippingFee inside invoice controller calculations"
```

---

### Task 3: PDF Generation Service Update

**Files:**
- Modify: `d:\Invora\backend\src\services\pdf.ts`

**Step 1: Write shipping fee rendering in PDF HTML layout**
Retrieve and render `shippingFee` in the HTML invoice template:
```diff
export const generateInvoiceHTML = (invoice: any) => {
  const {
    // ...
    extraFee,
+   shippingFee,
    total,
    // ...
  } = invoice;
  
  // Render shippingFee row under tax
+ let shippingFeeRow = '';
+ if (shippingFee && Number(shippingFee) > 0) {
+   shippingFeeRow = `
+     <div class="flex justify-between py-1 text-sm text-gray-600">
+       <span>Shipping Cost:</span>
+       <span>${formatCurrency(shippingFee, currency)}</span>
+     </div>
+   `;
+ }
```

Include `@media print` style at the top of the HTML output in `generateInvoiceHTML` to ensure pupeteer generated PDF is clean:
```html
<style>
  @media print {
    @page {
      margin: 0;
    }
    body {
      margin: 1.5cm;
    }
  }
</style>
```

**Step 2: Commit**
```bash
git add backend/src/services/pdf.ts
git commit -m "feat: add shipping fee and clean print margins in PDF generation service"
```

---

### Task 4: Console Sidebar & Top Breadcrumbs Layout Wrapper

**Files:**
- Create: `d:\Invora\frontend\src\components\ConsoleLayout.tsx`
- Modify: `d:\Invora\frontend\src\App.tsx`

**Step 1: Create the ConsoleLayout component**
Develop a left sidebar (styled like Firebase console, collapsible, containing Invora logo, nav list, and profile avatar) and breadcrumb header.
Inside `/invoices/new` and `/invoices/:id/edit`, the navigation menu will feature a prominent console "Back to Dashboard" button.

**Step 2: Wrap protected routes in App.tsx**
Wrap dashboard and editor routes inside `<Route element={<ConsoleLayout />}>` inside `App.tsx`.

**Step 3: Commit**
```bash
git add frontend/src/components/ConsoleLayout.tsx frontend/src/App.tsx
git commit -m "feat: implement global console layout wrapper for auth routes"
```

---

### Task 5: Redesign Login and Register Pages

**Files:**
- Modify: `d:\Invora\frontend\src\pages\Login.tsx`
- Modify: `d:\Invora\frontend\src\pages\Register.tsx`

**Step 1: Rewrite Login.tsx and Register.tsx**
Apply the **Soft Editorial & Clean** theme. Update backdrops to off-white, boxes to premium white cards with thin slate borders and soft shadows, Outfit/Inter typography, and deep teal button styles.

**Step 2: Commit**
```bash
git add frontend/src/pages/Login.tsx frontend/src/pages/Register.tsx
git commit -m "style: redesign login and registration screens to soft editorial"
```

---

### Task 6: Invoice Form Custom Elements, Shipping, and Signature Fix

**Files:**
- Modify: `d:\Invora\frontend\src\components\InvoiceForm.tsx`

**Step 1: Add shippingFee state and calculations**
```typescript
const [shippingFee, setShippingFee] = useState<number>(0);
```
In `useEffect` for totals, add `shippingFee` to the `total` calculation. Add input field near Subtotal.

**Step 2: Fix canvas signature drawing coordinates mapping**
Modify `getCanvasCoords` to map client coordinate clientX/Y to canvas scale:
```typescript
const rect = canvas.getBoundingClientRect();
const x = ((clientX - rect.left) / rect.width) * canvas.width;
const y = ((clientY - rect.top) / rect.height) * canvas.height;
```

**Step 3: Redesign selectors and input fields to custom styled dropdowns and spinnerless inputs**
- Build custom UI select picker that binds values to hidden `<select>` to preserve testing stability.
- Squelch HTML5 number input default selectors and style inputs with elegant border lines.

**Step 4: Commit**
```bash
git add frontend/src/components/InvoiceForm.tsx
git commit -m "feat: update invoice form with custom selects, shipping cost, and signature canvas fix"
```

---

### Task 7: Public Invoice View Page Redesign

**Files:**
- Modify: `d:\Invora\frontend\src\pages\PublicInvoiceView.tsx`

**Step 1: Render shipping cost and add print media style**
- Render the `shippingFee` row under tax in A4 layout.
- Append a print media style block inside `PublicInvoiceView.tsx`:
```css
@media print {
  @page {
    margin: 0;
  }
  body {
    margin: 1.6cm;
  }
}
```

**Step 2: Commit**
```bash
git add frontend/src/pages/PublicInvoiceView.tsx
git commit -m "feat: support shipping fee rendering and print formatting in public view"
```

---

### Task 8: Dashboard Page Alignment

**Files:**
- Modify: `d:\Invora\frontend\src\pages\Dashboard.tsx`

**Step 1: Styling update**
Apply soft editorial cards, light backgrounds, and clean modern spacing to align with the new dashboard wrapper aesthetic.

**Step 2: Commit**
```bash
git add frontend/src/pages/Dashboard.tsx
git commit -m "style: polish dashboard table page layout to align with console design"
```
