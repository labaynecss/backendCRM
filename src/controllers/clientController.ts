import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateProfile } from "../utils/generateProfile";
import { currentTimestamp } from "../utils/calcTime";

const prisma = new PrismaClient();

class ClientController {
  async getClientByProfile(req: Request, res: Response): Promise<void> {
    const { profile } = req.params;

    try {
      const profileGet = await prisma.crm_borrowers_test.findUnique({
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
  async allclients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.crm_borrowers_test.findMany({
        take: 500,
      });
      console.log("Fetch success", clients);
      res.status(200).json(clients);
    } catch (err) {
      console.error("Error retrieving clients:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTelemarketer(req: Request, res: Response): Promise<void> {
    try {
      const tele = await prisma.users.findMany({
        where: {
          secondlevel: 11,
          level: 1,
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
      const client = await prisma.crm_borrowers_test.findFirst({
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
  const { profile } = req.params;
  const {facebook,
    viber_skype,
    mobile2,
    mobile3,
    telephone2,
    telephone3,
    roaming_no,
    father_name,
    father_age,
    mother_name,
    mother_age,
    home_owner,
    home_owner_rent,
    home_owner_free,
    residence_remarks,
    dti_sec_reg,
    pro_license,
    pi_remarks,
    area,
    date,
    siblings_name,
    siblings_age,
    siblings_type,
    siblings_school,
    Product,address_stay} = req.body;



  const borrower = await prisma.crm_borrowers_test.findUnique({
    where: {
      id: Number(profile)
    },
  });

  if (!borrower) {
    res.status(404).json({ message: 'Borrower not found' });
  }

  const createClient  = await prisma.crm_client_test.create ({
    data: {
borrowerId: Number(profile), 
profile  : borrower?.profile  ?? '',
firstname: borrower?.firstname ?? '',
lastname : borrower ?. lastname ?? '',
middlename : borrower?.middlename ?? "",
suffix : borrower?.suffix ?? "",
birthday : borrower?.birthday ?? '',
age :borrower?.age ?? '',
gender: borrower?.gender ?? '',
email : borrower ?.email ?? '',
facebook: facebook ?? '',
viber_skype: viber_skype ?? '',
civil_status: borrower?.civil_status ?? '',
sss: borrower?.sss ?? '',
tin : borrower?.tin ?? '',
address_stay: address_stay ?? '',
present_address: borrower?.permanent_address ?? '',
present_address_zipcode: borrower?.permanent_address_zipcode ?? '',
present_address_stay: borrower?.permanent_address_stay ?? "",
permanent_address: borrower?.permanent_address ?? '',
permanent_address_zipcode: borrower?.permanent_address_zipcode ?? '',
permanent_address_stay: borrower?.permanent_address_stay ?? '',
provincial_address: borrower?.provincial_address ?? '',
provincial_address_zipcode: borrower?.provincial_address_zipcode ?? '',
provincial_address_stay : borrower?.provincial_address_stay ?? '',
area: area ?? '',
mobile1: borrower?.mobile1 ?? '',
mobile2: mobile2 ?? '',
mobile3: mobile3 ?? '',
telephone1: borrower?.telephone1 ?? "",
telephone2: telephone2 ?? "",
telephone3: telephone3 ?? "",
roaming_no: roaming_no ?? "",
father_name: father_name ?? "",
father_age: father_age ?? "",
mother_name: mother_name ?? "",
mother_age: mother_age?? "",
home_owner: home_owner ?? "",
home_owner_rent: home_owner_rent ?? "",
home_owner_free: home_owner_free ?? "",
residence_remarks: residence_remarks ?? "",
dti_sec_reg: dti_sec_reg ?? "",
pro_license: pro_license ?? "",
pi_remarks: pi_remarks ?? "",
//dependents Siblings 
siblings_name: siblings_name ?? "",
siblings_age: siblings_age ?? "",
siblings_type: siblings_type ?? "",
siblings_school: siblings_school ?? "",
Product: Product ?? "",
udate: currentTimestamp ?? 0, // Assuming udate is an integer
date: date ?? new Date()

    }

    
  })
  res.status(201).json({ message: 'Client created successfully', createClient });
 } catch (err) {
  console.error("Error creating borrower:", err);
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
