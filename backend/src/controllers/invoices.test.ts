import test from 'node:test';
import assert from 'node:assert';
import { calculateInvoiceTotals } from './invoices';

test('calculateInvoiceTotals function', async (t) => {
  await t.test('should correctly calculate basic items without invoice discounts/tax', () => {
    const invoiceData = {
      type: 'REGULER',
      taxPercent: 0,
    };
    const items = [
      { category: 'jasa', description: 'Item 1', qty: 2, unit: 'pcs', unitPrice: 10000 },
      { category: 'produk', description: 'Item 2', qty: 1, unit: 'box', unitPrice: 50000, discountPct: 10 }
    ];

    const result = calculateInvoiceTotals(invoiceData, items);

    // Item 1: 2 * 10000 = 20000
    // Item 2: 1 * 50000 * 0.9 = 45000
    // Subtotal = 65000
    assert.strictEqual(result.totals.subtotal, 65000);
    assert.strictEqual(result.totals.total, 65000);
    assert.strictEqual(result.calculatedItems[0].subtotal, 20000);
    assert.strictEqual(result.calculatedItems[1].subtotal, 45000);
  });

  await t.test('should correctly apply percent discount and tax', () => {
    const invoiceData = {
      type: 'REGULER',
      discountType: 'percent',
      discountValue: 10,
      taxPercent: 11,
    };
    const items = [
      { qty: 2, unitPrice: 50000 }
    ];

    const result = calculateInvoiceTotals(invoiceData, items);

    // Subtotal: 100000
    // Discount: 10% of 100000 = 10000
    // Taxable: 90000
    // Tax: 11% of 90000 = 9900
    // Total: 99900
    assert.strictEqual(result.totals.subtotal, 100000);
    assert.strictEqual(result.totals.taxAmount, 9900);
    assert.strictEqual(result.totals.total, 99900);
  });

  await t.test('should correctly apply nominal discount and extra fee', () => {
    const invoiceData = {
      type: 'REGULER',
      discountType: 'nominal',
      discountValue: 5000,
      taxPercent: 10,
      extraFee: 2000
    };
    const items = [
      { qty: 1, unitPrice: 25000 }
    ];

    const result = calculateInvoiceTotals(invoiceData, items);

    // Subtotal: 25000
    // Discount: 5000
    // Taxable: 20000
    // Tax: 10% of 20000 = 2000
    // Extra fee: 2000
    // Total: 20000 + 2000 + 2000 = 24000
    assert.strictEqual(result.totals.subtotal, 25000);
    assert.strictEqual(result.totals.taxAmount, 2000);
    assert.strictEqual(result.totals.total, 24000);
  });

  await t.test('should calculate down payment fields correctly', () => {
    const invoiceData = {
      type: 'DOWN_PAYMENT',
      dpPercent: 30,
      taxPercent: 0
    };
    const items = [
      { qty: 1, unitPrice: 100000 }
    ];

    const result = calculateInvoiceTotals(invoiceData, items);

    // Total: 100000
    // DP: 30% of 100000 = 30000
    // Remaining: 70000
    assert.strictEqual(result.totals.total, 100000);
    assert.strictEqual(result.totals.dpAmount, 30000);
    assert.strictEqual(result.totals.remainingAmount, 70000);
  });

  await t.test('should calculate pelunasan remaining amount correctly', () => {
    const invoiceData = {
      type: 'PELUNASAN',
      paidAmount: 40000,
      taxPercent: 0
    };
    const items = [
      { qty: 1, unitPrice: 100000 }
    ];

    const result = calculateInvoiceTotals(invoiceData, items);

    // Total: 100000
    // Paid (DP): 40000
    // Remaining: 60000
    assert.strictEqual(result.totals.total, 100000);
    assert.strictEqual(result.totals.paidAmount, 40000);
    assert.strictEqual(result.totals.remainingAmount, 60000);
  });
});
