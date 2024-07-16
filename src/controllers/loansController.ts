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

  async BorrowerInformation(req: Request, res: Response): Promise<void> {
  
  
    try {
      const {
        profile , 
        loanprofile,
        lastname,
        firstname,
        middlename,
        suffix,
        birthday,
        age,
        gender,
        civilstatus,
        religion,
        email,
        mobile,
        telephone,
        socialmedia_account,
        socialmedia_type,
        educ_level,
        educ_school,
        course,
        fathername,
        fatherage,
        mothername,
        motherage,
        SDFullname,
        SDAge,
        id_type,
        id_no,
        b_expiry,
        id_expiration,
        verified,
        updatedby,
        sssno,
        tinno,
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
        s_provaddress,
        spouseprofile,
        s_educLevel,
        s_educSchool,
        s_educCourse,
        course_id,
        school_id
      } = req.body;
  
      const logData: any = {
        profile,
        loanprofile,
        requestBody: req.body,
        borrowerUpdate: null,
        workInfoUpsert: null,
        spouseUpsert: null,
        socialMediaUpdate: null,
        clientIdUpdate: null,
        validCourse: null,
        validSchool: null,
        educationUpdate: null,
        familyUpdates: {
          fatherUpdate: null,
          motherUpdate: null,
          siblingUpdate: null,
          otherUpdate: null,
        }
      };
  
      // Update borrower details
      logData.borrowerUpdate = await prisma.crm_client.update({
        where: { profile },
        data: {
          lastname,
          firstname,
          middlename,
          suffix,
          birthday,
          age,
          gender,
          religion,
          email,
          civilstatus,
          mobile,
          telephone,
        },
      });
  
      logData.workInfoUpsert = await prisma.crm_workInformation.upsert({
        where: { profile, loanprofile },
        update: { sssno, tinno },
        create: { profile, loanprofile, sssno, tinno },
      });
  
      logData.spouseUpsert = await prisma.crm_spouse.upsert({
        where: { spouseprofile: spouseprofile ?? "" },
        update: {
          ...(s_lastname && { s_lastname }),
          ...(s_firstname && { s_firstname }),
          ...(s_middlename && { s_middlename }),
          ...(s_suffix && { s_suffix }),
          ...(s_birthdate && { s_birthdate }),
          ...(s_gender && { s_gender }),
          ...(s_address && { s_address }),
          ...(s_mobile && { s_mobile }),
          ...(s_telephone && { s_telephone }),
          ...(s_age && { s_age }),
          ...(s_provaddress && { s_provaddress }),
          crm_spouseEducation: {
            update: {
              ...(s_educLevel && { s_educLevel }),
              ...(s_educSchool && { s_educSchool }),
              ...(s_educCourse && { s_educCourse }),
            },
          },
        },
        create: {
          spouseprofile: spouseprofile ?? "",
          profile,
          ...(s_lastname && { s_lastname }),
          ...(s_firstname && { s_firstname }),
          ...(s_middlename && { s_middlename }),
          ...(s_suffix && { s_suffix }),
          ...(s_birthdate && { s_birthdate }),
          ...(s_gender && { s_gender }),
          ...(s_address && { s_address }),
          ...(s_mobile && { s_mobile }),
          ...(s_telephone && { s_telephone }),
          ...(s_age && { s_age }),
          ...(s_provaddress && { s_provaddress }),
          crm_spouseEducation: {
            create: {
              s_educLevel: s_educLevel ?? '',
              s_educSchool: s_educSchool ?? '',
              s_educCourse: s_educCourse ?? '',
            },
          },
        },
      });
  
      // Update social media details
      logData.socialMediaUpdate = await prisma.crm_clientSocials.update({
        where: { profile },
        data: {
          socialmedia_account,
          socialmedia_type,
        },
      });
  
      logData.clientIdUpdate = await prisma.crm_clientId.update({
        where: { profile },
        data: {
          id_type,
          id_no,
          b_expiry,
          id_expiration,
          verified,
          updatedby,
          updateddatetime: new Date(),
        },
      });
  
      logData.validCourse = await prisma.crm_course.findUnique({ where: { course_id } });
      logData.validSchool = await prisma.crm_schools.findUnique({ where: { school_id } });
  
      if (logData.validCourse && logData.validSchool) {
        logData.educationUpdate = await prisma.crm_clientEducation.update({
          where: { profile },
          data: {
            educ_level,
            educ_school: logData.validSchool.school_id,
            course: logData.validCourse.course_id,
          },
        });
      } else {
        if (!logData.validCourse) {
          throw new Error(`Course with ID ${course_id} does not exist in the related table.`);
        }
       
      }
  
      // Update family details
      logData.familyUpdates.fatherUpdate = await prisma.crm_clientFamily.updateMany({
        where: {
          profile: profile,
          family_relationship: "0",
        },
        data: {
          family_membername: fathername,
          family_age: fatherage,
        },
      });
  
      logData.familyUpdates.motherUpdate = await prisma.crm_clientFamily.updateMany({
        where: {
          profile: profile,
          family_relationship: "1",
        },
        data: {
          family_membername: mothername,
          family_age: motherage,
        },
      });
  
      logData.familyUpdates.siblingUpdate = await prisma.crm_clientFamily.updateMany({
        where: {
          profile: profile,
          family_relationship: "2",
        },
        data: {
          family_membername: SDFullname,
          family_age: SDAge,
        },
      });
  
      logData.familyUpdates.otherUpdate = await prisma.crm_clientFamily.updateMany({
        where: {
          profile: profile,
          family_relationship: "3",
        },
        data: {
          family_membername: SDFullname,
          family_age: SDAge,
        },
      });
  
      console.log("All Data:", logData);
  
      res.status(200).json({ message: 'Personal details updated successfully' });
    } catch (error) {
      console.error("Error updating personal details:", error);
      res.status(500).json({ error: 'An error occurred while updating personal details' });
    }
  }

  async LoanDetails(req: Request, res: Response): Promise<void> {
    const {  loanprofile } = req.params;

    try {
      const { profile,
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
        updatedby,
       } = req.body


       console.log("Request Parameters:", { loanprofile });
       console.log("Request Body:", req.body);
   
       const loanUpdateResult = await prisma.crm_loan_hdr.update({
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
           updatedby,
           updateddatetime: new Date(),
         },
       });
   
       console.log("Loan Update Result:", loanUpdateResult);
   
       res.status(200).json({ message: 'Loan details updated successfully' });
     } catch (err) {
       console.error('Error updating loan details:', err);
       res.status(500).json({ err: 'An error occurred while updating loan details' });
     }
   }

  async SalaryInformation(req: Request, res: Response): Promise<void> {
    const { profile, loanprofile } = req.params;
  try {
    const {
      businesstype,
      businessname,
      businesno,
      job_level,
      industry,
      monthlyincome,
      status,
      verified,
      updatedby,
      amount,
      expense_description,
      colspec_make,
      colspec_yearmodel,
      colspec_bank,
      colspec_plateno,
      colspec_seriesvariant,
      colspec_transmission,
      colspec_enginetype,
      colspec_displacement,
      colspec_seatingcapacity,
      colspec_fueltype,
      colspec_dealername,
      colspec_dealeraddress,
      colspec_contactnumber,
      colspec_remarks,
      colspec_sellingprice,
      colspec_representative,
      colspec_verified,
      id
    } = req.body;

    await prisma.$transaction(async (prisma) => {
      await prisma.crm_workInformation.update({
        where: { loanprofile, id },
        data: {
          profile,
          businesstype,
          businessname,
          businesno,
          job_level,
          industry,
          monthlyincome,
          status,
          verified,
          updatedby,
          updateddatetime: new Date(),
        },
      });

      // Create many crm_monthlycashflow entries
      const cashflowData = expense_description.map((description: any, index: string | number) => ({
        loanprofile,
        expense_description: description,
        expense_amount: amount[index],
      }));

      await prisma.crm_monthlycashflow.createMany({
        data: cashflowData,
      });

      // Create many crm_assetsAuto entries
      const assetsData = colspec_make.map((make: any, index: string | number) => ({
        loanprofile,
        colspec_make: make,
        colspec_yearmodel: colspec_yearmodel[index],
        colspec_bank: colspec_bank[index],
        colspec_plateno: colspec_plateno[index],
        colspec_seriesvariant: colspec_seriesvariant[index],
        colspec_transmission: colspec_transmission[index],
        colspec_enginetype: colspec_enginetype[index],
        colspec_displacement: colspec_displacement[index],
        colspec_seatingcapacity: colspec_seatingcapacity[index],
        colspec_fueltype: colspec_fueltype[index],
        colspec_dealername: colspec_dealername[index],
        colspec_dealeraddress: colspec_dealeraddress[index],
        colspec_contactnumber: colspec_contactnumber[index],
        colspec_remarks: colspec_remarks[index],
        colspec_sellingprice: colspec_sellingprice[index],
        colspec_representative: colspec_representative[index],
        colspec_verified: colspec_verified[index],
      }));

      await prisma.crm_assetsAuto.createMany({
        data: assetsData,
      });
    });
    } catch (error) {
      console.error('Error updating salary information:', error);
      res.status(500).json({ error: 'An error occurred while updating salary information' });
    }
  }


  async EmploymentHistory(req: Request, res: Response): Promise<void> {
    const { loanprofile } = req.params;

    try {
      const {
        profile,
        company_agencyid,
        position,
        inclusive_datestart,
        inclusive_dateend,
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
        charref_name,
        charref_address,
        charref_contactno,
        charref_relationship,
        charref_verified,
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
      } = req.body;
  
      // Create an array of employment history data
      const employmentData = profile.map((prof: any, index: string | number) => ({
        loanprofile,
        profile: prof,
        company_agencyid: company_agencyid[index],
        position: position[index],
        inclusive_datestart: inclusive_datestart[index],
        inclusive_dateend: inclusive_dateend[index],
        updateddatetime: new Date(),
      }));
  
      // Create an array of bank account data
      const bankData = bankname.map((bank: any, index: string | number) => ({
        loanprofile,
        bankname: bank,
        b_telno: b_telno[index],
        accountname: accountname[index],
        accountno: accountno[index],
        dateopened: dateopened[index],
        handling: handling[index],
        monthlycredit_month1: monthlycredit_month1[index],
        monthlycredit_month2: monthlycredit_month2[index],
        monthlycredit_month3: monthlycredit_month3[index],
        monthlycredit_value1: monthlycredit_value1[index],
        monthlycredit_value2: monthlycredit_value2[index],
        monthlycredit_value3: monthlycredit_value3[index],
      }));
      const charRefData = [
        {
          where: { loanprofile, charref_name: charref_name },
          data: {
            charref_address: charref_address,
            charref_contactno: charref_contactno,
            charref_relationship: charref_relationship,
            charref_verified: charref_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: charrefTwo_name },
          data: {
            charref_address: charrefTwo_address,
            charref_contactno: charrefTwo_contactno,
            charref_relationship: charrefTwo_relationship,
            charref_verified: charrefTwo_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: charrefThree_name },
          data: {
            charref_address: charrefThree_address,
            charref_contactno: charrefThree_contactno,
            charref_relationship: charrefThree_relationship,
            charref_verified: charrefThree_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: charrefFour_name },
          data: {
            charref_address: charrefFour_address,
            charref_contactno: charrefFour_contactno,
            charref_relationship: charrefFour_relationship,
            charref_verified: charrefFour_verified,
            updateddatetime: new Date(),
          },
        },
      ];
  
      await prisma.$transaction(async (prisma) => {
        await prisma.crm_employmentHistory.createMany({
          data: employmentData,
        });
  
        await prisma.crm_bankAccount.createMany({
          data: bankData,
        });
  
        for (const charRef of charRefData) {
          await prisma.crm_characterReference.updateMany(charRef);
        }
      });
   
      res.status(200).json({ message: 'Loan details updated successfully' });
    } catch (err) {
      console.error('Error updating salary information:', err);
      res.status(500).json({ error: 'An error occurred while updating salary information' });
    }

  }

  async CoBorrower(req: Request, res: Response): Promise<void> {
    const {  loanprofile } = req.params;

    try {
      const { profile,
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
        updatedby,
       } = req.body


       await prisma.crm_loan_hdr.update({
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
          updatedby,
          updateddatetime: new Date(),
        },
      });
      res.status(200).json({ message: 'Loan details updated successfully' });
    } catch (err) {
      
    }

  }
  

  



}


export default new LoansController();
