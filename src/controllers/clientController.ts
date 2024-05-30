
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ClientController {
  async allclients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.crm_clients.findMany();
      console.log("Fetch success", clients);
      res.status(200).json(clients);
    } catch (err) {
      console.error('Error retrieving branches:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async checkclient(req: Request, res: Response): Promise<void> {
    const { firstname, middlename, lastname , suffix} = req.body 

    try {
        const client  = await prisma.crm_clients.findFirst({
            where: {
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                suffix: suffix
            },
            select: {
                firstname: true,
                middlename: true,
                lastname: true,
                suffix: true
            },
        });

        if (client) {
            console.log("Client exists, proceed with renewal:", client);
            res.status(200).json({ message: 'Client exists, proceed with renewal', client });
        } else {
            console.log("Client doesn't exist, proceed with new application");
            res.status(200).json({ message: " New application" });
        }
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




export default new ClientController();