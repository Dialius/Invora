import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getClients, createClient } from '../controllers/clients';

const router = Router();

router.use(authenticateToken);

router.get('/', getClients);
router.post('/', createClient);

export default router;
