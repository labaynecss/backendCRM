import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateProfile } from "../utils/generateProfile";
import { currentTimestamp, isoDate } from "../utils/calcTime";

const prisma = new PrismaClient();

class ClientController {
  async getClientByProfile(req: Request, res: Response): Promise<void> {
    const { profile } = req.params;

    try {
      const profileGet = await prisma.crm_client.findUnique({
        where: { profile: profile },
      });

      if (!profileGet) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }

      res.status(200).json(profileGet);
    } catch (err) {
      console.error("Error retrieving profile:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async clientjoinData(req: Request, res: Response): Promise<void> {
    try {
      const allclients = await prisma.crm_client.findMany({
        include: {
          crm_allottee: true,
          crm_assets: true,
          crm_clientEducation: true,
          crm_loan_hdr: true,
          crm_soiBusiness: true,
          crm_soiOccupation: true,
        },
      });
      console.log("join success", allclients);
      res.status(200).json(allclients);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTelemarketer(req: Request, res: Response): Promise<void> {
    try {
      const tele = await prisma.crm_users.findMany({
        where: {
          SECONDLEVEL: "",
          LEVEL: "",
        },
      });
      console.log("Fetch success", tele);
      res.status(200).json(tele);
    } catch (err) {
      console.error("Error retrieving fetch:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async checkclient(req: Request, res: Response): Promise<void> {
    const { firstname, middlename, lastname, suffix } = req.body;
    try {
      const client = await prisma.crm_client.findFirst({
        where: {
          firstname: firstname,
          middlename: middlename,
          lastname: lastname,
          suffix: suffix,
        },
        select: {
          firstname: true,
          middlename: true,
          lastname: true,
          suffix: true,
        },
      });

      if (client) {
        console.log("Client exists, proceed with renewal:", client);
        res
          .status(200)
          .json({ message: "Client exists, proceed with renewal", client });
      } else {
        console.log("Client doesn't exist, proceed with new application");
        res.status(200).json({ message: "New application" });
      }
    } catch (err) {
      console.error("Error retrieving client:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const {
        lastname,
        firstname,
        middlename,
        suffix,
        birthday,
        age,
        gender,
        mobile,
        telephone,
        area,
        civilstatus,
        religion,
        mothersname,
        email,
        createdby,
        allottee_principalemployer,
        allottee_agency,
        allottee_address,
        allottee_contactnumber,
        allottee_netsalaryincome,
        verified,
        assetid,
        totalfair_marketvalue,
        crm_assetsAuto,
        crm_assetsRealstate,
        educ_level,
        educ_school,
        loantype,
        course,
        modeofpayment,
        terms,
        amountapplied,
        productid,
        agentid,
        business_name,
        business_nature,
        business_address,
        business_contact,
        net_income,
        employer_company,
        employer_nature,
        employer_address,
        employer_contact,
        net_salaryincome,
      } = req.body;
      const profile = generateProfile();
      const createClient = await prisma.crm_client.create({
        data: {
          profile: profile,
          lastname: lastname,
          firstname: firstname,
          middlename: middlename ?? "",
          suffix: suffix,
          birthday: birthday,
          age: age,
          gender: gender,
          mobile: mobile,
          telephone: telephone,
          area: area,
          civilstatus: civilstatus,
          religion: religion,
          email: email,
          mothersname: mothersname,
          createdby: createdby ?? "",
          createddatetime: new Date(),
          crm_allottee: {
            create: {
              allottee_principalemployer: allottee_principalemployer,
              allottee_agency: allottee_agency,
              allottee_address: allottee_address,
              allottee_contactnumber: allottee_contactnumber,
              allottee_netsalaryincome: allottee_netsalaryincome,
              verified: verified,
              createdby: createdby,
              createddatetime: new Date(),
            },
          },
          crm_assets: {
            create: {
              assetid: assetid,
              totalfair_marketvalue: totalfair_marketvalue,
              crm_assetsAuto: crm_assetsAuto,
              crm_assetsRealstate: crm_assetsRealstate,
            },
          },
          crm_clientEducation: {
            create: {
              educ_level: educ_level,
              educ_school: educ_school,
              course: course,
            },
          },
          crm_loan_hdr: {
            // create: {
            //   loantype: loantype,
            //   terms: terms,
            //   modeofpayment: modeofpayment,
            //   amountapplied: amountapplied,
            //   productid: productid,
            //   agentid: agentid,
            //   createdby: createdby ?? "",
            //   createddatetime: new Date(),
            // },
          },
          crm_soiBusiness: {
            create: {
              business_name: business_name,
              business_nature: business_nature,
              business_address: business_address,
              business_contact: business_contact,
              net_income: net_income,
            },
          },
          crm_soiOccupation: {
            create: {
              employer_company: employer_company,
              employer_nature: employer_nature,
              employer_address: employer_address,
              employer_contact: employer_contact,
              net_salaryincome: net_salaryincome,
            },
          },
          // crm_soiOfw: {
          //   create: {
          //     ofw_principalemployer: ofw_principalemployer,
          //     ofw_agency: ofw_agency,
          //     ofw_address: ofw_address,
          //     ofw_contactnumber: ofw_contactnumber,
          //     ofw_netsalaryincome: ofw_netsalaryincome,
          //   },
          // },
        },
      });

      res.status(201).json({
        message: "Client created successfully",
        createClient,
      });

      console.log("Fetch success", createClient);
    } catch (err) {
      console.error("Error creating client:", err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        res.status(400).json({ message: "Bad Request", error: err.message });
      } else {
        // Handle other errors
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    const { profile } = req.params;
    try {
      const {
        lastname,
        firstname,
        middlename,
        suffix,
        birthday,
        age,
        gender,
        mobile,
        telephone,
        area,
        civilstatus,
        religion,
        mothersname,
        email,
        updatedby,
        crm_allottee,
      } = req.body;

      let existingClient = await prisma.crm_client.findUnique({
        where: { profile: profile },
      });

      if (!existingClient) {
        res.status(404).json({ message: "Existing client not found" });
      }

      const updateClient = await prisma.crm_client.update({
        where: { profile: profile },
        data: {
          lastname,
          firstname,
          middlename,
          suffix,
          birthday,
          age,
          gender,
          mobile,
          telephone,
          area,
          civilstatus,
          religion,
          email,
          mothersname,
          updatedby: updatedby ?? "",
          updateddatetime: new Date(),
          crm_allottee: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_assets: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_clientEducation: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_loan_hdr: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_soiBusiness: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_soiOccupation: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
          crm_soiOfw: {
            updateMany: {
              where: { profile: profile },
              data: {},
            },
          },
        },
      });

      res.status(200).json({
        message: "Client updated successfully",
        updateClient,
      });

      console.log("Update data successful", updateClient);
    } catch (err) {
      console.error("Error updating client:", err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        res.status(400).json({ message: "Bad Request", error: err.message });
      } else {
        // Handle other errors
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

export default new ClientController();
