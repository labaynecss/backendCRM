import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateProfile } from "../utils/generateProfile";

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
      const client = await prisma.crm_client_test.findFirst({
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
        profile,
        lastname,
        firstname,
        middlename,
        suffix,
        birthday,
        age,
        gender,
        email,
        facebook,
        viber_skype,
        civil_status,
        sss,
        tin,
        address_stay,
        present_address,
        present_address_zipcode,
        present_address_stay,
        permanent_address,
        permanent_address_zipcode,
        permanent_address_stay,
        provincial_address,
        provincial_address_zipcode,
        provincial_address_stay,
        area,
        // Education information
        education,
        other_education,
        course,
        last_school,
        // Contact information
        mobile1,
        mobile2,
        mobile3,
        telephone1,
        telephone2,
        telephone3,
        roaming_no,
        // Spouse information
        source_of_income,
        spouse_lastname,
        spouse_firstname,
        spouse_middlename,
        spouse_suffix,
        spouse_gender,
        spouse_birthday,
        spouse_age,
        spouse_mobile_no,
        spouse_tel_no,
        spouse_provincial_address,
        spouse_education,
        spouse_other_education,
        spouse_course,
        spouse_last_school,
        spouse_additional_information,
        spouse_year_graduated,
        spouse_source_of_income,
        spouse_employment_details,
        spouse_employ_status,
        spouse_employer_business_address,
        spouse_employer_business_name,
        spouse_monthly_income,
        spouse_other_income,
        spouse_dti_sec_reg,
        spouse_pro_license,
        spouse_sss,
        spouse_tin,
        spouse_prev_business_stay,
        spouse_prev_employer,
        spouse_prev_employer_business_address,
        spouse_business_contact,
        spouse_business_position,
        spouse_business_stay,
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
        udate,
        date,
        // Siblings dependents
        siblings_name,
        siblings_age,
        siblings_type,
        siblings_school,
        // Product
        Product,
      } = req.body;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const newClient = await prisma.crm_client_test.create({
        data: {
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          suffix: suffix ?? "",
          birthday: birthday,
          age: age,
          gender: gender,
          email: email,
          facebook: facebook,
          viber_skype: viber_skype ?? "",
          civil_status: civil_status,
          sss: sss,
          tin: tin,
          // Address information
          address_stay: address_stay,
          present_address: present_address,
          present_address_zipcode: present_address_zipcode ?? "none",
          present_address_stay: present_address_stay,
          permanent_address: permanent_address,
          permanent_address_zipcode: permanent_address_zipcode,
          permanent_address_stay: permanent_address_stay,
          provincial_address: provincial_address,
          provincial_address_zipcode: provincial_address_zipcode,
          provincial_address_stay: provincial_address_stay,
          area: area,
          // Education information
          education: education,
          other_education: other_education ?? "",
          course: course ?? "",
          last_school: last_school ?? "",
          // Contact information
          mobile1: mobile1,
          mobile2: mobile2 ?? "",
          mobile3: mobile3 ?? "",
          telephone1: telephone1 ?? "",
          telephone2: telephone2 ?? "",
          telephone3: telephone3 ?? "",
          roaming_no: roaming_no ?? "",
          // Spouse information
          source_of_income: source_of_income ?? null,
          spouse_lastname: spouse_lastname ?? "",
          spouse_firstname: spouse_firstname,
          spouse_middlename: spouse_middlename,
          spouse_suffix: spouse_suffix ?? "",
          spouse_gender: spouse_gender ?? "",
          spouse_birthday: spouse_birthday ?? "",
          spouse_age: spouse_age ?? "",
          spouse_mobile_no: spouse_mobile_no ?? "",
          spouse_tel_no: spouse_tel_no ?? "",
          spouse_provincial_address: spouse_provincial_address ?? "",
          spouse_education: spouse_education ?? "",
          spouse_other_education: spouse_other_education ?? "",
          spouse_course: spouse_course ?? "",
          spouse_last_school: spouse_last_school ?? "",
          spouse_additional_information: spouse_additional_information ?? "",
          spouse_year_graduated: spouse_year_graduated ?? "",
          spouse_source_of_income: spouse_source_of_income ?? "",
          spouse_employment_details: spouse_employment_details ?? "",
          spouse_employ_status: spouse_employ_status ?? "",
          spouse_employer_business_address:spouse_employer_business_address ?? "",
          spouse_employer_business_name: spouse_employer_business_name ?? "",
          spouse_monthly_income: spouse_monthly_income ?? "",
          spouse_other_income: spouse_other_income ?? "",
          spouse_dti_sec_reg: spouse_dti_sec_reg ?? "",
          spouse_pro_license: spouse_pro_license ?? "",
          spouse_sss: spouse_sss ?? "",
          spouse_tin: spouse_tin ?? "",
          spouse_prev_business_stay: spouse_prev_business_stay ?? "",
          spouse_prev_employer: spouse_prev_employer ?? "",
          spouse_prev_employer_business_address:
            spouse_prev_employer_business_address ?? "",
          spouse_business_contact: spouse_business_contact ?? "",
          spouse_business_position: spouse_business_position ?? "",
          spouse_business_stay: spouse_business_stay ?? "",
          father_name: father_name,
          father_age: father_age ?? "",
          mother_name: mother_name,
          mother_age: mother_age ?? "",
          home_owner: home_owner,
          home_owner_rent: home_owner_rent ?? "",
          home_owner_free: home_owner_free ?? "",
          residence_remarks: residence_remarks,
          dti_sec_reg: dti_sec_reg ?? "",
          pro_license: pro_license ?? "",
          pi_remarks: pi_remarks ?? "",
          udate: currentTimestamp ?? "",
          date: date ? new Date(date) : new Date().toISOString(),
          // Siblings dependents
          siblings_name: siblings_name ?? "",
          siblings_age: siblings_age ?? "",
          siblings_type: siblings_type ?? "",
          siblings_school: siblings_school ?? "",
          // Product
          Product: Product ?? "",
        },
      });

      res
        .status(201)
        .json({ message: "Client created successfully", newClient });
    } catch (err) {
      console.error("Error creating client:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //   async getclientbyID(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;
  //     try {
  //       const client = await prisma.crm_client_test.findUnique({
  //         where: {
  //           cid: Number(id), // Ensure the ID is correctly converted to a number
  //         },
  //         select: {
  //           firstname: true, //
  //           middlename: true, //
  //           lastname: true, //
  //           suffix: true, //
  //           birthday: true, //
  //           age: true, //
  //           gender: true, //
  //           email: true, //
  //           civil_status: true, //
  //           education: true, //
  //           other_education: true, //
  //           course: true, //
  //           last_school: true, //
  //           additional_information: true, //
  //           year_graduated: true, //
  //           address: true, //
  //           area: true, //
  //           address_stay: true, //
  //           sss: true, //
  //           tin: true, //
  //           present_address: true, //
  //           present_address_zipcode: true, //
  //           present_address_stay: true, //
  //           permanent_address: true, //
  //           permanent_address_zipcode: true, //
  //           permanent_address_stay: true, //
  //           provincial_address: true, //
  //           provincial_address_zipcode: true, //
  //           provincial_address_stay: true, //
  //           residence_remarks: true, //
  //           mobile1: true, //
  //           mobile2: true, //
  //           mobile3: true, //
  //           roaming_no: true, //
  //           facebook: true, //
  //           father_name: true, //
  //           father_age: true, //
  //           mother_name: true, //
  //           mother_age: true, //
  //           source_of_income: true, //
  //           spouse_lastname: true, //
  //           spouse_firstname: true, //
  //           spouse_middlename: true, //
  //           spouse_suffix: true, //
  //           spouse_gender: true, //
  //           spouse_birthday: true, //
  //           spouse_age: true, //
  //           spouse_mobile_no: true, //
  //           spouse_tel_no: true, //
  //           spouse_provincial_address: true, //
  //           spouse_education: true, //
  //           spouse_other_education: true, //
  //           spouse_course: true, //
  //           spouse_last_school: true, //
  //           spouse_additional_information: true, //
  //           spouse_year_graduated: true, //
  //           spouse_source_of_income: true, //
  //           spouse_employment_details: true, //
  //           spouse_employ_status: true, //
  //           spouse_employer_business_address: true, //
  //           spouse_employer_business_name: true, //
  //           spouse_monthly_income: true, //
  //           spouse_other_income: true, //
  //           spouse_dti_sec_reg: true, //
  //           spouse_pro_license: true, //
  //           spouse_sss: true, //
  //           spouse_tin: true, //
  //           spouse_prev_business_stay: true, //
  //           spouse_prev_employer: true, //
  //           spouse_prev_employer_business_address: true, //
  //           spouse_business_contact: true, //
  //           spouse_business_position: true, //
  //           spouse_business_stay: true, //
  //           pi_remarks: true, //
  //           udate: true, //
  //           date: true, //
  //         },
  //       });
  //       if (!client) {
  //         res.status(404).json({ message: "Client not found" });
  //         return;
  //       }
  //       res.status(200).json(client);
  //     } catch (err) {
  //       console.error("Error retrieving clients:", err);
  //       res.status(500).json({ error: "Internal Server Error" });
  //     }
  //   }
  // }
}

export default new ClientController();
