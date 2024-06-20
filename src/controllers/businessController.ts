import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BusinessController {
  async businessTypes(req: Request, res: Response): Promise<void> {
    try {
      const businessType = await prisma.crm_businessType.findMany({
        select:{
          busines_type: true,
          
        }
      });
      console.log("Fetch success", businessType);
      res.status(200).json(businessType);
    } catch (err) {
      console.error("Error retrieving business type:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



}
export default new BusinessController();
