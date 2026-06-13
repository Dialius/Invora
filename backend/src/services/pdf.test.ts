import test from 'node:test';
import assert from 'node:assert';
import { generateInvoiceHTML, formatCurrency } from './pdf';

test('PDF HTML compiler', async (t) => {
  await t.test('should format currency correctly for IDR, USD, EUR', () => {
    assert.strictEqual(formatCurrency(1000000, 'IDR').replace(/\s/g, ''), 'Rp1.000.000');
    assert.strictEqual(formatCurrency(1000.5, 'USD').replace(/\s/g, ''), '$1,000.50');
    assert.strictEqual(formatCurrency(1000.5, 'EUR').replace(/\s/g, ''), '1.000,50€'); // de-DE format is standard 1.000,50 €
  });

  await t.test('should generate clean HTML invoice markup with correct parameters', () => {
    const mockInvoice = {
      invoiceNumber: 'INV-2026-0001',
      type: 'REGULER',
      status: 'DRAFT',
      title: 'Website Design & Development',
      projectRef: 'PRJ-101',
      currency: 'USD',
      invoiceDate: new Date('2026-06-13'),
      dueDate: new Date('2026-07-13'),
      subtotal: 5000,
      discountType: 'percent',
      discountValue: 10,
      taxPercent: 11,
      taxAmount: 495,
      extraFee: 100,
      total: 5095,
      notes: 'Please pay within 30 days',
      terms: 'Net 30',
      signature: 'John Doe',
      company: {
        name: 'Tech Inc',
        address: '123 Tech St',
        email: 'info@tech.com',
        phone: '123-456-7890',
        npwp: '12.345.678.9-012.000',
        bankAccounts: [
          {
            bankName: 'Bank BCA',
            accountName: 'Tech Inc',
            accountNo: '88888888'
          }
        ]
      },
      client: {
        name: 'Client Corp',
        pic: 'Jane Smith',
        address: '456 Client Rd',
        email: 'jane@client.com',
        phone: '987-654-3210'
      },
      items: [
        {
          category: 'jasa',
          description: 'Frontend Dev',
          qty: 1,
          unit: 'month',
          unitPrice: 5000,
          discountPct: 0,
          subtotal: 5000
        }
      ]
    };

    const html = generateInvoiceHTML(mockInvoice);

    // Verify critical elements are present in compiled HTML
    assert.ok(html.includes('INV-2026-0001'));
    assert.ok(html.includes('Website Design & Development'));
    assert.ok(html.includes('Tech Inc'));
    assert.ok(html.includes('Client Corp'));
    assert.ok(html.includes('Jane Smith'));
    assert.ok(html.includes('Frontend Dev'));
    assert.ok(html.includes('Bank BCA'));
    assert.ok(html.includes('88888888'));
    assert.ok(html.includes('Please pay within 30 days'));
    assert.ok(html.includes('Net 30'));
    assert.ok(html.includes('John Doe'));
  });
});
