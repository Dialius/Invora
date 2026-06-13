import { Request as ExpressRequest, Response } from 'express';
import { prisma } from '../prisma';
import { UserPayload } from '../types';

interface Request extends ExpressRequest {
  user?: UserPayload;
}

export const getClients = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const clients = await prisma.client.findMany({
      where: { userId }
    });

    return res.status(200).json({ clients });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch clients' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { name, address, phone, email, pic } = req.body;

    if (!name) return res.status(400).json({ error: 'Client name is required' });

    const client = await prisma.client.create({
      data: {
        userId,
        name,
        address,
        phone,
        email,
        pic
      }
    });

    return res.status(201).json({ client });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create client' });
  }
};
