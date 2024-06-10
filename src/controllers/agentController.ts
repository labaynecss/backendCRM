import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AgentController {
  async listagents(req: Request, res: Response): Promise<void> {
    try {
      const agents = await prisma.crm_agents.findMany();
      console.log("Fetch success", agents);
      res.status(200).json(agents);
    } catch (err) {
      console.error("Error retrieving agents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // async createAgents(req: Request, res: Response): Promise<void> {
  //   const {
  //     addedby,
  //     email,
  //     udate,
  //     date,
  //     lastname,
  //     firstname,
  //     middlename,
  //     birthday,
  //     gender,
  //     date_reg,
  //     relative,
  //     sponsor,
  //     status,
  //     mobile,
  //     telephone,
  //     address,
  //     salt,
  //     deleted,

  //     userIdNumber,
  //   } = req.body;
  //   try {
  //     const agents = await prisma.crm_agents.create({
  //       data: {
  //         firstname: firstname,
  //         lastname: lastname,
  //         middlename: middlename,
  //         address: address,
  //         birthday: birthday,
  //         gender: gender,
  //         date_reg: date_reg,
  //         relative: relative,
  //         sponsor: sponsor,
  //         status: status,
  //         mobile: mobile,
  //         telephone: telephone,
  //         addedby: addedby,
  //         email: email,
  //         udate: udate,
  //         date: date,
  //         salt: salt,
  //         USER_ID_NUMBER: userIdNumber,
  //       },
  //     });
  //     console.log("Fetch success", agents);
  //     res.status(200).json(agents);
  //   } catch (err) {
  //     console.error("Error retrieving agents:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
  async filterAgents(req: Request, res: Response): Promise<void> {
    try {
      const { lastname, firstname, middlename } = req.body;
      const agents = await prisma.crm_agents.findMany({
        where: {
          lastname: {
            contains: lastname,
          },
          firstname: {
            contains: firstname,
          },
          middlename: {
            contains: middlename,
          },
        },
        select: {
          lastname: true,
          firstname: true,
          middlename: true,
        },
      });
      res.status(200).json(agents);
      console.log("Fetch success", agents);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
export default new AgentController();
