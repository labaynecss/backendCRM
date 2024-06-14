import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {
  async productlist(req: Request, res: Response): Promise<void> {
    try {
      const products = await prisma.crm_products.findMany();
      console.log("Fetch success", products);
      res.status(200).json(products);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async createProduct(req: Request, res: Response): Promise<void> {
    const {productid, prod_description, prod_type, cam , active, company} = req.body
    try {
      const products = await prisma.crm_products.create({
        data: {
          productid: productid,
          prod_description: prod_description,
          prod_type: prod_type,
          cam: cam,
          active: active,
          company: company
        }
      });
      console.log("create sucessful", products);
      res.status(200).json(products);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { prod_description, prod_type, cam , active, company} = req.body
      const update = await prisma.crm_products.update({
        where: { productid: String(id) },
        data: {
          prod_description: prod_description,
          prod_type: prod_type,
          cam: cam,
          active: active,
          company: company
        }
      });
      
      res.status(200).json(update);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}

export default new ProductController();
