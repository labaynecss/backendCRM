import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LoansController {
  async listofLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await prisma.crm_loans.findMany({
        take: 10,
      });
      console.log("Fetch success", loans);
      res.status(200).json(loans);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createloans(req: Request, res: Response): Promise<void> {
    try {
      const { profile, prodid, sourceofincome } = req.body;
      const createloan = await prisma.crm_loans.create({
        data: {
          profile: profile,
          prodid: prodid,
          sourceofincome: sourceofincome,
        },
      });
      console.log("Fetch success", createloan);
      res.status(200).json(createloan);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new LoansController();
