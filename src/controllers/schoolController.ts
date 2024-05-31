
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SchoolController {
  async schoolList(req: Request, res: Response): Promise<void> {
    try {
      const lists = await prisma.crm_schools.findMany({
        take: 500,
      });
      console.log("Fetch success", lists);
      res.status(200).json(lists);
    } catch (err) {
      console.error('Error retrieving schoollist:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async courselist(req: Request, res: Response): Promise<void> {
    try {
      const courses = await prisma.crm_course.findMany({
        take: 500,
      });
      console.log("Fetch success", courses);
      res.status(200).json(courses);
    } catch (err) {
      console.error('Error retrieving schoollist:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createAddress(req: Request, res: Response): Promise<void> {
    const { zipcode, province, city , status, } = req.body 

    try {
        const address  = await prisma.crm_manage_address.create({
            data: {
                ZIP_CODE: zipcode,
                PROVINCE: province,
                CITY: city,
                STATUS: status ?? 0,
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




}
export default new SchoolController()