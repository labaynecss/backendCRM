
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateProfile } from '../utils/generateProfile';

const prisma = new PrismaClient();

class ClientController {
  async allclients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await prisma.crm_clients.findMany({
        take: 500,
      });
      console.log("Fetch success", clients);
      res.status(200).json(clients);
    } catch (err) {
      console.error('Error retrieving clients:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTelemarketer(req: Request, res: Response): Promise<void> {
    try {
      const tele = await prisma.users.findMany({
        where: {
          secondlevel: 11,
          level: 1
        }
      });
      console.log("Fetch success", tele);
      res.status(200).json(tele);
    } catch (err) {
      console.error('Error retrieving fetch:', err);
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
async createClient(req: Request, res: Response): Promise<void> {
  const {
    avatar,
    firstname,
    middlename,
    lastname,
    suffix,
    birthday,
    age,
    gender,
    maiden,
    religion,
    civil_status,
    education,
    other_education,
    course,
    last_school,
    additional_information,
    year_graduated,
    address,
    area,
    home_owner,
    home_owner_rent,
    home_owner_free,
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
    residence_remarks,
    a_code1,
    telephone1,
    telephone2,
    a_code2,
    telephone3,
    a_code3,
    mobile1,
    mobile2,
    mobile3,
    roaming_no,
    email,
    facebook,
    viber_skype,
    father_name,
    father_age,
    mother_name,
    mother_age,
    sss,
    tin,
    dti_sec_reg,
    pro_license,
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
    pi_remarks,
    udate,
    date
    
  } = req.body;

  
    try {
    const profile = generateProfile();
  




        const newClient = await prisma.crm_clients.create({
          data: {
            profile: profile,
            avatar: avatar ?? '',
            firstname : firstname,
            middlename : middlename,
            lastname: lastname,
            suffix: suffix ?? '',
            birthday: birthday,
            age : age,
            gender : gender,
            maiden : maiden,
            religion: religion,
            civil_status: civil_status,
            education:  education,
            other_education: other_education ?? '',
           course : course ?? '',
            last_school: last_school??'none',
            additional_information: additional_information ?? '',
            year_graduated : year_graduated ?? '',
            address: address ?? '',
            area: area ?? '',
            home_owner: home_owner,
            home_owner_rent : home_owner_rent ?? '',
            home_owner_free: home_owner_free ?? '',
            address_stay: address_stay,
            present_address: present_address ?? '',
            present_address_zipcode : present_address_zipcode ?? "none",
            present_address_stay: present_address_stay,
            permanent_address: permanent_address ?? '',
            permanent_address_zipcode: permanent_address_zipcode ?? '',
            permanent_address_stay: permanent_address_stay ?? '',
            provincial_address: provincial_address ?? '',
            provincial_address_zipcode: provincial_address_zipcode ?? '',
            provincial_address_stay: provincial_address_stay ?? '',
            residence_remarks: residence_remarks,
            a_code1 : a_code1 ?? '',
            telephone1: telephone1 ?? '',
            telephone2: telephone2 ?? '',
            a_code2: a_code2 ?? '',
            telephone3: telephone3 ?? '',
            a_code3: a_code3 ?? '',
            mobile1: mobile1,
            mobile2: mobile2 ?? '',
            mobile3: mobile3 ?? '',
            roaming_no: roaming_no ?? '',
            email: email,
            facebook: facebook,
            viber_skype: viber_skype ?? '',
            father_name: father_name,
            father_age: father_age ?? '',
            mother_name: mother_name,
            mother_age: mother_age ?? '',
            sss: sss,
            tin: tin,
            dti_sec_reg: dti_sec_reg ?? '',
            pro_license : pro_license ?? '',
            source_of_income : source_of_income ?? null,
            spouse_lastname: spouse_lastname ?? '',
            spouse_firstname: spouse_firstname,
            spouse_middlename : spouse_middlename,
            spouse_suffix:spouse_suffix ,
            spouse_gender: spouse_gender ?? '',
            spouse_birthday : spouse_birthday?? '',
            spouse_age : spouse_age ?? '',
            spouse_mobile_no:  spouse_mobile_no ?? "",
            spouse_tel_no : spouse_tel_no ?? '',
            spouse_provincial_address : spouse_provincial_address ?? '',
            spouse_education : spouse_education ?? '',
            spouse_other_education : spouse_other_education ?? '',
            spouse_course : spouse_course ?? '' ,
            spouse_last_school: spouse_last_school ?? '',
            spouse_additional_information : spouse_additional_information ?? '',
            spouse_year_graduated : spouse_year_graduated ?? '',
            spouse_source_of_income : spouse_source_of_income ?? '',
            spouse_employment_details : spouse_employment_details ?? '',
            spouse_employ_status : spouse_employ_status ?? '',
            spouse_employer_business_address : spouse_employer_business_address ?? '',
            spouse_employer_business_name : spouse_employer_business_name ?? '',
            spouse_monthly_income : spouse_monthly_income ?? '',
            spouse_other_income : spouse_other_income ?? '',
            spouse_dti_sec_reg : spouse_dti_sec_reg ?? '',
            spouse_pro_license : spouse_pro_license ?? '',
            spouse_sss : spouse_sss ??'',
            spouse_tin : spouse_tin ?? '',
            spouse_prev_business_stay: spouse_prev_business_stay ?? '',
            spouse_prev_employer : spouse_prev_employer ?? '' ,
            spouse_prev_employer_business_address : spouse_prev_employer_business_address ?? '' ,
            spouse_business_contact : spouse_business_contact ?? '',
            spouse_business_position : spouse_business_position ?? '',
            spouse_business_stay : spouse_business_stay ?? '',
            pi_remarks : pi_remarks ?? '',
            udate : udate ?? 0,
            date: date ? new Date(date) : undefined
          }
        });
      
  
        res.status(201).json({ message: "Client created successfully", newClient });
      } catch (err) {
        console.error('Error creating branch:', err);
        res.status(500).json({ message: "Internal Server Error" });
      }
}



}




export default new ClientController();