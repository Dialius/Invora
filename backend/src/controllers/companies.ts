import { Request as ExpressRequest, Response } from 'express';
import { prisma } from '../prisma';
import { UserPayload } from '../types';

interface Request extends ExpressRequest {
  user?: UserPayload;
}

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const companies = await prisma.company.findMany({
      where: { userId },
      include: { bankAccounts: true }
    });

    return res.status(200).json({ companies });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch companies' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { name, logo, address, phone, email, website, npwp, bankAccounts } = req.body;

    if (!name) return res.status(400).json({ error: 'Company name is required' });

    const company = await prisma.company.create({
      data: {
        userId,
        name,
        logo,
        address,
        phone,
        email,
        website,
        npwp,
        bankAccounts: {
          create: bankAccounts || []
        }
      },
      include: { bankAccounts: true }
    });

    return res.status(201).json({ company });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create company' });
  }
};
