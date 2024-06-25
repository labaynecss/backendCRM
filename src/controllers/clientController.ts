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
          crm_allottee: {},
          crm_clientEducation: true,
          crm_clientId: true,
          crm_spouse: true,
        crm_loan_hdr: true
      

        },
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
        select: {
          createdby: true,
          crm_allottee: true,
          crm_clientEducation: true,
          crm_clientId: true,
          crm_spouse: true,
          crm_loan_hdr: {
            select: {
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
  
      // // Transforming nested data into a flattened structure
      // const flattenedClients = allclients.map(client => ({
      //   ...client,
      //   crm_loan_hdr: client.crm_loan_hdr.map(loan => ({
      //     loanId: loan.id,
      //     productId: loan.productid,
      //     productDescription: loan.crm_products?.prod_description
      //   }))
      // }));
  
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
        charref_name,
        charref_address,
        charref_contactno,
        charref_verified,
        charref_relationship,
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
        family_relationship,
        family_birthdate,
        family_membername,
        family_status,
        family_remarks,
        family_verified,
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
                s_birthdate: s_birthdate ?? new Date,
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
              create: {
                family_relationship: family_relationship ?? '',
                family_membername: family_membername ?? '',
                family_birthdate: family_birthdate ?? new Date(),
                family_status: family_status ?? '',
                family_remarks: family_remarks ?? '',
                family_verified: family_verified ?? false,
              },
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
            crm_assets: {
              create: {
                assetid,
                assetremarks,
                totalfair_marketvalue,
              },
            },
            crm_allottee: {
              create: {
                profile,
                allottee_address,
                allottee_contactnumber,
                allottee_principalemployer,
                allottee_agency,
                allottee_netsalaryincome,
                verified,
                createdby,
                createddatetime: new Date(),
              },
            },
            crm_characterReference: {
              create: {
                charref_name,
                charref_address,
                charref_contactno,
                charref_relationship,
                charref_verified,
                createdby,
                createddatetime: new Date(),
              },
            },
            crm_soiBusiness: {
              create: {
                business_name,
                business_nature,
                business_address,
                business_contact,
                net_income,
              },
            },
            crm_soiEmployment: {
           
                create: {
                 
                  employer_company ,
                  employer_nature,
                  employer_address,
                  employer_contact,
                  net_salaryincome,
                },
            },
            crm_bankAccount: {
              create: {
                bankname,
                b_telno,
                accountname,
                accountno,
                dateopened: dateopened ,
                handling,
                monthlycredit_month1,
                monthlycredit_month2,
                monthlycredit_month3,
                monthlycredit_value1,
                monthlycredit_value2,
                monthlycredit_value3,
                
                createdby,
                createddatetime: new Date(),
              },
            },
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
