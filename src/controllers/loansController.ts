import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LoansController {
  async listofLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await prisma.crm_loan_hdr.findMany({
        take: 10,
      });
      console.log("Fetch success", loans);
      res.status(200).json(loans);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productid } = req.body;  
    const { profile } = req.params;
    const updatedLoan = await prisma.crm_loan_hdr.update({
      where: { loanprofile: profile },
      data: {
       productid: productid
      } 
    });
      console.log("Update success", updatedLoan);
      res.status(200) .json(updatedLoan);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new LoansController();
