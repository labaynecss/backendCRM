
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BorrowerController {
  async allborrowers(req: Request, res: Response): Promise<void> {
    try {
      const borrowers = await prisma.crm_borrowers.findMany();
      console.log("Fetch success", borrowers);
      res.status(200).json(borrowers);
    } catch (err) {
      console.error('Error retrieving branches:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


}

export default new BorrowerController();
