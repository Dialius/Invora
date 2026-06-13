import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getCompanies, createCompany, deleteCompany } from '../controllers/companies';

const router = Router();

router.use(authenticateToken);

router.get('/', getCompanies);
router.post('/', createCompany);
router.delete('/:id', deleteCompany);

export default router;
