import { Request as ExpressRequest, Response } from 'express';
import { prisma } from '../prisma';
import { UserPayload } from '../types';
import { generateInvoiceHTML, generatePDF } from '../services/pdf';

interface Request extends ExpressRequest {
  user?: UserPayload;
}

// Helper to calculate totals on an invoice payload
export const calculateInvoiceTotals = (invoiceData: any, items: any[]) => {
  let subtotal = 0;
  
  const calculatedItems = items.map((item: any) => {
    const qty = Number(item.qty) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    const discountPct = Number(item.discountPct) || 0;
    
    let itemSubtotal = qty * unitPrice;
    if (discountPct > 0) {
      itemSubtotal = itemSubtotal * (1 - discountPct / 100);
    }
    
    subtotal += itemSubtotal;
    
    return {
      category: item.category || 'jasa',
      description: item.description || '',
      qty,
      unit: item.unit || 'unit',
      unitPrice,
      discountPct,
      subtotal: itemSubtotal
    };
  });

  const discountType = invoiceData.discountType || null; // 'percent' or 'nominal'
  const discountValue = Number(invoiceData.discountValue) || 0;
  
  let discountAmount = 0;
  if (discountType === 'percent') {
    discountAmount = subtotal * (discountValue / 100);
  } else if (discountType === 'nominal') {
    discountAmount = discountValue;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxPercent = Number(invoiceData.taxPercent) !== undefined ? Number(invoiceData.taxPercent) : 11;
  const taxAmount = taxableAmount * (taxPercent / 100);
  const extraFee = Number(invoiceData.extraFee) || 0;
  const shippingFee = Number(invoiceData.shippingFee) || 0;
  const total = taxableAmount + taxAmount + extraFee + shippingFee;

  let dpPercent = null;
  let dpAmount = null;
  let paidAmount = null;
  let remainingAmount = null;

  if (invoiceData.type === 'DOWN_PAYMENT') {
    dpPercent = Number(invoiceData.dpPercent) || 0;
    dpAmount = total * (dpPercent / 100);
    remainingAmount = total - dpAmount;
  } else if (invoiceData.type === 'PELUNASAN') {
    paidAmount = Number(invoiceData.paidAmount) || 0;
    remainingAmount = Math.max(0, total - paidAmount);
  }

  return {
    calculatedItems,
    totals: {
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
      remainingAmount
    }
  };
};

// GET /api/invoices
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const status = req.query.status as string;
    const type = req.query.type as string;

    const whereClause: any = { userId };

    if (status) {
      whereClause.status = status;
    }
    if (type) {
      whereClause.type = type;
    }
    if (search) {
      whereClause.OR = [
        { invoiceNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { client: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const [invoices, totalCount] = await Promise.all([
      prisma.invoice.findMany({
        where: whereClause,
        include: { client: true, company: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.invoice.count({ where: whereClause })
    ]);

    return res.status(200).json({
      invoices,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch invoices' });
  }
};

// GET /api/invoices/:id
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const invoice = await prisma.invoice.findFirst({
      where: { id, userId },
      include: {
        client: true,
        company: { include: { bankAccounts: true } },
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    return res.status(200).json({ invoice });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch invoice' });
  }
};

// POST /api/invoices
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const {
      companyId,
      clientId,
      invoiceNumber,
      type,
      title,
      projectRef,
      currency,
      invoiceDate,
      dueDate,
      notes,
      terms,
      signature,
      items,
      discountType,
      discountValue,
      taxPercent,
      extraFee,
      shippingFee,
      dpPercent,
      dpAmount,
      paidAmount
    } = req.body;

    if (!companyId || !clientId || !type || !invoiceDate || !dueDate || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Auto-generate invoice number if not provided
    let finalInvoiceNumber = invoiceNumber;
    if (!finalInvoiceNumber) {
      const date = new Date(invoiceDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const count = await prisma.invoice.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1)
          }
        }
      });
      const seq = String(count + 1).padStart(4, '0');
      finalInvoiceNumber = `INV/${year}/${month}/${seq}`;
    }

    // Check uniqueness of invoiceNumber
    const existing = await prisma.invoice.findFirst({ where: { invoiceNumber: finalInvoiceNumber, userId } });
    if (existing) {
      return res.status(400).json({ error: 'Invoice number already exists' });
    }

    // Calculate totals
    const { calculatedItems, totals } = calculateInvoiceTotals(
      { type, discountType, discountValue, taxPercent, extraFee, shippingFee, dpPercent, dpAmount, paidAmount },
      items
    );

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        companyId,
        clientId,
        invoiceNumber: finalInvoiceNumber,
        type,
        status: 'DRAFT',
        title,
        projectRef,
        currency: currency || 'IDR',
        invoiceDate: new Date(invoiceDate),
        dueDate: new Date(dueDate),
        subtotal: totals.subtotal,
        discountType: totals.discountType,
        discountValue: totals.discountValue,
        taxPercent: totals.taxPercent,
        taxAmount: totals.taxAmount,
        extraFee: totals.extraFee,
        shippingFee: totals.shippingFee,
        total: totals.total,
        dpPercent: totals.dpPercent,
        dpAmount: totals.dpAmount,
        paidAmount: totals.paidAmount,
        remainingAmount: totals.remainingAmount,
        notes,
        terms,
        signature,
        items: {
          create: calculatedItems
        }
      },
      include: {
        items: true
      }
    });

    return res.status(201).json({ invoice });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create invoice' });
  }
};

// PUT /api/invoices/:id
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const existingInvoice = await prisma.invoice.findFirst({ where: { id, userId } });
    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const {
      companyId,
      clientId,
      invoiceNumber,
      type,
      status,
      title,
      projectRef,
      currency,
      invoiceDate,
      dueDate,
      notes,
      terms,
      signature,
      items,
      discountType,
      discountValue,
      taxPercent,
      extraFee,
      shippingFee,
      dpPercent,
      dpAmount,
      paidAmount
    } = req.body;

    // Build update object
    const updateData: any = {};
    if (companyId) updateData.companyId = companyId;
    if (clientId) updateData.clientId = clientId;
    if (invoiceNumber) updateData.invoiceNumber = invoiceNumber;
    if (type) updateData.type = type;
    if (status) updateData.status = status;
    if (title !== undefined) updateData.title = title;
    if (projectRef !== undefined) updateData.projectRef = projectRef;
    if (currency) updateData.currency = currency;
    if (invoiceDate) updateData.invoiceDate = new Date(invoiceDate);
    if (dueDate) updateData.dueDate = new Date(dueDate);
    if (notes !== undefined) updateData.notes = notes;
    if (terms !== undefined) updateData.terms = terms;
    if (signature !== undefined) updateData.signature = signature;
    if (shippingFee !== undefined) updateData.shippingFee = shippingFee;

    if (items && Array.isArray(items)) {
      // Re-calculate totals
      const totalsInput = {
        type: type || existingInvoice.type,
        discountType: discountType !== undefined ? discountType : existingInvoice.discountType,
        discountValue: discountValue !== undefined ? discountValue : existingInvoice.discountValue,
        taxPercent: taxPercent !== undefined ? taxPercent : existingInvoice.taxPercent,
        extraFee: extraFee !== undefined ? extraFee : existingInvoice.extraFee,
        shippingFee: shippingFee !== undefined ? shippingFee : existingInvoice.shippingFee,
        dpPercent: dpPercent !== undefined ? dpPercent : existingInvoice.dpPercent,
        dpAmount: dpAmount !== undefined ? dpAmount : existingInvoice.dpAmount,
        paidAmount: paidAmount !== undefined ? paidAmount : existingInvoice.paidAmount,
      };

      const { calculatedItems, totals } = calculateInvoiceTotals(totalsInput, items);

      updateData.subtotal = totals.subtotal;
      updateData.discountType = totals.discountType;
      updateData.discountValue = totals.discountValue;
      updateData.taxPercent = totals.taxPercent;
      updateData.taxAmount = totals.taxAmount;
      updateData.extraFee = totals.extraFee;
      updateData.shippingFee = totals.shippingFee;
      updateData.total = totals.total;
      updateData.dpPercent = totals.dpPercent;
      updateData.dpAmount = totals.dpAmount;
      updateData.paidAmount = totals.paidAmount;
      updateData.remainingAmount = totals.remainingAmount;

      // In a transaction, delete old items and write new ones
      await prisma.$transaction([
        prisma.invoiceItem.deleteMany({ where: { invoiceId: id } }),
        prisma.invoice.update({
          where: { id },
          data: {
            ...updateData,
            items: {
              create: calculatedItems
            }
          }
        })
      ]);
    } else {
      // Just update regular invoice details without updating items
      await prisma.invoice.update({
        where: { id },
        data: updateData
      });
    }

    const updatedInvoice = await prisma.invoice.findUnique({
      where: { id },
      include: { items: true }
    });

    return res.status(200).json({ invoice: updatedInvoice });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update invoice' });
  }
};

// DELETE /api/invoices/:id
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const existingInvoice = await prisma.invoice.findFirst({ where: { id, userId } });
    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await prisma.invoice.delete({ where: { id } });
    return res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete invoice' });
  }
};

// POST /api/invoices/:id/duplicate
export const duplicateInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const originalInvoice = await prisma.invoice.findFirst({
      where: { id, userId },
      include: { items: true }
    });

    if (!originalInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Auto-generate a new invoice number
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const count = await prisma.invoice.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1)
        }
      }
    });
    const seq = String(count + 1).padStart(4, '0');
    const newInvoiceNumber = `INV/${year}/${month}/${seq}`;

    const newInvoice = await prisma.invoice.create({
      data: {
        userId,
        companyId: originalInvoice.companyId,
        clientId: originalInvoice.clientId,
        invoiceNumber: newInvoiceNumber,
        type: originalInvoice.type,
        status: 'DRAFT',
        title: originalInvoice.title ? `${originalInvoice.title} (Copy)` : 'Copy',
        projectRef: originalInvoice.projectRef,
        currency: originalInvoice.currency,
        invoiceDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days due
        subtotal: originalInvoice.subtotal,
        discountType: originalInvoice.discountType,
        discountValue: originalInvoice.discountValue,
        taxPercent: originalInvoice.taxPercent,
        taxAmount: originalInvoice.taxAmount,
        extraFee: originalInvoice.extraFee,
        total: originalInvoice.total,
        dpPercent: originalInvoice.dpPercent,
        dpAmount: originalInvoice.dpAmount,
        paidAmount: originalInvoice.paidAmount,
        remainingAmount: originalInvoice.remainingAmount,
        notes: originalInvoice.notes,
        terms: originalInvoice.terms,
        signature: originalInvoice.signature,
        items: {
          create: originalInvoice.items.map((item) => ({
            category: item.category,
            description: item.description,
            qty: item.qty,
            unit: item.unit,
            unitPrice: item.unitPrice,
            discountPct: item.discountPct,
            subtotal: item.subtotal
          }))
        }
      },
      include: {
        items: true
      }
    });

    return res.status(201).json({ invoice: newInvoice });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to duplicate invoice' });
  }
};

// PATCH /api/invoices/:id/status
export const updateInvoiceStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const existingInvoice = await prisma.invoice.findFirst({ where: { id, userId } });
    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const updated = await prisma.invoice.update({
      where: { id },
      data: { status }
    });

    return res.status(200).json({ invoice: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update status' });
  }
};

// GET /api/invoices/:id/pdf
export const getInvoicePDF = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const invoice = await prisma.invoice.findFirst({
      where: { id, userId },
      include: {
        client: true,
        company: { include: { bankAccounts: true } },
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const htmlContent = generateInvoiceHTML(invoice);
    const pdfBuffer = await generatePDF(htmlContent);

    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoiceNumber.replace(/\//g, '-')}.pdf`);
    return res.send(pdfBuffer);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to generate PDF' });
  }
};

// GET /api/invoices/public/:id
export const getPublicInvoiceById = async (req: ExpressRequest, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        company: { include: { bankAccounts: true } },
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    return res.status(200).json({ invoice });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch public invoice' });
  }
};

// GET /api/invoices/public/:id/pdf
export const getPublicInvoicePDF = async (req: ExpressRequest, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        company: { include: { bankAccounts: true } },
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const htmlContent = generateInvoiceHTML(invoice);
    const pdfBuffer = await generatePDF(htmlContent);

    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoiceNumber.replace(/\//g, '-')}.pdf`);
    return res.send(pdfBuffer);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to generate PDF' });
  }
};

