
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AgencyController {
  async listagency(req: Request, res: Response): Promise<void> {
    try { 
      const agency = await prisma.crm_agency.findMany({
        select:{
          agency_name: true,
        }
      });
      console.log("Fetch success", agency);
      res.status(200).json(agency);
    } catch (err) {
      console.error('Error retrieving agents:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  
  
    }
    
  }

  async listTelemarketer(req: Request, res: Response): Promise<void> {
    try {
      const agencies = await prisma.crm_agency.findMany({
        select:{
          agency_name: true,
          agencycode: true,
          agencyid: true
        }
      });
      console.log("Fetch success", agencies);
      res.status(200).json(agencies);
    } catch (err) {
      console.error('Error retrieving agents:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  
  
    }
    
  }


  


  



}




export default new AgencyController();