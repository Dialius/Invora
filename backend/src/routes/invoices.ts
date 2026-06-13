import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  duplicateInvoice,
  updateInvoiceStatus,
  getInvoicePDF,
  getPublicInvoiceById,
  getPublicInvoicePDF
} from '../controllers/invoices';

const router = Router();

// Public routes (No authentication required)
router.get('/public/:id', getPublicInvoiceById);
router.get('/public/:id/pdf', getPublicInvoicePDF);

// Apply auth middleware to all other invoice endpoints
router.use(authenticateToken);

router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.get('/:id/pdf', getInvoicePDF);
router.post('/', createInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.post('/:id/duplicate', duplicateInvoice);
router.patch('/:id/status', updateInvoiceStatus);

export default router;
