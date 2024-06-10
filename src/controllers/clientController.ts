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
  async allclients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.crm_client.findMany({
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
        personal_loan,
        loan_terms,
        payment_mode,
        amount_applied,
        agent_type,
        branch,
        lastname,
        firstname,
        middlename,
        suffix,
        birthday,
        age,
        gender,
        religion,
        email,
        maiden,
        last_school,
        education,
        other_education,
        course,
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
        present_address,
        present_address_zipcode,
        present_address_stay,
        permanent_address,
        permanent_address_zipcode,
        permanent_address_stay,
        provincial_address,
        provincial_address_zipcode,
        provincial_address_stay,
        residence_status,
        area,
        business_type,
        business_name,
        dti_sec_reg,
        business_address,
        business_stay,
        business_contact,
        tin,
        sss,
        position,
        compay_rank,
        reference,
        refer_address,
        refer_contact,
        refer_relation,
        reference1,
        refer_address1,
        refer_contact1,
        refer_relation1,
        bank_branch,
        tel_no,
        account_name,
        account_type,
        dateOpen,
        informant_position,
        monthly_cred1,
        monthly_cred2,
        monthly_cred3,
        employer_business,
        employer_business_address,
        nature_business,
        length_business_stay,
        owned_rented,
        contact_number,
        monthly_income,
        facebook,
        viber_skype,
        mobile1,
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
        pi_remarks,
        date,
        siblings_name,
        siblings_age,
        siblings_type,
        siblings_school,
        Product,
      } = req.body;
      const profile = generateProfile();

      const createClient = await prisma.crm_client.create({
        data: {
          profile: profile ?? "",
          personal_loan: personal_loan ?? "",
          loan_terms: loan_terms ?? "",
          payment_mode: payment_mode ?? "",
          amount_applied: amount_applied ?? "",
          agent_type: agent_type ?? "",
          branch: branch ?? "",
          lastname: lastname ?? "",
          firstname: firstname ?? "",
          middlename: middlename ?? "",
          suffix: suffix ?? "",
          birthday: birthday ?? "",
          age: age ?? "",
          gender: gender ?? "",
          religion: religion ?? "",
          email: email ?? "",
          maiden: maiden ?? "",
          last_school: last_school ?? "",
          education: education ?? "",
          other_education: other_education ?? "",
          course: course ?? "",
          source_of_income: source_of_income ?? "",
          spouse_lastname: spouse_lastname ?? "",
          spouse_firstname: spouse_firstname ?? "",
          spouse_middlename: spouse_middlename ?? "",
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
          spouse_employer_business_address:
            spouse_employer_business_address ?? "",
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
          present_address: present_address ?? "",
          present_address_zipcode: present_address_zipcode ?? "",
          present_address_stay: present_address_stay ?? "",
          permanent_address: permanent_address ?? "",
          permanent_address_zipcode: permanent_address_zipcode ?? "",
          permanent_address_stay: permanent_address_stay ?? "",
          provincial_address: provincial_address ?? "",
          provincial_address_zipcode: provincial_address_zipcode ?? "",
          provincial_address_stay: provincial_address_stay ?? "",
          residence_status: residence_status ?? "",
          area: area ?? "",
          business_type: business_type ?? "",
          business_name: business_name ?? "",
          dti_sec_reg: dti_sec_reg ?? "",
          business_address: business_address ?? "",
          business_stay: business_stay ?? "",
          business_contact: business_contact ?? "",
          tin: tin ?? "",
          sss: sss ?? "",
          position: position ?? "",
          compay_rank: compay_rank ?? "",
          reference: reference ?? "",
          refer_address: refer_address ?? "",
          refer_contact: refer_contact ?? "",
          refer_relation: refer_relation ?? "",
          reference1: reference1 ?? "",
          refer_address1: refer_address1 ?? "",
          refer_contact1: refer_contact1 ?? "",
          refer_relation1: refer_relation1 ?? "",
          bank_branch: bank_branch ?? "",
          tel_no: tel_no ?? "",
          account_name: account_name ?? "",
          account_type: account_type ?? "",
          dateOpen: dateOpen ?? new Date(),
          informant_position: informant_position ?? "",
          monthly_cred1: monthly_cred1 ?? "",
          monthly_cred2: monthly_cred2 ?? "",
          monthly_cred3: monthly_cred3 ?? "",
          employer_business: employer_business ?? "",
          employer_business_address: employer_business_address ?? "",
          nature_business: nature_business ?? "",
          length_business_stay: length_business_stay ?? "",
          owned_rented: owned_rented ?? "",
          contact_number: contact_number ?? "",
          monthly_income: monthly_income ?? "",
          facebook: facebook ?? "",
          viber_skype: viber_skype ?? "",
          mobile1: mobile1 ?? "",
          mobile2: mobile2 ?? "",
          mobile3: mobile3 ?? "",
          telephone2: telephone2 ?? "",
          telephone3: telephone3 ?? "",
          roaming_no: roaming_no ?? "",
          father_name: father_name ?? "",
          father_age: father_age ?? "",
          mother_name: mother_name ?? "",
          mother_age: mother_age ?? "",
          home_owner: home_owner ?? "",
          home_owner_rent: home_owner_rent ?? "",
          home_owner_free: home_owner_free ?? "",
          residence_remarks: residence_remarks ?? "",
          pi_remarks: pi_remarks ?? "",
          udate: currentTimestamp,
          date: isoDate ?? date,
          siblings_name: siblings_name ?? "",
          siblings_age: siblings_age ?? "",
          siblings_type: siblings_type ?? "",
          siblings_school: siblings_school ?? "",
          Product: {
            create: Product,
          },
        },
      });

      res
        .status(201)
        .json({ message: "Client created successfully", createClient });
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
}
export default new ClientController();
