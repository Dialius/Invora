# Design Document: Humanizing Invora Invoicing Platform

**Date**: 2026-06-13  
**Status**: APPROVED  
**Aesthetic Theme**: Soft Editorial & Clean (Light Mode Console)  

---

## 1. Executive Summary
Invora is transitioning from a dark, AI-centric developer style to a warm, premium, and human-friendly design called **Soft Editorial & Clean**. The layout will follow a Unified Console structure similar to Firebase and Google Cloud Console, using a collapsible left sidebar, top breadcrumb utility, and clean cards with soft shadows.

Functional improvements include:
1. **Signature Alignment Fix**: Correcting canvas scale mismatches so mouse/touch coordinates map precisely to internal drawings.
2. **Print Artifact Removal**: Hiding browser headers and footers (page title, date, URL) on printing.
3. **Shipping Fee Field**: Adding a database-backed shipping cost near the Subtotal.
4. **Navigation**: Adding a console-style "Back to Home" sidebar option and visual menus.

---

## 2. Design & Layout Architecture

### A. Color & Typography Tokens
*   **Background (Canvas)**: `#F8F9FA` (Warm Light Slate / Off-white)
*   **Sidebar Navigation**: `#0F172A` (Dark Charcoal) for high contrast and modern structure.
*   **Cards & Workspaces**: `#FFFFFF` with `1px` border of `#E2E8F0` and `shadow-sm` (soft, subtle shadow).
*   **Primary Action Accents**: `#0F766E` (Deep Teal) / `#0D9488` (Teal-600) replacing neon cyan.
*   **Fonts**: Google Fonts **Outfit** or **Inter** (friendly, readable, clean Sans-serif).

### B. Global `ConsoleLayout` Component
A wrapper surrounding all authorized pages (`/dashboard`, `/invoices/new`, `/invoices/:id/edit`).
```
+-----------------------------------------------------------+
| [Invora] Logo   |  Dashboard > Invoices > Create          |
|-----------------|-----------------------------------------|
| - Dashboard     |                                         |
| - New Invoice   |  [ Main Workspace Canvas ]              |
| - Companies     |  - Form inputs on Left (Clean cards)    |
| - Clients       |  - A4 Live Preview on Right/Bottom      |
| - Settings      |                                         |
|                 |                                         |
|-----------------|                                         |
| [User Profile]  |                                         |
+-----------------------------------------------------------+
```

---

## 3. Technical Implementation Details

### A. Database & Schema Updates
We will add a new field `shippingFee` of type `Decimal` to store the shipping cost:
```prisma
model Invoice {
  // ... existing fields ...
  shippingFee Decimal @default(0)
}
```
We will run `npx prisma db push` to synchronize Supabase database.

### B. Signature Canvas Drawing Calibration
Map touch/mouse coordinates accurately using the ratio of client-rendered bounds to internal canvas dimensions:
```typescript
const rect = canvas.getBoundingClientRect();
const x = ((clientX - rect.left) / rect.width) * canvas.width;
const y = ((clientY - rect.top) / rect.height) * canvas.height;
```

### C. Clean Print Formatting
Remove browser metadata via CSS media print rule:
```css
@media print {
  @page {
    margin: 0; /* Hides browser header (title/date) and footer (URL/pages) */
  }
  body {
    margin: 1.6cm; /* Keeps printed content safely within page edges */
  }
}
```

### D. Custom Form Components
1. **Dropdown (Select)**: Styled button that toggles a floating menu list with custom option items. Under the hood, updates a hidden native `<select>` to keep Playwright tests compatible.
2. **Number Inputs**: Hide browser spin-buttons. Use styled containers with symbol prefixes (`Rp`, `$`) and side action buttons for quantity modifiers.

---

## 4. User QA & Verification Checklist

Please use this checklist to verify all requirements are met after the implementation:

### 1. Authentication Redesign (Login & Register Pages)
*   [ ] Verify the theme is light-based, soft, and warm (no dark `#0B132B` backdrop).
*   [ ] Confirm cards use subtle borders, soft shadows, and clean modern typography.
*   [ ] Test login with correct and incorrect credentials to verify error alerts are clean.

### 2. General Navigation & Console Layout
*   [ ] Verify that the dashboard (`/dashboard`) and invoice form (`/invoices/new`) have a persistent, collapsible Left Sidebar menu.
*   [ ] Check that the sidebar contains the Invora logo, menu links (Dashboard, New Invoice, etc.), and user profile at the bottom.
*   [ ] Click the sidebar collapse button (`<` / `>`) and verify the main canvas expands/shrinks smoothly.
*   [ ] Verify breadcrumb indicators at the top bar show the correct active path.

### 3. Custom Input Elements
*   [ ] Open the Invoice Form, check that the Company and Client dropdowns use the custom styled UI (no default browser select box).
*   [ ] Check number inputs (Qty, Unit Price, Tax, Discount) and confirm they have no default browser up/down arrows.
*   [ ] Test adding and removing line items.

### 4. Shipping Fee Integration
*   [ ] Verify there is a "Shipping Cost" field in the Invoice Form near the Subtotal.
*   [ ] Input a shipping fee and verify it recalculates the "Total Amount" in real-time.
*   [ ] Verify the shipping fee appears in the A4 Live Preview and matches the selected currency symbol.
*   [ ] Save the invoice, load it again, and check that the shipping fee is persistent.

### 5. Signature Canvas Accuracy
*   [ ] Choose the "Draw Canvas" signature tab.
*   [ ] Draw on the canvas using mouse or touch.
*   [ ] Verify the drawn lines align perfectly with your cursor/finger position (no offset or scaling shift).
*   [ ] Verify the saved signature displays properly on the A4 Live Preview.

### 6. Clean Print Test
*   [ ] Click the "Print" button or trigger `Ctrl + P` on the Public Invoice View page.
*   [ ] Check the print preview screen in Chrome/Edge/Firefox.
*   [ ] Confirm there are no headers (e.g., date, page title) or footers (e.g., website URL) visible at the top or bottom of the page.
