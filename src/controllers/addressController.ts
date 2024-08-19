import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../utils/error";

const prisma = new PrismaClient();

class AddressController {
  async Address(req: Request, res: Response): Promise<void> {
    const addresses = await prisma.crm_address_citymunicipality.findMany({
      select: {
        citymunDesc: true,
        citymuncode: true,
        provCode: true,
        crm_address_province: {
          select: {
            provDesc: true,
            provCode: true,
            regCode: true,
            crm_address_region: {
              select: {
                regcode: true,
                regdescription: true,
              },
            },
          },
        },
        crm_address_barangay: {
          select: {
            brgyDescription: true,
            citymuncode: true,
            brgyCode: true,
          },
        },
      },
      orderBy: {
        citymunDesc: "desc",
      },
    });

    // Check if data exists
    if (!addresses || addresses.length === 0) {
      res.status(404).json({ message: "No addresses found" });
      return;
    }

    console.log("Address value", addresses);
    res.status(200).json(addresses);
  }

  //   async GetAddressByArea(req: Request, res: Response): Promise<void> {
  //  const { brgyCode } = req.params
  //  const area = await prisma.crm.findMany({
  //    where: {  },
  //    select: {
  //     brgyDescription: true,
  //     citymuncode: true,
  //     crm_address_citymunicipality: {
  //       select: {
  //         citymunDesc: true,
  //         citymuncode: true,
  //         crm_address_province: {
  //           select: {
  //             provDesc: true,
  //             provCode: true,
  //             crm_address_region: {
  //               select: {
  //                 regdescription: true,
  //                 psgcCode: true

  //               },
  //             },
  //           },
  //         },
  //       },
  //     }
  //    }

  //  })
  // }

  async ProviceAddress(req: Request, res: Response): Promise<void> {
    try {
      const addresslist = await prisma.crm_address_province.findMany({
        include: {
          crm_address_region: {
            select: {
              regdescription: true,
            },
          },
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
