import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LoansController {
  async listofLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await prisma.crm_loan_hdr.findMany({
        take: 10,
      });
      console.log("Fetch success", loans);
      res.status(200).json(loans);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productid } = req.body;  
    const { profile } = req.params;
    const updatedLoan = await prisma.crm_loan_hdr.update({
      where: { loanprofile: profile },
      data: {
       productid: productid
      } 
    });
      console.log("Update success", updatedLoan);
      res.status(200) .json(updatedLoan);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateByProfile(req: Request, res: Response): Promise<void> {
    const { loanprofile } = req.params;
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
        areaid,
        mothersname,
        updatedby,
        educ_level,
        educ_school,
        course,
        spouseprofile,
        s_lastname,
        s_firstname,
        s_middlename,
        s_suffix,
        s_birthdate,
        s_gender,
        s_address,
        s_mobile,
        s_telephone,
        s_age,
        s_educLevel,
        s_educCourse,
        s_educSchool,
        fathername,
        fatherage,
        mothername,
        motherage,
        id_type,
        id_no,
        b_expiry,
        id_expiration,
        verified,
        socialmedia_account,
        socialmedia_type,
        businesstype,
        businessname,
        industry,
        sssno,
        tinno,
        position,
        job_level,
        businesno,
        monthlyincome,
        w_status,
        loantype,
        terms,
        pres_address,
        pres_stay,
        modeofpayment,
        amountapplied,
        productid,
        agentid,
        branchid,
        assetid,
        assetremarks,
        totalfair_marketvalue,
        allottee_address,
        allottee_contactnumber,
        allottee_principalemployer,
        allottee_agency,
        allottee_netsalaryincome,
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
        bankname,
        b_telno,
        accountname,
        accountno,
        dateopened,
        handling,
        monthlycredit_month1,
        monthlycredit_month2,
        monthlycredit_month3,
        monthlycredit_value1,
        monthlycredit_value2,
        monthlycredit_value3,
      } = req.body;

      const [updatedClient, updatedLoan] = await prisma.$transaction([
        prisma.crm_client.update({
          where: { profile },
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
            residence_status,
            perm_address,
            perm_stay,
            prov_address,
            prov_stay,
            civilstatus,
            religion,
            email,
            area: areaid,
            mothersname,
            updatedby: updatedby,
            updateddatetime: new Date(),
            crm_clientEducation: {
              updateMany: {
                where: { profile },
                data: {
                  educ_level,
                  educ_school,
                  course,
                },
              },
            },
        crm_spouse: {
update: {
  where: {
    spouseprofile: spouseprofile
  },
  data:{
    s_lastname,
                s_firstname,
                s_middlename,
                s_suffix,
                s_birthdate,
                s_gender,
                s_address,
                s_mobile,
                s_telephone,
                s_age,
                crm_spouseEducation: {
                  update: {
                    where: { spouseprofile: spouseprofile },
                    data: {
                      s_educLevel,
                      s_educCourse,
                      s_educSchool,
                    },
                  },
                }
  }
}
        },
            crm_clientFamily: {
              updateMany: {
                where: { profile },
                data: [
                  {
                    family_relationship: 'Father',
                    family_membername: fathername,
                    family_remarks: `AGE: ${fatherage}`,
                  },
                  {
                    family_relationship: 'Mother',
                    family_membername: mothername,
                    family_remarks: `AGE: ${motherage}`,
                  },
                ],
              },
            
            },
            crm_clientId: {
              updateMany: {
                where: { profile },
                data: {
                  id_type,
                  id_no,
                  b_expiry,
                  id_expiration,
                  verified,
                  updatedby: updatedby,
                  updateddatetime: new Date(),
                },
              },
            },
            crm_clientSocials: {
              updateMany: {
                where: { profile },
                data: {
                  socialmedia_account,
                  socialmedia_type,
                },
              },
            },
            crm_workInformation: {
              updateMany: {
                where: { profile },
                data: {
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
                  verified,
                },
              },
            },
          },
        }),
        prisma.crm_loan_hdr.update({
          where: { loanprofile },
          data: {
            profile,
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
            updatedby: updatedby,
            updateddatetime: new Date(),
            crm_assets: {
              updateMany: {
                where: { profile },
                data: {
                  assetid,
                  assetremarks,
                  totalfair_marketvalue,
                },
              },
            },
            crm_allottee:{
              update: {
            where: { loanprofile },
                data: {
                  profile,
                  allottee_address,
                  allottee_contactnumber,
                  allottee_principalemployer,
                  allottee_agency,
                  allottee_netsalaryincome,
                  verified,
                  updatedby: updatedby,
                  updateddatetime: new Date(),
                }
              }
            },
            crm_characterReference: {
              updateMany: {
                where: { loanprofile },
                data: [
                  {
                    charref_name: charrefTwo_name,
                    charref_address: charrefTwo_address,
                    charref_contactno: charrefTwo_contactno,
                    charref_relationship: charrefTwo_relationship,
                    charref_verified: charrefTwo_verified,
                    updateddatetime: new Date(),
                  },
                  {
                    charref_name: charrefThree_name,
                    charref_address: charrefThree_address,
                    charref_contactno: charrefThree_contactno,
                    charref_relationship: charrefThree_relationship,
                    charref_verified: charrefThree_verified,
                    updateddatetime: new Date(),
                  },
                  {
                    charref_name: charrefFour_name,
                    charref_address: charrefFour_address,
                    charref_contactno: charrefFour_contactno,
                    charref_relationship: charrefFour_relationship,
                    charref_verified: charrefFour_verified,
                    updateddatetime: new Date(),
                  },
                ],
              },
            },
            crm_soiBusiness: {
              update: {
                where: { loanprofile },
                data: {
                  business_name,
                  business_nature,
                  business_address,
                  business_contact,
                  net_income,
                },
              },
            },
            crm_soiEmployment: {
              update: {
                where: { loanprofile },
                data: {
                  employer_company,
                  employer_nature,
                  employer_address,
                  employer_contact,
                  net_salaryincome,
                },
              },
            },
            crm_bankAccount: {
              update: {
                where: { loan_profile: loanprofile },
                data: {
                  bankname,
                  b_telno,
                  accountname,
                  accountno,
                  dateopened,
                  handling,
                  monthlycredit_month1,
                  monthlycredit_month2,
                  monthlycredit_month3,
                  monthlycredit_value1,
                  monthlycredit_value2,
                  monthlycredit_value3,
                  updatedby: updatedby,
                  updateddatetime: new Date(),
                },
              },
            },
          },
        }),
      ]);
      res.status(200).json({
        message: "Client and loan updated successfully",
        updatedClient,
        updatedLoan,
      });

    } catch (err) {
      console.error("Error updating client and loan:", err);
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


export default new LoansController();
