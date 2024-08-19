import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../utils/db";
import {
  generateRefreshToken,
  generateToken,
} from "../utils/generateRefreshtoken";
import { generateEmployee } from "../utils/generateEmployee";
import { NotFoundError } from "../utils/error";
import { crm_moduleStaticAccess } from "@prisma/client";

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        USERNAME,
        PASSWORD,
        u_lastname,
        u_firstname,
        u_middlename,
        u_suffix,
        u_email,
        address,
        BRANCH,
        u_contact,
        u_departmentid,
      } = req.body;

      const salted = await bcrypt.genSalt();
      const emp_id = generateEmployee();
      const passwordHash = await bcrypt.hash(PASSWORD, salted);

      // Check if the user already exists
      const existingUser = await prisma.crm_users.findFirst({
        where: { OR: [{ emp_id }] },
      });

      if (existingUser) {
        res.status(400).json({ error: " already exists." });
        return;
      }

      // Prepare the common data for the user
      const userData = {
        USERNAME,
        PASSWORD: passwordHash,
        u_lastname,
        u_firstname,
        u_middlename,
        u_email,
        u_contact,
        u_suffix,
        address,
        BRANCH,
        emp_id,
        u_departmentid,
      };

      // Special handling if the department is '3' (CreCom) or '4'
      if (u_departmentid === "3" || u_departmentid === "4") {
        userData.BRANCH = u_departmentid; // Override the branch if needed
      }

      // Create the user first
      const signup = await prisma.crm_users.create({ data: userData });

      // Create the authority data if the department is '3'
      let createAuthority = null;
      if (u_departmentid === "3") {
        createAuthority = await prisma.crm_creditAuthority.create({
          data: {
            empId: emp_id,
            unsecuredLoan: 0,
            collateralLoan: 0,
          },
        });
      }

      // Retrieve the department module name
      const department = await prisma.crm_department.findUnique({
        where: {
          dept_id: u_departmentid,
        },
        select: {
          dept_module: true,
        },
      });

      const moduleName =
        department?.dept_module as keyof crm_moduleStaticAccess;

      // Fetch default roles based on department modules
      const defaultRoles = await prisma.crm_moduleStaticAccess.findMany({
        where: {
          [moduleName]: true,
        },
        select: {
          userAccess: true,
        },
      });

      // Prepare access data for the user
      const accessData = defaultRoles.map((role) => ({
        emp_id,
        userAccess: role.userAccess,
        user_bAccess: true,
      }));

      // Create user access
      const createAccess = await prisma.crm_moduleUserAccess.createMany({
        data: accessData,
      });

      const access_token = generateToken(signup.USERNAME);
      const refresh_token = generateRefreshToken(signup.USERNAME);

      res.cookie("token", access_token, { httpOnly: true });
      res.cookie("refresh_token", refresh_token, { httpOnly: true });
      res.status(201).json({
        message: "Created User Successfully",
        signup,
        createAccess,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async updateUsers(req: Request, res: Response): Promise<void> {
    try {
      const { emp_id } = req.params;
      const {
        USERNAME,
        PASSWORD,
        u_lastname,
        u_firstname,
        u_middlename,
        u_email,
        u_suffix,
        address,
        BRANCH,
        u_departmentid,
        u_contact,
      } = req.body;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(PASSWORD, salt);

      let existingUser = await prisma.crm_users.findFirst({
        where: { emp_id: emp_id },
      });

      if (!existingUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const user = await prisma.crm_users.update({
        where: {
          emp_id: emp_id,
        },
        data: {
          USERNAME: USERNAME,
          u_firstname: u_firstname,
          PASSWORD: passwordHash,
          u_lastname: u_lastname,
          u_middlename: u_middlename,
          address: address,
          u_email: u_email,
          u_suffix: u_suffix,
          BRANCH: BRANCH,
          u_departmentid: u_departmentid,
        },
      });

      const department = await prisma.crm_department.findFirst({
        where: {
          dept_id: u_departmentid,
        },
        select: {
          dept_module: true,
        },
      });

      if (!department || !department.dept_module) {
        res
          .status(404)
          .json({ error: "Department not found or has no module" });
        return;
      }

      const moduleName = department.dept_module as string;

      const defaultRoles = await prisma.crm_moduleStaticAccess.findMany({
        select: {
          userAccess: true,
          [moduleName]: true,
        },
      });

      for (const role of defaultRoles) {
        const existingAccess = await prisma.crm_moduleUserAccess.findFirst({
          where: {
            emp_id: emp_id,
            userAccess: role.userAccess,
          },
        });

        if (existingAccess) {
          await prisma.crm_moduleUserAccess.update({
            where: {
              id: existingAccess.id,
            },
            data: {
              user_bAccess: role[moduleName as keyof typeof role],
            },
          });
        } else if (role[moduleName as keyof typeof role]) {
          await prisma.crm_moduleUserAccess.create({
            data: {
              emp_id: emp_id,
              userAccess: role.userAccess,
              user_bAccess: role[moduleName as keyof typeof role],
            },
          });
        }
      }

      res.status(200).json({ message: "User Update Successful", user });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async UserAccessEmpID(req: Request, res: Response): Promise<void> {
    try {
      const { emp_id } = req.params;
      const userAccessEmpID = await prisma.crm_moduleUserAccess.findMany({
        where: { emp_id: emp_id, user_bAccess: true },
        select: {
          userAccess: true,
          crm_users: {
            select: {
              emp_id: true,
              u_lastname: true,
              u_firstname: true,
              u_middlename: true,
              u_suffix: true,
              u_departmentid: true,
              BRANCH: true,
              crm_department: true,
            },
          },
        },
      });
      res.status(201).json(userAccessEmpID);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async UserAccessUpdateEmpID(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { emp_id } = req.params;
      const { accessValues } = req.body; // Assuming the body contains an array of userAccess objects

      for (const access of accessValues) {
        const { userAccess, value } = access;

        // Check if userAccess exists for the given emp_id
        const existingAccess = await prisma.crm_moduleUserAccess.findFirst({
          where: {
            emp_id: emp_id,
            userAccess: userAccess,
          },
        });

        if (existingAccess) {
          // If userAccess exists, update the value based on the request
          await prisma.crm_moduleUserAccess.update({
            where: {
              id: existingAccess.id,
            },
            data: {
              user_bAccess: value,
            },
          });
        } else if (value) {
          // If userAccess does not exist and value is true, insert a new record
          await prisma.crm_moduleUserAccess.create({
            data: {
              emp_id: emp_id,
              userAccess: userAccess,
              user_bAccess: value,
            },
          });
        }
        // If userAccess does not exist and value is false, do nothing
      }

      res.status(200).json({ message: "User access updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async usersList(req: Request, res: Response): Promise<void> {
    const users = await prisma.crm_users.findMany();

    if (!users || users.length === 0) {
      throw new NotFoundError("No users found");
    }

    console.log(users);
    res.status(200).json(users);
  }

  public async userbyId(req: Request, res: Response): Promise<void> {
    try {
      const { emp_id } = req.params;
      const user_id = await prisma.crm_users.findUnique({
        where: { emp_id: emp_id },
        select: {
          id: true,
          USERNAME: true,
          u_firstname: true,
          u_lastname: true,
          u_departmentid: true,
          u_contact: true,
          address: true,
          u_email: true,
          u_middlename: true,
          u_suffix: true,
          BRANCH: true,
        },
      });

      if (!user_id) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "User Successful", user_id });
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  public async DefaultRoles(req: Request, res: Response): Promise<void> {
    try {
      const defaultRoles = await prisma.crm_moduleStaticAccess.findMany();
      res.status(200).json(defaultRoles);
      console.log(defaultRoles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  public async UpdateDefaultRoles(req: Request, res: Response): Promise<void> {
    const { module, accessValues } = req.body;

    try {
      const updatePromises = accessValues.map(
        (access: { userAccess: string; value: boolean }) => {
          return prisma.crm_moduleStaticAccess.updateMany({
            where: { userAccess: access.userAccess },
            data: { [module]: access.value },
          });
        }
      );

      await Promise.all(updatePromises);

      res.status(200).json({ message: "Module access updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  public async UserDepartment(req: Request, res: Response): Promise<void> {
    try {
      const department = await prisma.crm_department.findMany();
      console.log("Fetch success", department);
      res.status(200).json(department);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  public async UserSearch(req: Request, res: Response): Promise<void> {
    try {
      const { fullname } = req.params;

      const lists = await prisma.crm_users.findMany({
        where: {
          OR: [
            { u_firstname: { contains: fullname } },
            { u_middlename: { contains: fullname } },
            { u_lastname: { contains: fullname } },
            { u_suffix: { contains: fullname } },
          ],
        },
        orderBy: [{ u_lastname: "asc" }, { u_firstname: "asc" }],
      });

      res.status(200).json(lists);
    } catch (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new UserController();
