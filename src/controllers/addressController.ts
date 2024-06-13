
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AddressController {
  async addressList(req: Request, res: Response): Promise<void> {
    try {
      const address = await prisma.crm_address_citymunicipality.findMany({
        take: 500,
      });
      console.log("Fetch success", address);
      res.status(200).json(address);
    } catch (err) {
      console.error('Error retrieving branches:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getAddressList(req: Request, res: Response): Promise<void> {
    try {
      const address = await prisma.crm_address_province.findMany({
        include:{
          crm_address_region:{
            
          }
        }
      });
      console.log("Fetch success", address);
      res.status(200).json(address);
    } catch (err) {
      console.error('Error retrieving branches:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async createAddress(req: Request, res: Response): Promise<void> {
    const { ZIP_CODE, PROVINCE, CITY , STATUS, } = req.body 

    try {
        const address  = await prisma.crm_manage_address.create({
            data: {
                ZIP_CODE: ZIP_CODE,
                PROVINCE: PROVINCE,
                CITY: CITY,
                STATUS: STATUS ?? 0,
            },
            select: {
                ZIP_CODE: true,
                PROVINCE: true,
                CITY: true,
                STATUS: true,
                DATE: true, 
              },
        });
        res.status(201).json({ message: "Created Address Successfully", address });

    
    } catch (err) {
        console.error('Error retrieving client:', err);
        res.status(500).json({ error: 'Internal Server Error' });
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