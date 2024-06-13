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

  async updateloans(req: Request, res: Response): Promise<void> {
    try {
      // const { id, profile, prodid, sourceofincome } = req.body;
      // const updatedLoan = await prisma.crm_loans.update({
      //   where: { id: parseInt(id, 10) },
      //   data: {
      //     profile: profile ?? undefined,
      //     prodid: prodid ?? undefined,
      //     sourceofincome: sourceofincome ?? undefined,
      //   },
      // });
      // console.log("Update success", updatedLoan);
      // res.status(200).json(updatedLoan);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async clientjoinloans(req: Request, res: Response): Promise<void> {
    try {
      const loansClient = await prisma.crm_loans.findMany({
        include: {
          client: true,
          product: true,
        },
      });
      console.log("join success", loansClient);
      res.status(200).json(loansClient);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new LoansController();
