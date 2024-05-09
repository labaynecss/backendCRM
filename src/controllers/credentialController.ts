import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../utils/db";



class CredentialController {
    static async register(req: Request, res: Response) {
        const { f_name, l_name, m_name, mobile, branch, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password, salt);
        const signupUser = await prisma.user_Credentials.create({
            data: {
                f_name,
                l_name,
                m_name,
                mobile,
                branch,
                email,
                password:  passwordhash
            }
        })
    
       
    }
    const token = 
    const refresh_token = 
    const expirationTime = 
  
    await prisma.token.create({
      data: {
        userId: 
        token: 
        expirationTime: 
      },
    });
}

