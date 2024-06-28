import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FileController {
  async Documents(req: Request, res: Response): Promise<void> {
    try {
      const documents = await prisma.crm_documentUploaded.findMany();
      console.log("Fetch success", documents);
      res.status(200).json(documents);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FileController()