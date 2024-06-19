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
 
  async filterAgents(req: Request, res: Response): Promise<void> {
    try {
      const { lastname, firstname, middlename } = req.body;
      const agents = await prisma.crm_agents.findMany({
        where: {
          a_lastname: {
            contains: lastname,
          },
          a_firstname: {
            contains: firstname,
          },
          a_middlename: {
            contains: middlename,
          },
        },
        select: {
          a_address: true,
          a_firstname: true,
          a_middlename: true,
        },
      });
      res.status(200).json(agents);
      console.log("Fetch success", agents);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  async updateAgentLoans(req: Request, res: Response): Promise<void> {
  const {agentid } = req.body

  const {profile} = req.params

try {
  const agent = prisma.crm_loan_hdr.update({
    where: {loanprofile: profile},
  data:{
    agentid: agentid
  }

})  
console.log("Update success", agent);
      res.status(200) .json(agent);
} catch (err) {
  console.error("Error retrieving loans:", err);
  res.status(500).json({ error: "Internal Server Error" });
}
  
}





  }




export default new AgentController();
