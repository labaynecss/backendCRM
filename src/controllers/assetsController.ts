import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AssetsController {
  async listAssets(req: Request, res: Response): Promise<void> {
    try {
      const agents = await prisma.crm_assets.findMany();
      console.log("Fetch success", agents);
      res.status(200).json(agents);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async updateAuto(req: Request, res: Response): Promise<void> {
  //   const {a} = req.body
  //   try {
  //     const assetsAuto = await prisma.crm_assets.update({
  //    where: {
  //     loanprofile: loanprofile
  //    },
  //    data: {

  //    }
  //     });
    
  //     res.status(200).json(assetsAuto);
  //   } catch (err) {
  //     console.error("Error retrieving agents:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
}

export default new AssetsController()