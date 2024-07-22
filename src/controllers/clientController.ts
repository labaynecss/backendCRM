import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {  generateProfile } from "../utils/generateProfile";
import { generateloanProfileId } from "../utils/generateLoanProfile";
import { NotFoundError } from "../utils/error";
import { flattenProfileGet } from "../helpers/getClientbyProfile";
import { ClientData } from "../helpers/getClients";
import { generateSoiId } from "../utils/generateSoi";


const prisma = new PrismaClient();

class ClientController {

  async getallClients(req: Request, res: Response): Promise<void> {

    try { 
      const clients = await prisma.crm_client.findMany({
        orderBy: {
          profile: 'desc',
        }
      });
      console.log("Fetch success", clients);
      res.status(200).json(clients);
    } catch (err) {
      console.error('Error retrieving agents:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  
  
    }
  }
  async getClientByProfile(req: Request, res: Response): Promise<void> {
    const { profile } = req.params;
      const profileGet = await prisma.crm_client.findUnique({
        where: { profile: profile },
        include: {
          crm_clientEducation: {
            select: {
              crm_schools: {
                select: {
                  school_name: true,
                },
              },
              crm_course: {
                select: {
                  course_description: true,
                },
              },
            },
          },
          crm_spouse: true,
          crm_loan_hdr: {
           include:{
            crm_characterReference: true
           }
          },
          crm_workInformation: true,
          crm_clientFamily: true,
          crm_soi: true
        },
      });
  
      if (!profileGet ) {
        throw new NotFoundError('No profile found');
      }
      const flattenedProfile = flattenProfileGet(profileGet);

      res.status(200).json(flattenedProfile );
      console.log("response", flattenedProfile );

  }
  async clientjoinData(req: Request, res: Response): Promise<void> {
    try {
      const allclients = await prisma.crm_client.findMany({
     
        orderBy: {
          id: 'desc',
        },
     select: {
      lastname: true,
      firstname: true,
      middlename: true,
      profile:true,
      createddatetime: true,
      crm_loan_hdr: {
        
        select: {
       crm_branch: {
        select: {
          branch_description:  true
        }
       },
          amountapplied: true,
          crm_products: {
            select: {
              prod_description: true
            }
          }
        }
        
      }
     }
        
      });
      const Clients = allclients.map(ClientData);
  
      console.log("join success", Clients );
      res.status(200).json(Clients);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  // async getTelemarketer(req: Request, res: Response): Promise<void> {
  //   try {
  //     const tele = await prisma.crm_users.findMany({
  //       where: {
  //         SECONDLEVEL: "11",
  //         LEVEL: "1",
  //       },
  //     });
  //     console.log("Fetch success", tele);
  //     res.status(200).json(tele);
  //   } catch (err) {
  //     console.error("Error retrieving fetch:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  async checkclient(req: Request, res: Response): Promise<void> {
    const { firstname, middlename, lastname, suffix , dateOfBirth} = req.body;
    try {
      const client = await prisma.crm_client.findFirst({
        where: {
          firstname: firstname,
          middlename: middlename,
          lastname: lastname,
          suffix: suffix,
          birthday: dateOfBirth
        },
        select: {
          firstname: true,
          middlename: true,
          lastname: true,
          suffix: true,
          birthday: true
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
        civilstatus,
        religion,
        mothersname,
        email,
        createdby,
        verified,
        educ_level,
        educ_school,
        loantype,
        course,
        modeofpayment,
        terms,
        amountapplied,
        productid,
        agentid,
        s_lastname,
        s_firstname,
        s_middlename,
        s_suffix,
        s_birthdate,
        s_gender,
        s_prov_address,
        s_mobile,
        s_telephone,
        s_educLevel,
        s_educCourse,
        s_educSchool,
        charrefTwo_name,
        charrefTwo_address,
        charrefTwo_contactno,
        charrefTwo_relationship,
        charrefTwo_verified,
        charrefThree_name,
        charrefThree_address,
        charrefThree_contactno,
        charrefThree_relationship,
        charrefThree_verified,
        charrefFour_name,
        charrefFour_address,
        charrefFour_contactno,
        charrefFour_relationship,
        charrefFour_verified,
        id_type,
        id_no,
        b_expiry,
        id_expiration,
        socialmedia_account,
        socialmedia_type,
        areacode,
        branchid,
        residence_status,
        perm_address,
        perm_stay, 
        prov_address,
        prov_stay,
        pres_address,
        pres_stay,
        s_age,
        fathername,
        fatherage,
        mothername,
        motherage,
        businesstype,
        businessname,
        industry,
        sssno,
        tinno,
        monthlyincome,
        w_status,
        areaid,
        position,
        job_level,
        businesno,
        personal_loan,
        charref_name,
        charref_address,
        charref_contactno,
        charref_relationship,
        charref_verified,
        prevamount,
        previouspn,
        paymenthistory,
        SDFullname,
        SDAge,
        sourcetype,
        businessType,
        businessName,
        businessNumber,
        workPosition,
        tin,
        workStatus,
        acode

      } = req.body;
  
      const profile = generateProfile();
      const loan_profile = generateloanProfileId();
      const spouseprofile = generateProfile();


      const [createClient, loans] = await prisma.$transaction([
        prisma.crm_client.create({
          data: {
            profile,
            lastname,
            firstname,
            middlename,
            suffix,
            birthday: birthday ?? '',
            age,
            gender,
            mobile,
            telephone,
            acode,
            residence_status,
            perm_address,
            perm_stay,
            prov_address,
            prov_stay,
            civilstatus,
            religion,
            email,
            area: areacode,
            mothersname: mothersname ?? "",
            createdby: createdby ?? "",
            createddatetime: new Date(),
            crm_clientEducation: {
              create: {
                educ_level,
                educ_school,
                course,
              },
            },
            crm_spouse: {
              create: {
                spouseprofile : spouseprofile ?? '',
                s_lastname: s_lastname ?? "",
                s_firstname: s_firstname ?? '',
                s_middlename: s_middlename ?? '',
                s_suffix : s_suffix ?? '',
                s_birthdate  : s_birthdate ?? '',
                s_gender: s_gender ?? '',
                s_address: s_prov_address ?? '',
                s_mobile: s_mobile ?? '',
                s_telephone: s_telephone ?? '',
                s_provaddress: s_prov_address,
                s_age: s_age,
                crm_spouseEducation: {
                  create: {
                    s_educLevel: s_educLevel ?? '',
                    s_educCourse: s_educCourse ?? '',
                    s_educSchool: s_educSchool ?? '',
                  },
                },
                
              },
            },
            crm_clientFamily: {
              createMany: {
                data: [
                  {
                    family_relationship:  '0' ,
                    family_membername: fathername ,
                    family_age:fatherage , 
                    // family_verified: family_verified ?? '',
                  },
                  {
                    family_relationship:  "1",
                    family_membername: mothername ,
                    family_age: motherage,
                    // family_verified: family_verified1 ?? '',
                  },

                  {
                    family_relationship:  "2",
                    family_membername: SDFullname ,
                    family_age: SDAge,
                    // family_verified: family_verified1 ?? '',
                  },

                  {
                    family_relationship:  "3",
                    family_membername: SDFullname ?? '',
                    family_age: SDAge,
                    // family_verified: family_verified1 ?? '',
                  },
                
                ],
              }
            },
            crm_clientId: {
              create: {
                id_type: id_type,
                id_no,
                b_expiry,
                id_expiration,
                verified,
                createdby: createdby ?? '',
                createddatetime: new Date(),
              },
            },
           crm_clientSocials: {
            create: {
              socialmedia_account,
              socialmedia_type,
            }
           },
        
        
          
        },
        }),
        prisma.crm_loan_hdr.create({ 
          data: {
            profile,
            loanprofile : loan_profile,
            personal_loan,
            loantype,
            terms,
            prevamount,
            previouspn,
            paymenthistory,
            pres_address,
            pres_stay,
            modeofpayment,
            amountapplied,
            productid: productid,
            areaid,
            agentid: agentid,
            branchid,
            createdby,
            createddatetime: new Date(),
            crm_workInformation: {
              create: {
                profile: profile,
                businesstype: businessType,
                businessname: businessName,
                businesno: businessNumber,
                position: workPosition,
                job_level: job_level,
                industry: industry,
                sssno: sssno,
                tinno: tin,
                monthlyincome: monthlyincome,
                status: workStatus,
                verified: true,
                createdby: createdby,
                createddatetime: new Date(),
              }
          },
            crm_characterReference: {
              createMany: {
                data: [
                  {
                    charref_name: charref_name,
                    charref_address: charref_address,
                    charref_contactno: charref_contactno,
                    charref_relationship: charref_relationship,
                    charref_verified: charref_verified,
                    createddatetime: new Date(),
                  },

                  {
                    charref_name: charrefTwo_name,
                    charref_address: charrefTwo_address,
                    charref_contactno: charrefTwo_contactno,
                    charref_relationship: charrefTwo_relationship,
                    charref_verified: charrefTwo_verified,
                    createddatetime: new Date(),
                  },
                  {
                    charref_name: charrefThree_name,
                    charref_address: charrefThree_address,
                    charref_contactno: charrefThree_contactno,
                    charref_relationship: charrefThree_relationship,
                    charref_verified: charrefThree_verified ,
                    createddatetime: new Date(),
                  },
                  {
                    charref_name: charrefFour_name,
                    charref_address: charrefFour_address,
                    charref_contactno: charrefFour_contactno,
                    charref_relationship: charrefFour_relationship,
                    charref_verified: charrefFour_verified ,
                    createddatetime: new Date(),
                  },
                ],
              },

            },
          }
        }),
      ]);

   
      res.status(201).json({
        message: "Client created successfully",
        loans,
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

}

export default new ClientController();
