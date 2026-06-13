import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  duplicateInvoice,
  updateInvoiceStatus
} from '../controllers/invoices';

const router = Router();

// Apply auth middleware to all invoice endpoints
router.use(authenticateToken);

router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.post('/', createInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.post('/:id/duplicate', duplicateInvoice);
router.patch('/:id/status', updateInvoiceStatus);

export default router;
