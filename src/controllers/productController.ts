import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {
  async productlist(req: Request, res: Response): Promise<void> {
    try {
      const products = await prisma.crm_product.findMany();
      console.log("Fetch success", products);
      res.status(200).json(products);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ProductController();
