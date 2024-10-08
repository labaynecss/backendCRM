import { Request, Response } from "express";
import { crm_assetAutoInspection, Prisma, PrismaClient } from "@prisma/client";
import { generateSoiId } from "../utils/generateSoi";
import { generateAssets } from "../utils/generateAssets";

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
      const { productid, sourcetype } = req.body;
      const { profile } = req.params;
      const soi_id = generateSoiId(sourcetype);

      const updatedLoan = await prisma.crm_loan_hdr.update({
        where: { loanprofile: profile },
        data: {
          productid: productid,
        },
      });
      const loanRecord = await prisma.crm_loan_hdr.findUnique({
        where: { loanprofile: profile },
        select: { profile: true },
      });

      if (!loanRecord) {
        res.status(404).json({ error: "Loan profile not found" });
        return;
      }

      const profileFromLoan = loanRecord.profile;

      // Create a new record in crm_soi
      await prisma.crm_soi.create({
        data: {
          profile: profileFromLoan,
          soiid: soi_id,
          sourcetype,
        },
      });
      console.log("Update success", updatedLoan);
      res.status(200).json(updatedLoan);
    } catch (err) {
      console.error("Error retrieving loans:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async BorrowerInformation(req: Request, res: Response): Promise<void> {
    try {
      const {
        profile,
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
        facebook,
        viber,
        educ_level,
        educ_school,
        course,
        fathername,
        fatherage,
        mothername,
        motherage,
        siblings,
        id_type,
        id_no,
        b_expiry,
        id_expiration,
        verified,
        updatedby,
        sssNo,
        TIN,
        spouseLastName,
        spouseFirstName,
        spouseMiddleName,
        spouseSuffix,
        spouseDateOfBirth,
        spouseGender,
        spouseAddress,
        spousePhoneNumber,
        spouseTelephone,
        s_age,
        s_provaddress,
        spouseprofile,
        spouseEducationLevel,
        spouseSchool,
        spouseCourse,
        pres_address,
        pres_stay,
        perm_brgycode,
        perm_address,
        perm_stay,
        prov_address,
        prov_stay,
        course_id,
      } = req.body;

      console.log("data", req.body);

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
        },
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
          perm_address,
          perm_stay,
          prov_stay,
          prov_address,
          perm_brgycode,
        },
      });

      logData.workInfoUpsert = await prisma.crm_workInformation.upsert({
        where: { loanprofile },
        update: { sssno: sssNo, tinno: TIN },
        create: { profile, loanprofile, sssno: sssNo, tinno: TIN },
      });

      logData.spouseUpsert = await prisma.crm_spouse.upsert({
        where: { spouseprofile: spouseprofile ?? "" },
        update: {
          ...(spouseLastName && { s_lastname: spouseLastName }),
          ...(spouseFirstName && { s_firstname: spouseFirstName }),
          ...(spouseMiddleName && { s_middlename: spouseMiddleName }),
          ...(spouseSuffix && { s_suffix: spouseSuffix }),
          ...(spouseDateOfBirth && { s_birthdate: spouseDateOfBirth }),
          ...(spouseGender && { s_gender: spouseGender }),
          ...(spouseAddress && { s_address: spouseAddress }),
          ...(spousePhoneNumber && { s_mobile: spousePhoneNumber }),
          ...(spouseTelephone && { s_telephone: spouseTelephone }),
          ...(s_age && { s_age }),
          ...(s_provaddress && { s_provaddress }),
          crm_spouseEducation: {
            update: {
              ...(spouseEducationLevel && {
                s_educLevel: spouseEducationLevel,
              }),
              ...(spouseSchool && { s_educSchool: spouseSchool }),
              ...(spouseCourse && { s_educCourse: spouseCourse }),
            },
          },
        },
        create: {
          spouseprofile: spouseprofile ?? "",
          profile,
          ...(spouseLastName && { s_lastname: spouseLastName }),
          ...(spouseFirstName && { s_firstname: spouseFirstName }),
          ...(spouseMiddleName && { s_middlename: spouseMiddleName }),
          ...(spouseSuffix && { s_suffix: spouseSuffix }),
          ...(spouseDateOfBirth && { s_birthdate: spouseDateOfBirth }),
          ...(spouseGender && { s_gender: spouseGender }),
          ...(spouseAddress && { s_address: spouseAddress }),
          ...(spousePhoneNumber && { s_mobile: spousePhoneNumber }),
          ...(spouseTelephone && { s_telephone: spouseTelephone }),
          ...(s_age && { s_age }),
          ...(s_provaddress && { s_provaddress }),
          crm_spouseEducation: {
            create: {
              s_educLevel: spouseEducationLevel ?? "",
              s_educSchool: spouseSchool ?? "",
              s_educCourse: spouseCourse ?? "",
            },
          },
        },
      });

      logData.socialMediaUpdate = await prisma.$transaction([
        prisma.crm_clientSocials.upsert({
          where: {
            profile,
          },
          update: {
            socialmedia_account: facebook,
            socialmedia_type: "Facebook",
          },
          create: {
            profile: profile,
            socialmedia_account: facebook,
            socialmedia_type: "Facebook",
          },
        }),
        prisma.crm_clientSocials.upsert({
          where: {
            profile,
          },
          update: {
            socialmedia_account: viber,
            socialmedia_type: "Viber",
          },
          create: {
            profile: profile,
            socialmedia_account: viber,
            socialmedia_type: "Viber",
          },
        }),
      ]);

      logData.LoanDataUpdate = await prisma.crm_loan_hdr.update({
        where: { loanprofile },
        data: {
          pres_address,
          pres_stay,
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

      logData.educationUpdate = await prisma.crm_clientEducation.update({
        where: { profile },
        data: {
          educ_level,
          educ_school: educ_school,
          course: course_id,
        },
      });

      // Update family details
      logData.familyUpdates.fatherUpdate =
        await prisma.crm_clientFamily.updateMany({
          where: {
            profile: profile,
            family_relationship: "0",
          },
          data: {
            family_membername: fathername,
            family_age: fatherage,
          },
        });

      logData.familyUpdates.motherUpdate =
        await prisma.crm_clientFamily.updateMany({
          where: {
            profile: profile,
            family_relationship: "1",
          },
          data: {
            family_membername: mothername,
            family_age: motherage,
          },
        });

      if (Array.isArray(siblings) && siblings.length) {
        for (const sibling of siblings) {
          const updateResult = await prisma.crm_clientFamily.updateMany({
            where: {
              profile: profile,
              family_relationship: "2",
              family_membername: sibling.SDFullname,
            },
            data: {
              family_membername: sibling.SDFullname,
              family_age: sibling.SDAge,
              family_relationship: sibling.SDtypes,
              family_remarks: sibling.SDschool,
            },
          });

          // Log each update result
          logData.familyUpdates.siblingUpdates.push(updateResult);
        }
      } else {
        console.log("No siblings data provided or empty array.");
      }

      res
        .status(200)
        .json({ message: "Personal details updated successfully" });
    } catch (error) {
      console.error("Error updating personal details:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating personal details" });
    }
  }

  async LoanDetails(req: Request, res: Response): Promise<void> {
    try {
      const {
        profile,
        loanprofile,
        branchid,
        creditInvetigator,
        manager,
        agentid,
        agentTwo, // no data in database
        loanType,
        previousAmount,
        prevpn,
        paymentHistory,
        amountapplied,
        terms,
        loanpurpose,
        recommendationAO,
        crdRemarks,
        crecomRemarks,
        agentType,

        updateby,
      } = req.body;

      console.log("Request Parameters:", { loanprofile });
      console.log("Request Body:", req.body);

      const loanUpdateResult = await prisma.crm_loan_hdr.update({
        where: { loanprofile },
        data: {
          profile,
          loantype: loanType,
          terms,
          previouspn: prevpn,
          prevamount: previousAmount,
          amountapplied,
          paymenthistory: paymentHistory,
          agentid,
          branchid,
          agent_type: agentType,
          updatedby: updateby,
          updateddatetime: new Date(), // Add the missing comma here
        },
      });

      console.log("Loan Update Result:", loanUpdateResult);

      res.status(200).json({ message: "Loan details updated successfully" });
    } catch (err) {
      console.error("Error updating loan details:", err);
      res
        .status(500)
        .json({ err: "An error occurred while updating loan details" });
    }
  }

  async SalaryInformation(req: Request, res: Response): Promise<void> {
    try {
      const {
        profile,
        loanprofile,
        businesstype,
        businessname,
        businesno,
        job_level,
        industry,
        monthlyincome,
        verified,
        updatedby,
        amount,
        expense_description,
        ofw_principalemployer,
        ofw_agency,
        ofw_address,
        ofw_contactnumber,
        ofw_netsalaryincome,
        business_nature,
        business_name,
        business_address,
        business_contact,
        allottee_principalemployer,
        allottee_agency,
        allottee_address,
        allottee_contactnumber,
        allottee_netsalaryincome,
        employer,
        employmentStatus,
        workJoblevel,
        workPosition,
        companyRank,
        contactNo,
        businessAddress,
        existence,
        department,
        yearsEmployed,
        salaryHead,
        gross,
        net,
        soiid,
        assettype,
        make,
        yearModel,
        usedClassification,
        monthlySalary,
        otherIncome,
        autoCar,
        roadTestRemarks,
        sourceType,
        variant,
      } = req.body;

      const assetid = generateAssets();

      const soi = await prisma.crm_soi.findFirst({
        where: { loanprofile },
        select: { sourcetype: true },
      });

      await prisma.$transaction(async (prisma) => {
        await prisma.crm_workInformation.update({
          where: {
            loanprofile,
          },
          data: {
            status: employmentStatus,
            job_level: workJoblevel,
          },
        });

        if (soi?.sourcetype === "OFW") {
          await prisma.crm_soiOfw.createMany({
            data: [
              {
                soiid,
                loanprofile,
                profile,
                ofw_principalemployer,
                ofw_agency,
                ofw_address,
                ofw_contactnumber,
                ofw_netsalaryincome,
              },
            ],
          });
        } else if (soi?.sourcetype === "Business") {
          await prisma.crm_soiBusiness.createMany({
            data: [
              {
                soiid,
                loanprofile,
                business_nature,
                business_name,
                business_address,
                business_contact,
              },
            ],
          });
        } else if (soi?.sourcetype === "Employment") {
          await prisma.crm_soiEmployment.upsert({
            where: {
              soiid: soiid,
            },
            update: {
              profile: profile,
              loanprofile,
              employer_name: employer,
              employer_contact: contactNo,
              employer_position: workPosition,
              existence: existence,
              department: department,
              years_employed: yearsEmployed,
              gross_salary: gross,
              net_salaryincome: net,
              company_rank: companyRank,
              employer_address: businessAddress,
              salary_head: salaryHead,
            },
            create: {
              soiid,
              profile,
              loanprofile,
              employer_name: employer,
              employer_contact: contactNo,
              employer_position: workPosition,
              existence: existence,
              department: department,
              years_employed: yearsEmployed,
              gross_salary: gross,
              net_salaryincome: net,
              company_rank: companyRank,
              employer_address: businessAddress,
              salary_head: salaryHead,
            },
          });
        } else if (soi?.sourcetype === "Allottee") {
          await prisma.crm_soiAllottee.createMany({
            data: [
              {
                soiid,
                loanprofile,
                allottee_principalemployer,
                allottee_agency,
                allottee_address,
                allottee_contactnumber,
                allottee_netsalaryincome,
                updatedby,
                updateddatetime: new Date(),
              },
            ],
          });
        }

        //Check if expense_description and amount are defined before mapping
        if (expense_description && amount) {
          const cashflowData = expense_description.map(
            (description: any, index: string | number) => ({
              loanprofile,
              expense_description: description,
              expense_amount: amount[index],
            })
          );

          await prisma.crm_monthlycashflow.createMany({
            data: cashflowData,
          });
        }

        for (const car of autoCar) {
          const assetId = generateAssets();
          await prisma.crm_assets.create({
            data: {
              assetid: assetId,
              profile,
              assettype,
              auto_make: car.make,
              auto_yearmodel: car.yearModel,
              auto_series: car.variant,
              auto_remarks: car.roadTestRemarks,
              crm_assetsAuto: {
                create: {
                  loanprofile: loanprofile,
                  mvFileNo: car.mvFileNo,
                  aquiredCar: car.aquiredCar,
                  conductionSticker: car.conductionSticker,
                  wheelClass: car.wheelClass,
                  classification: car.classification,
                  chasisNo: car.chasisNo,
                  yearAquired: car.yearAcquired,
                  engineNo: car.engineNo,
                  goodsLoaded: car.goodsLoaded,
                  loadedWeight: car.loadedWeight,
                  color: car.color,
                  plateNo: car.plateNo,
                  registeredLTO: car.registerLTO,
                  transmissionFuel: car.transmissionFuel,
                  airConditioned: car.aircondition,
                  powerWindow: car.powerWindow,
                  powerLock: car.powerLock,
                  powerSteering: car.powerSteering,
                  powerSideMirror: car.powerSideMirror,
                  fourWheelDrive: car.fourWheelDrive,
                  remarks: car.remarks,
                  dealer_name: car.dealername,
                  dealer_address: car.address,
                  dealer_contactno: car.Contactno,
                  electricalCondition: car.electricalCondition,
                  bodyCondition: car.bodyCondition,
                  createddatetime: new Date(),
                  updatedby,
                  updateddatetime: new Date(),
                  crm_assetAutoInspection: {
                    create: {
                      reference: car.reference,
                      loanprofile: loanprofile,
                      engineCondition: car.engineCondition,
                      percentage: parseFloat(car.percentage),
                      ao: car.ao,
                      ao_valuation: car.aoValuation,
                      crecom_valuation: parseFloat(car.crecomValuation),
                      crecom: car.crecom,
                      useType: car.useType,
                      mileage: parseFloat(car.mileage),
                      remarks: car.remarks,
                      agreedPrice: parseFloat(car.agreedPrice),
                      loanableAmount: parseFloat(car.loanableAmount),
                    },
                  },
                },
              },
            },
          });
        }
      });
      //Monthly Income
      await prisma.crm_soi.update({
        where: {
          soiid,
        },
        data: {
          loanprofile,
          monthlyincome: monthlySalary,
          sourcetype: sourceType,
        },
      });

      res
        .status(200)
        .json({ message: "Salary information updated successfully" });
    } catch (error) {
      console.error("Error updating salary information:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating salary information" });
    }
  }

  async EmploymentHistory(req: Request, res: Response): Promise<void> {
    const { loanprofile } = req.params;

    try {
      const { employmentHistory, bankAccount, profile, loanprofile } = req.body;

      // Validate that employmentHistory and bankAccount are arrays
      if (!Array.isArray(employmentHistory)) {
        throw new Error(
          "Invalid input data: Expected array for employmentHistory"
        );
      }

      // Safely process employment history data
      const employmentData = employmentHistory.map((item) => ({
        loanprofile: loanprofile,
        profile: profile,
        company_agencyid: item.company || "",
        position: item.position || "",
        inclusive_datestart: item.startDate || "",
        inclusive_dateend: item.endDate || "",
        updateddatetime: new Date(),
      }));

      // Validate that bankAccount is an array if it exists
      const bankData = Array.isArray(bankAccount)
        ? bankAccount.map((item) => ({
            loan_profile: loanprofile,
            bankname: item.bankBranch || "",
            b_telno: item.bankTel || "",
            accountname: item.acctName || "",
            accountno: item.acctTypeAndNo || "",
            dateopened: item.dateOpened || "",
            handling: item.handling || "",
            monthlycredit_month1: item.monthlyCredits?.[0]?.month || "",
            monthlycredit_month2: item.monthlyCredits?.[1]?.month || "",
            monthlycredit_month3: item.monthlyCredits?.[2]?.month || "",
            monthlycredit_value1: item.monthlyCredits?.[0]?.credits || "",
            monthlycredit_value2: item.monthlyCredits?.[1]?.credits || "",
            monthlycredit_value3: item.monthlyCredits?.[2]?.credits || "",
          }))
        : [];
      const charRefData = [
        {
          where: { loanprofile, charref_name: req.body.charref_name },
          data: {
            charref_address: req.body.charref_address,
            charref_contactno: req.body.charref_contactno,
            charref_relationship: req.body.charref_relationship,
            charref_verified: req.body.charref_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: req.body.charrefTwo_name },
          data: {
            charref_address: req.body.charrefTwo_address,
            charref_contactno: req.body.charrefTwo_contactno,
            charref_relationship: req.body.charrefTwo_relationship,
            charref_verified: req.body.charrefTwo_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: req.body.charrefThree_name },
          data: {
            charref_address: req.body.charrefThree_address,
            charref_contactno: req.body.charrefThree_contactno,
            charref_relationship: req.body.charrefThree_relationship,
            charref_verified: req.body.charrefThree_verified,
            updateddatetime: new Date(),
          },
        },
        {
          where: { loanprofile, charref_name: req.body.charrefFour_name },
          data: {
            charref_address: req.body.charrefFour_address,
            charref_contactno: req.body.charrefFour_contactno,
            charref_relationship: req.body.charrefFour_relationship,
            charref_verified: req.body.charrefFour_verified,
            updateddatetime: new Date(),
          },
        },
      ];

      // Commented out barangay checking data as it seems incomplete
      // const barangayCheckingData = profile.map((prof: any, index: number) => ({
      //   loanprofile,
      //   profile: prof,
      //   informant: informant[index],
      //   informant_contactno: informant_contactno[index],
      //   brgy_position: brgy_position[index],
      //   remarks: remarks[index],
      //   date: date[index],
      // }));

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

        // await prisma.crm_barangayChecking.createMany({
        //   data: barangayCheckingData,
        // });
      });

      res.status(200).json({ message: "Loan details updated successfully" });
    } catch (err) {
      console.error("Error updating employment information:", err);
      res.status(500).json({
        error: "An error occurred while updating employment information",
      });
    }
  }

  async CoBorrower(req: Request, res: Response): Promise<void> {
    try {
      const {
        loanprofile,
        lastName,
        Firstname,
        middleName,
        suffix,
        contactNo,
        birthDate,
        streetAddress,
        cob_brgyCode,
        cob_sourceofincom,
        relation,
        cob_otherinformation,
      } = req.body;

      const coborrower = await prisma.crm_coBorrowers.upsert({
        where: { loanprofile },

        update: {
          cob_lastname: lastName,
          cob_firstname: Firstname,
          cob_middlename: middleName,
          cob_suffix: suffix,
          cob_relationship: relation,
          cob_birthday: birthDate,
          cob_address: streetAddress,
          cob_brgyCode,
          cob_sourceofincom,
          cob_otherinformation,
        },
        create: {
          loanprofile,
          cob_lastname: lastName,
          cob_firstname: Firstname,
          cob_middlename: middleName,
          cob_relationship: relation,
          cob_suffix: suffix,
          cob_contactno: contactNo,
          cob_birthday: birthDate,
          cob_address: streetAddress,
          cob_brgyCode,
          cob_sourceofincom,
          cob_otherinformation,
        },
      });
      console.log("updating coborrower", coborrower);
      res.status(200).json({ message: "Loan details updated successfully" });
    } catch (err) {}
  }

  public async updateLoanStatusReport(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { loan_profile } = req.params;
      const {
        branch,
        active_department,
        mo,
        mo_idate,
        mo_submitted,
        mo_status,
        mo_submitteddatetime,
        ao,
        ao_idate,
        ao_returndate,
        mo_returndate,
        ao_verify,
        ao_vdate,
        crecom,
        crecom_idate,
        crecom_approvedamount,
        crecom_approval,
        crecom_approvedate,
        crd,
        crd_idate,
        crd_dataverify,
        crd_verifydate,
        crd_mo_returndate,
        crd_ao_returndate,
        crd_returndate,
      } = req.body;

      let updateData = {};

      if (active_department === "1") {
        if (mo_status === "Ok to Process") {
          updateData = {
            ao: ao,
            ao_idate: new Date(),
            mo_status: mo_status,
            active_department: "2",
            active_empId: ao,
          };
        }
      }

      const loanStatus = await prisma.crm_loanStatusReport.update({
        where: { loan_profile: loan_profile },
        data: updateData,
      });
      console.log("Updating loan status", loanStatus);
      res.status(200).json({ message: "Loan status updated successfully" });
    } catch (err) {
      console.error("Error updating loan status", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new LoansController();
