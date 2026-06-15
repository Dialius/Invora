import puppeteer from 'puppeteer';

export const escapeHTML = (str: any): string => {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const formatCurrency = (amount: any, currency: string = 'IDR') => {
  const numberValue = Number(amount) || 0;
  try {
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(numberValue);
    }
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(numberValue);
    }
    if (currency === 'EUR') {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(numberValue);
    }
    return `${currency} ${numberValue.toLocaleString()}`;
  } catch (e) {
    return `${currency} ${numberValue}`;
  }
};

const formatDate = (dateInput: any) => {
  if (!dateInput) return '-';
  const d = new Date(dateInput);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const generateInvoiceHTML = (invoice: any) => {
  const {
    invoiceNumber,
    type,
    status,
    title,
    projectRef,
    currency,
    invoiceDate,
    dueDate,
    subtotal,
    discountType,
    discountValue,
    taxPercent,
    taxAmount,
    extraFee,
    shippingFee,
    total,
    dpPercent,
    dpAmount,
    paidAmount,
    remainingAmount,
    notes,
    terms,
    signature,
    company,
    client,
    items = []
  } = invoice;

  const formattedItems = items.map((item: any, idx: number) => {
    return `
      <tr class="border-b border-gray-100 text-sm">
        <td class="py-3 text-center text-gray-500">${idx + 1}</td>
        <td class="py-3">
          <div class="font-medium text-gray-800">${item.category === 'jasa' ? 'Jasa' : 'Produk'}</div>
          <div class="text-xs text-gray-500 mt-0.5">${escapeHTML(item.description || '')}</div>
        </td>
        <td class="py-3 text-center text-gray-700">${item.qty} ${escapeHTML(item.unit || 'unit')}</td>
        <td class="py-3 text-right text-gray-700">${formatCurrency(item.unitPrice, currency)}</td>
        <td class="py-3 text-center text-gray-700">${item.discountPct ? `${item.discountPct}%` : '-'}</td>
        <td class="py-3 text-right font-medium text-gray-800">${formatCurrency(item.subtotal, currency)}</td>
      </tr>
    `;
  }).join('');

  // Discount calculation label
  let discountRow = '';
  if (discountType && discountValue > 0) {
    const label = discountType === 'percent' ? `Discount (${discountValue}%)` : 'Discount';
    const amount = discountType === 'percent' ? Number(subtotal) * (Number(discountValue) / 100) : Number(discountValue);
    discountRow = `
      <div class="flex justify-between py-1 text-sm text-gray-600">
        <span>${escapeHTML(label)}:</span>
        <span>-${formatCurrency(amount, currency)}</span>
      </div>
    `;
  }

  // Extra fee label
  let extraFeeRow = '';
  if (extraFee && Number(extraFee) > 0) {
    extraFeeRow = `
      <div class="flex justify-between py-1 text-sm text-gray-600">
        <span>Extra Fee:</span>
        <span>${formatCurrency(extraFee, currency)}</span>
      </div>
    `;
  }

  // Shipping fee label
  let shippingFeeRow = '';
  if (shippingFee && Number(shippingFee) > 0) {
    shippingFeeRow = `
      <div class="flex justify-between py-1 text-sm text-gray-600">
        <span>Shipping Cost:</span>
        <span>${formatCurrency(shippingFee, currency)}</span>
      </div>
    `;
  }

  // Type specific rows (DP or Pelunasan)
  let typeSpecificBlock = '';
  if (type === 'DOWN_PAYMENT') {
    typeSpecificBlock = `
      <div class="flex justify-between py-1 text-sm text-blue-600 font-semibold border-t border-gray-100 pt-2 mt-1">
        <span>Down Payment (${dpPercent}%):</span>
        <span>${formatCurrency(dpAmount, currency)}</span>
      </div>
      <div class="flex justify-between py-1 text-sm text-gray-600">
        <span>Remaining Balance:</span>
        <span>${formatCurrency(remainingAmount, currency)}</span>
      </div>
    `;
  } else if (type === 'PELUNASAN') {
    typeSpecificBlock = `
      <div class="flex justify-between py-1 text-sm text-gray-600 border-t border-gray-100 pt-2 mt-1">
        <span>Paid Amount (DP):</span>
        <span>${formatCurrency(paidAmount, currency)}</span>
      </div>
      <div class="flex justify-between py-1 text-sm text-blue-600 font-semibold">
        <span>Remaining to Pay:</span>
        <span>${formatCurrency(remainingAmount, currency)}</span>
      </div>
    `;
  }

  // Bank Accounts rendering
  const bankAccountsList = company?.bankAccounts?.map((bank: any) => {
    return `
      <div class="mb-2 text-xs text-gray-600">
        <div class="font-semibold text-gray-700">${escapeHTML(bank.bankName)}</div>
        <div>Account: ${escapeHTML(bank.accountName)}</div>
        <div>No. Rek: ${escapeHTML(bank.accountNo)}</div>
      </div>
    `;
  }).join('') || '<div class="text-xs text-gray-400">No bank details provided</div>';

  const typeLabels: Record<string, string> = {
    DOWN_PAYMENT: 'DOWN PAYMENT INVOICE',
    PELUNASAN: 'INVOICE PELUNASAN',
    PROFORMA: 'PROFORMA INVOICE',
    REGULER: 'INVOICE'
  };

  const typeLabel = typeLabels[type] || 'INVOICE';
  const brandUrl = process.env.APP_BRAND_URL || 'invora.online';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHTML(typeLabel)} ${escapeHTML(invoiceNumber)}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          -webkit-print-color-adjust: exact;
        }
        @page {
          size: A4;
          margin: 15mm;
        }
      </style>
    </head>
    <body class="bg-white text-gray-800">
      <div class="max-w-[800px] mx-auto">
        <!-- Header Section -->
        <div class="flex justify-between items-start border-b border-gray-100 pb-6">
          <div>
            ${company?.logo ? `
              <div class="mb-4">
                <img src="${company.logo.replace(/"/g, '&quot;')}" style="max-height: 50px; max-width: 150px; object-fit: contain;" />
              </div>
            ` : `
              <!-- Simple textless logo concept: stylized minimal glyph of paper/flow -->
              <div class="flex items-center gap-2 mb-4">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="15" width="60" height="70" rx="10" stroke="#1E3A5F" stroke-width="8" />
                  <path d="M35 35H65" stroke="#00A8CC" stroke-width="8" stroke-linecap="round" />
                  <path d="M35 50H65" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
                  <path d="M35 65H55" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
                </svg>
                <span class="text-xl font-bold tracking-tight text-[#1E3A5F]">Invora</span>
              </div>
            `}
            <div class="text-xs text-gray-500">
              <div class="font-bold text-sm text-gray-700">${escapeHTML(company?.name || 'My Company')}</div>
              <div>${escapeHTML(company?.address || '-')}</div>
              <div>Email: ${escapeHTML(company?.email || '-')} | Phone: ${escapeHTML(company?.phone || '-')}</div>
              ${company?.npwp ? `<div>NPWP: ${escapeHTML(company.npwp)}</div>` : ''}
            </div>
          </div>
          <div class="text-right">
            <h1 class="text-2xl font-bold text-[#1E3A5F] tracking-wide mb-1">${escapeHTML(typeLabel)}</h1>
            <div class="text-sm font-semibold text-gray-600 mb-4">${escapeHTML(invoiceNumber)}</div>
            
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 justify-items-end">
              <span class="font-medium">Date:</span> <span>${formatDate(invoiceDate)}</span>
              <span class="font-medium">Due Date:</span> <span>${formatDate(dueDate)}</span>
              ${projectRef ? `<span class="font-medium">Project Ref:</span> <span>${escapeHTML(projectRef)}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Billing Info -->
        <div class="grid grid-cols-2 gap-8 py-6 text-xs border-b border-gray-100">
          <div>
            <div class="text-gray-400 font-semibold tracking-wider uppercase mb-2">Billed To</div>
            <div class="text-sm font-bold text-gray-700 mb-1">${escapeHTML(client?.name || 'Client Name')}</div>
            ${client?.pic ? `<div class="font-medium text-gray-600 mb-1">u.p. ${escapeHTML(client.pic)}</div>` : ''}
            <div class="text-gray-500 leading-relaxed">${escapeHTML(client?.address || '-')}</div>
            <div class="text-gray-500 mt-1">Phone: ${escapeHTML(client?.phone || '-')} | Email: ${escapeHTML(client?.email || '-')}</div>
          </div>
          <div>
            ${title ? `
              <div class="text-gray-400 font-semibold tracking-wider uppercase mb-2">Subject</div>
              <div class="text-sm font-medium text-gray-700 leading-relaxed">${escapeHTML(title)}</div>
            ` : ''}
          </div>
        </div>

        <!-- Table of Items -->
        <table class="w-full text-left border-collapse mt-6">
          <thead>
            <tr class="border-b-2 border-[#1E3A5F] text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider">
              <th class="py-3 w-10 text-center">No</th>
              <th class="py-3">Description</th>
              <th class="py-3 text-center w-24">Qty</th>
              <th class="py-3 text-right w-32">Unit Price</th>
              <th class="py-3 text-center w-20">Disc (%)</th>
              <th class="py-3 text-right w-36">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${formattedItems}
          </tbody>
        </table>

        <!-- Summary section -->
        <div class="grid grid-cols-12 gap-4 mt-6">
          <!-- Left side: Payment Info and Notes -->
          <div class="col-span-7">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Payment Details</h3>
              ${bankAccountsList}
            </div>
            ${notes ? `
              <div class="mt-4 text-[11px] text-gray-500 leading-relaxed">
                <span class="font-semibold text-gray-700">Notes:</span> ${escapeHTML(notes)}
              </div>
            ` : ''}
            ${terms ? `
              <div class="mt-2 text-[11px] text-gray-500 leading-relaxed">
                <span class="font-semibold text-gray-700">Terms & Conditions:</span> ${escapeHTML(terms)}
              </div>
            ` : ''}
          </div>

          <!-- Right side: Calculation totals -->
          <div class="col-span-5 flex flex-col justify-start">
            <div class="flex justify-between py-1 text-sm text-gray-600">
              <span>Subtotal:</span>
              <span>${formatCurrency(subtotal, currency)}</span>
            </div>
            ${discountRow}
            <div class="flex justify-between py-1 text-sm text-gray-600">
              <span>Tax (${taxPercent}%):</span>
              <span>${formatCurrency(taxAmount, currency)}</span>
            </div>
            ${extraFeeRow}
            ${shippingFeeRow}
            <div class="flex justify-between py-2 text-base font-bold text-[#1E3A5F] border-t-2 border-gray-200 mt-2">
              <span>Total:</span>
              <span>${formatCurrency(total, currency)}</span>
            </div>
            ${typeSpecificBlock}
          </div>
        </div>

        <!-- Footer / Signature -->
        <div class="mt-12 pt-6 border-t border-gray-100 flex justify-between items-end text-xs text-gray-400">
          <div>
            <div class="font-semibold text-gray-600">${escapeHTML(company?.name || 'Invora Invoicing')}</div>
            <div>Thank you for your business!</div>
          </div>
          ${signature ? `
            <div class="text-center" style="min-width: 150px;">
              <div class="text-gray-500 font-medium mb-2" style="font-size: 11px;">Authorized Signature</div>
              ${signature.startsWith('data:image/') ? `
                <div class="mb-2" style="height: 60px; display: flex; align-items: center; justify-content: center;">
                  <img src="${signature.replace(/"/g, '&quot;')}" style="max-height: 60px; max-width: 120px; object-fit: contain;" />
                </div>
              ` : `
                <div class="mb-10"></div>
                <div class="font-semibold text-gray-700">${escapeHTML(signature)}</div>
              `}
              <div class="w-32 border-b border-gray-300 mx-auto mb-1"></div>
            </div>
          ` : ''}
        </div>

        <!-- Watermark footer -->
        <div style="margin-top: 32px; padding-top: 10px; border-top: 1px solid #F1F0ED; text-align: center;">
          <span style="font-size: 9px; color: #C4BDB4; letter-spacing: 0.05em; font-family: 'Inter', sans-serif;">
            Powered by <strong style="color: #A8A097;">Invora</strong> &bull; ${escapeHTML(brandUrl)}
          </span>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generatePDF = async (htmlContent: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-local-file-access'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generates PDF buffer in A4 size
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm'
      }
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

