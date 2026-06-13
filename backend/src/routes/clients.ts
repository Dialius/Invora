import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getClients, createClient, deleteClient } from '../controllers/clients';

const router = Router();

router.use(authenticateToken);

router.get('/', getClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);

export default router;
