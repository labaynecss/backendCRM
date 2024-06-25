import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AddressController {
  async Address(req: Request, res: Response): Promise<void> {
    try {
      const address = await prisma.crm_address_citymunicipality.findMany({
       
        select: {
          citymunDesc: true,
          citymuncode:true,
          crm_address_province: {
            select: {
              provDesc: true,
              crm_address_region: {
                select: {
                  regdescription: true,
                },
              },
            },
          },
          crm_address_barangay:{
            select: {
              brgyDescription: true
            }
          }
        },
        orderBy:{
          citymunDesc: 'asc'
        }
      });
      console.log("Fetch success", address);
      res.status(200).json(address);
    } catch (err) {
      console.error("Error retrieving branches:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async ProviceAddress(req: Request, res: Response): Promise<void> {
    try {
      const addresslist = await prisma.crm_address_province.findMany({
        include: {
          crm_address_region: {
            select: {
              regdescription: true,
              
            },
          }
        },
      
      });
      console.log("Fetch success", addresslist);
      res.status(200).json(addresslist);
    } catch (err) {
      console.error("Error retrieving branches:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createAddress(req: Request, res: Response): Promise<void> {
    const { psgcCode, citymunDesc, regCode, provCode, citymuncode } = req.body;

    try {
      const address = await prisma.crm_address_citymunicipality.create({
        data: {
          psgcCode: psgcCode,
          citymunDesc: citymunDesc,
          regCode: regCode,
          provCode: provCode,
          citymuncode: citymuncode,
        },
        select: {
          psgcCode: true,
          citymunDesc: true,
          regCode: true,
          provCode: true,
          citymuncode: true,
        },
      });
      res
        .status(201)
        .json({ message: "Created Address Successfully", address });
    } catch (err) {
      console.error("Error retrieving client:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // async createClient(req: Request, res: Response): Promise<void> {
  //     const { firstname, middlename, lastname , } = req.body

  //     try {
  //         const newClient = await prisma.crm_clients.create({
  //           data: {

  //           }
  //         });

  //         res.status(201).json({ message: "Branch created successfully", newClient });
  //       } catch (err) {
  //         console.error('Error creating branch:', err);
  //         res.status(500).json({ message: "Internal Server Error" });
  //       }
  // }
}

export default new AddressController();
