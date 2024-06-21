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
    const { profile, loanprofile } = req.params;
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
        area,
        civilstatus,
        religion,
        mothersname,
        email,
        updatedby,
        assetremarks,
        educ_level,
        totalfair_marketvalue,
        educ_school,
        course,
        id_type,
        id_no,
        b_expiry,
        id_expiration,
        s_lastname,
        verified,
        s_firstname,
        s_middlename,
        s_suffix,
        s_birthdate,
        s_gender,
        s_address,
        s_mobile,
        s_telephone,
        loantype,
        terms,
        amountapplied,
        modeofpayment,
        productid,
        agentid,
        business_name,
        business_nature,
        business_address,
        business_contact,
        net_income,
        branchid
      } = req.body;

      let existingClient = await prisma.crm_client.findUnique({
        where: { profile: profile },
      });

      if (!existingClient) {
        res.status(404).json({ message: "Existing client not found" });
      }

      let existingProduct = await prisma.crm_products.findUnique({
        where: { productid: productid }
      });

      if (!existingProduct) {
         res.status(404).json({ message: "Existing product not found" });
      }
      const updateClient = await prisma.crm_client.update({
        where: { profile: profile },
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
          area,
          civilstatus,
          religion,
          email,
          mothersname,
          updatedby: updatedby ?? "",
          updateddatetime: new Date(),
          crm_assets: {
            updateMany: {
              where: { profile: profile },
              data: {
                assetremarks,
                totalfair_marketvalue
              },
            },
          },
          crm_clientEducation: {
            updateMany: {
              where: { profile: profile },
              data: {
                educ_level,
                educ_school,
                course,
              },
            },
          },
          crm_clientId: {
            updateMany: {
              where: { profile: profile },
              data: {
                id_type,
                id_no,
                b_expiry,
                id_expiration,
                verified,
                updatedby: updatedby ?? "",
                updateddatetime: new Date(),
              },
            },
          },
          crm_spouse: {
            updateMany: {
              where: { profile: profile },
              data: {
                s_lastname,
                s_firstname,
                s_middlename,
                s_suffix,
                s_birthdate,
                s_gender: s_gender,
                s_address: s_address,
                s_mobile: s_mobile,
                s_telephone: s_telephone,
              },
            },
          },
        },
      });
      await prisma.crm_loan_hdr.update({
        where: { loanprofile: loanprofile },
        data: {
          loantype,
          terms,
          modeofpayment,
          amountapplied,
          agentid,
          branchid,
          crm_soiBusiness: {
            updateMany: {
              where: { profile: profile },
              data: {
                business_name,
                business_nature,
                business_address,
                business_contact,
                net_income,
              },
            },
          }
        }
      });

      res.status(200).json({
        message: "Client and loan updated successfully",
        updateClient,
      });

      console.log("Update data successful", updateClient);
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
