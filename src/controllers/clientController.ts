import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateAssetId, generateProfile } from "../utils/generateProfile";
import { currentTimestamp, isoDate } from "../utils/calcTime"
import { generateloanProfileId } from "../utils/generateLoanProfile";

const prisma = new PrismaClient();

class ClientController {
  async getClientByProfile(req: Request, res: Response): Promise<void> {
    const { profile } = req.params;
  
    try {
      const profileGet = await prisma.crm_client.findUnique({
        where: { profile: profile },
        include: {
          crm_allottee: true,
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
          crm_loan_hdr: true,
          crm_workInformation: true,
        },
      });
  
      if (!profileGet) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }
      const flattenedProfileGet = {
        profile: profileGet.profile,
        lastname: profileGet.lastname,
        firstname: profileGet.firstname,
        middlename: profileGet.middlename,
        crm_allottee: profileGet.crm_allottee,
 
        crm_spouse: profileGet.crm_spouse,
        crm_loan_hdr: profileGet.crm_loan_hdr,
        crm_workInformation: profileGet.crm_workInformation,
        clientEducation: profileGet.crm_clientEducation
          ? {
              school_name: profileGet.crm_clientEducation?.crm_schools?.school_name || null,
              course_description: profileGet.crm_clientEducation?.crm_course?.course_description || null,
            }
          : null,
      };
  
      res.status(200).json(flattenedProfileGet);
      console.log("response", flattenedProfileGet);
    } catch (err) {
      console.error("Error retrieving profile:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
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


 const Clients = allclients.map(client => {

  const loan = client.crm_loan_hdr[0] || {
    amountapplied: null,
    crm_products: { prod_description: null },
    crm_branch: { branch_description: null },
  };
  return {
    profile: client.profile,
    lastname: client.lastname,
    firstname: client.firstname,
    middlename: client.middlename,
    branch_description: loan.crm_branch ? loan.crm_branch.branch_description : null,
    createddatetime: client.createddatetime,
    amountapplied: loan.amountapplied,
    prod_description: loan.crm_products ? loan.crm_products.prod_description : null,
    
  };
});
  
      console.log("join success", Clients );
      res.status(200).json(Clients);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  async getTelemarketer(req: Request, res: Response): Promise<void> {
    try {
      const tele = await prisma.crm_users.findMany({
        where: {
          SECONDLEVEL: "11",
          LEVEL: "1",
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
        totalfair_marketvalue,
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
        s_lastname,
        s_firstname,
        s_middlename,
        s_suffix,
        s_birthdate,
        s_gender,
        s_address,
        s_mobile,
        s_telephone,
        s_educLevel,
        s_educCourse,
        s_educSchool,
        b_telno,
        accountname,
        accountno,
        dateopened,
        handling,
        monthlycredit_month2,
        monthlycredit_month1,
        monthlycredit_month3,
        monthlycredit_value1,
        monthlycredit_value3,
        monthlycredit_value2,
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
        bankname,
        id_no,
        assetremarks, 
        b_expiry,
        id_expiration,
        socialmedia_account,
        socialmedia_type,
        area,
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
        family_verified,
        family_verified1,
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


      } = req.body;
  
      const profile = generateProfile();
      const loanprofile = generateloanProfileId();
      const spouseprofile = generateProfile();
      const assetid = generateAssetId()

      const [createClient, loans] = await prisma.$transaction([
        prisma.crm_client.create({
          data: {
            profile,
            lastname,
            firstname,
            middlename: middlename ?? "",
            suffix,
            birthday: birthday ?? '',
            age,
            gender,
            mobile,
            telephone,
            residence_status,
            perm_address,
            perm_stay,
            prov_address,
            prov_stay,
            civilstatus,
            religion,
            email,
            area: areaid,
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
                s_birthdate: s_birthdate ?? '',
                s_gender: s_gender ?? '',
                s_address: s_address ?? '',
                s_mobile: s_mobile ?? '',
                s_telephone: s_telephone ?? '',
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
                    family_relationship:  'Father' ,
                    family_membername: fathername ?? '' ,
                    family_remarks:`AGE: ${fatherage}` , 
                    // family_verified: family_verified ?? '',
                  },
                  {
                    family_relationship:  "Mother",
                    family_membername: mothername ?? '',
                    family_remarks: `AGE: ${motherage}`,
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
           crm_workInformation: {
            create: {
              businesstype,
              businessname,
              industry,
              sssno,
              tinno,
              position,
              job_level,
              businesno,
              monthlyincome,
              status: w_status,
              verified

            }
           },
          },
        }),
        prisma.crm_loan_hdr.create({
          data: {
            profile,
            loanprofile,
            loantype,
            terms,
            pres_address,
            pres_stay,
            modeofpayment,
            amountapplied,
            productid,
            areaid,
            agentid,
            branchid,
            createdby,
            createddatetime: new Date(),
            // crm_assets: {
            //   create: {
            //     assetid,
            //     assetremarks,
            //     totalfair_marketvalue,
            //   },
            // },
            // crm_allottee: {
            //   create: {
            //     profile,
            //     allottee_address,
            //     allottee_contactnumber,
            //     allottee_principalemployer,
            //     allottee_agency,
            //     allottee_netsalaryincome,
            //     verified,
            //     createdby,
            //     createddatetime: new Date(),
            //   },
            // },
            crm_characterReference: {
              createMany: {
                data: [
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
            // crm_soiBusiness: {
            //   create: {
            //     business_name,
            //     business_nature,
            //     business_address,
            //     business_contact,
            //     net_income,
            //   },
            // },
            // crm_soiEmployment: {
            //     create: {
            //       employer_company ,
            //       employer_nature,
            //       employer_address,
            //       employer_contact,
            //       net_salaryincome,
            //     },
            // },
            // crm_bankAccount: {
            //   create: {
            //     bankname,
            //     b_telno,
            //     accountname,
            //     accountno,
            //     dateopened: dateopened ,
            //     handling,
            //     monthlycredit_month1,
            //     monthlycredit_month2,
            //     monthlycredit_month3,
            //     monthlycredit_value1,
            //     monthlycredit_value2,
            //     monthlycredit_value3,
            //     createdby,
            //     createddatetime: new Date(),
            //   },
            // },
          },
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
