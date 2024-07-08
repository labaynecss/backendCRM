import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../utils/db";
import {
  generateRefreshToken,
  generateToken,
} from "../utils/generateRefreshtoken";
import { generateEmployee } from "../utils/generateEmployee";
import { NotFoundError } from "../utils/error";

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
        LEVEL,
        SECONDLEVEL,
        BRANCH,
      } = req.body;
      const salted = await bcrypt.genSalt();
      const emp_id = generateEmployee();
      const passwordHash = await bcrypt.hash(PASSWORD, salted);
      const existingUser = await prisma.crm_users.findFirst({
        where: {
          OR: [{ emp_id }],
        },
      });

      if (existingUser) {
        res.status(400).json({ error: " already exists." });
        return;
      }

      const signup = await prisma.crm_users.create({
        data: {
          USERNAME: USERNAME,
          PASSWORD: passwordHash,
          u_lastname: u_lastname,
          u_firstname: u_firstname,
          u_middlename: u_middlename,
          u_email: u_email,
          u_suffix: u_suffix,
          address: address,
          BRANCH: BRANCH,
          LEVEL: LEVEL,
          SECONDLEVEL: SECONDLEVEL,
          emp_id: emp_id,
        },
      });

      const access_token = generateToken(signup.USERNAME);
      const refresh_token = generateRefreshToken(signup.USERNAME);

      res.cookie("token", access_token, { httpOnly: true });
      res.cookie("refresh_token", refresh_token, { httpOnly: true });
      res.status(201).json({ message: "Created User Successfully", signup });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async usersList(req: Request, res: Response): Promise<void> {
      const users = await prisma.crm_users.findMany();
  
      if (!users || users.length === 0) {
        throw new NotFoundError('No users found');
      }
   
  console.log(users);
  res.status(200).json(users);
    
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
        LEVEL,
        SECONDLEVEL,
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
          LEVEL: LEVEL,
          SECONDLEVEL: SECONDLEVEL,
          u_email: u_email,
          u_suffix: u_suffix,
          BRANCH: BRANCH,
        },
      });

      res.status(200).json({ message: "User Update Successful", user });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
          address: true,
          LEVEL: true,
          SECONDLEVEL: true,
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
}

export default new UserController();
