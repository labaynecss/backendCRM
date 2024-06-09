import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateProfile } from "../utils/generateProfile";

const prisma = new PrismaClient();

class BorrowerController {
  async allborrowers(req: Request, res: Response): Promise<void> {
    try {
      const borrowers = await prisma.crm_borrowers_test.findMany();
      console.log("Fetch success", borrowers);
      res.status(200).json(borrowers);
    } catch (err) {
      console.error("Error retrieving borrowers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async  createBorrower(req: Request, res: Response): Promise<void> {
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
        mobile1,
        a_code1,
        telephone1,
        gender,
        civil_status,
        religion,
        email,
        maiden,
        last_school,
        education,
        other_education,
        course,
        present_address_zipcode,
        present_address_stay,
        permanent_address,
        permanent_address_zipcode,
        permanent_address_stay,
        provincial_address,
        provincial_address_zipcode,
        provincial_address_stay,
        area,
        business_type,
        business_name,
        dti_sec_reg,
        business_address,
        business_stay,
        business_contact,
        tin,
        sss,
        Reference,
        Refer_address,
        Refer_contact,
        Refer_relation,
        Reference1,
        Refer_address1,
        Refer_contact1,
        Refer_relation1,
        // Add the remaining spouse information and other missing fields here
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
        residence_status,
        source_of_income,
        position
      } = req.body;
  
      const profile = generateProfile();
  
      const newBorrower = await prisma.crm_borrowers_test.create({
        data: {
          profile: profile,
          personal_loan: personal_loan,
          loan_terms: loan_terms,
          payment_mode: payment_mode,
          amount_applied: amount_applied,
          agent_type: agent_type,
          branch: branch,
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          suffix: suffix,
          birthday: birthday,
          age: age,
          mobile1: mobile1,
          a_code1: a_code1,
          telephone1: telephone1,
          gender: gender,
          civil_status: civil_status,
          religion: religion,
          email: email,
          maiden: maiden,
          last_school: last_school,
          education: education,
          other_education: other_education,
          course: course,
          present_address_zipcode: present_address_zipcode,
          present_address_stay: present_address_stay,
          permanent_address: permanent_address,
          permanent_address_zipcode: permanent_address_zipcode,
          permanent_address_stay: permanent_address_stay,
          provincial_address: provincial_address,
          provincial_address_zipcode: provincial_address_zipcode,
          provincial_address_stay: provincial_address_stay,
          area: area,
          business_type: business_type,
          business_name: business_name,
          dti_sec_reg: dti_sec_reg,
          business_address: business_address,
          business_stay: business_stay,
          business_contact: business_contact,
          tin: tin,
          sss: sss,
          Reference: Reference,
          Refer_address: Refer_address,
          Refer_contact: Refer_contact,
          Refer_relation: Refer_relation,
          Reference1: Reference1,
          Refer_address1: Refer_address1,
          Refer_contact1: Refer_contact1,
          Refer_relation1: Refer_relation1,
          source_of_income: source_of_income,
          position: position,
          // Add the remaining spouse information and other missing fields here
          spouse_lastname: spouse_lastname,
          spouse_firstname: spouse_firstname,
          spouse_middlename: spouse_middlename,
          spouse_suffix: spouse_suffix,
          spouse_gender: spouse_gender,
          spouse_birthday: spouse_birthday,
          spouse_age: spouse_age,
          spouse_mobile_no: spouse_mobile_no,
          spouse_tel_no: spouse_tel_no,
          spouse_provincial_address: spouse_provincial_address,
          spouse_education: spouse_education,
          spouse_other_education: spouse_other_education,
          spouse_course: spouse_course,
          spouse_last_school: spouse_last_school,
          spouse_additional_information: spouse_additional_information,
          spouse_year_graduated: spouse_year_graduated,
          spouse_source_of_income: spouse_source_of_income,
          spouse_employment_details: spouse_employment_details,
          spouse_employ_status: spouse_employ_status,
          spouse_employer_business_address: spouse_employer_business_address,
          spouse_employer_business_name: spouse_employer_business_name,
          spouse_monthly_income: spouse_monthly_income,
          spouse_other_income: spouse_other_income,
          spouse_dti_sec_reg: spouse_dti_sec_reg,
          spouse_pro_license: spouse_pro_license,
          spouse_sss: spouse_sss,
          spouse_tin: spouse_tin,
          spouse_prev_business_stay: spouse_prev_business_stay,
          spouse_prev_employer: spouse_prev_employer,
          spouse_prev_employer_business_address: spouse_prev_employer_business_address,
          spouse_business_contact: spouse_business_contact,
          spouse_business_position: spouse_business_position,
          spouse_business_stay: spouse_business_stay,
          residence_status: residence_status,
        },
      });
  
      res.status(201).json({ message: "Borrower created successfully", newBorrower });
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
export default new BorrowerController();
