
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LoansController {
  async listofLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await prisma. crm_loans.findMany({
        take: 500,
        orderBy: {
            amount_applied: "asc"
        }
      }

      );
      console.log("Fetch success", loans);
      res.status(200).json(loans);
    } catch (err) {
      console.error('Error retrieving loans:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



}




export default new LoansController();