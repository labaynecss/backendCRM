
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AgencyController {
  async listagency(req: Request, res: Response): Promise<void> {
    try {
      const agency = await prisma.crm_agency.findMany();
      console.log("Fetch success", agency);
      res.status(200).json(agency);
    } catch (err) {
      console.error('Error retrieving agents:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function createBorrower(req: Request, res: Response): Promise<void> {
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
        Refer_relation1,
        Refer_address1,
        Refer_contact1,
        Reference1,
      } = req.body;
  
      // Check if a borrower with the same last name, first name, and birthday exists
      let existingBorrower = await prisma.crm_borrowers_test.findFirst({
        where: {
          lastname,
          firstname,
          birthday,
        },
      });
  
      // If a borrower exists, use the existing borrower
      if (!existingBorrower) {
        // Create a new borrower if not found
        const profile = generateProfile();
        existingBorrower = await prisma.crm_borrowers_test.create({
          data: {
            profile,
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
            Refer_relation1,
            Refer_address1,
            Refer_contact1,
            Reference1,
          },
        });
      }
  
      // Create a new client linked to the existing or newly created borrower
      const newClient = await prisma.crm_client_test.create({
        data: {
          borrowerId: existingBorrower.id,
          lastname,
          firstname,
          middlename,
          suffix,
          birthday,
          age,
          gender,
          email,
          // Add other fields as necessary
        },
      });
  
      res.status(201).json({ message: "Borrower and client created successfully", newBorrower: existingBorrower, newClient });
    } catch (err) {
      console.error("Error creating borrower:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  



}




export default new AgencyController();