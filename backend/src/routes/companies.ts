import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getCompanies, createCompany } from '../controllers/companies';

const router = Router();

router.use(authenticateToken);

router.get('/', getCompanies);
router.post('/', createCompany);

export default router;
