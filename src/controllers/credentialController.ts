import { Request, Response } from "express";
import prisma from "../utils/db";
import { generateRefreshToken, generateToken } from "../utils/generateRefreshtoken";
import {  AuthRequest, UserCred } from "../types/global";
import { getExpirationTime } from "../utils/calcTime";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
     
    const { username, email, password, f_name, l_name, m_name, mobile, branch } = req.body
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const existingUser = await prisma.userCredentials.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    let signup: UserCred = await prisma.userCredentials.create({
      data: {
        username,
        email,
        password: passwordHash,
        f_name,
        l_name,
        m_name,
        mobile,
        branch,
      },
    });
    const access_token = generateToken(signup.username)
    const refresh_token = generateRefreshToken(signup.username)
    const expirationTime = getExpirationTime();
    await prisma.token.create({
      data: {
        userId: signup.id,
        token: refresh_token,
        expirationTime: expirationTime,
      },
    });
   
    res.cookie("token", access_token, { httpOnly: true });
    res.cookie("refresh_token", refresh_token, { httpOnly: true });
    return res
      .status(201)
      .json({ message: "Created User Successful", signup });
  } catch (err) { 
    
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  
  }
  }
  


const login = async (req: Request, res: Response) => {
  try {
  const { username, password } = req.body
  
  const signin  = await prisma.userCredentials.findFirst({
  where  : {  username: username}
  })

  if (!signin) { 
    return res
      .status(400).json({ message: "Invalid Credentials!" });
    
  }
  let match = await bcrypt.compare(password, signin.password) 
  if (!match) {
    return res
     .status(400).json({ message: " Password incorrect" });
  }
  const access_token = generateToken(signin.username)
   const refresh_token = generateRefreshToken(signin.username)
  const expirationTime = getExpirationTime()


  await prisma.token.create({
    data: {
      userId: signin.id,
      token: refresh_token,
      expirationTime: expirationTime,
    },
  });
  res.cookie("token", access_token, { httpOnly: true });
  res.cookie("refresh_token", refresh_token, { httpOnly: true });
  return res
  .status(200)
      .json({ message: "User are Created ", signin, access_token });
    } catch (err) { 
    
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    
    }
  }



const user = async (req: AuthRequest, res: Response) => {
  const username = req.username;
  const user = await prisma.userCredentials.findFirst({
    where: { username: username },
    select: { username: true, email: true },
  });

  if (!user) {
    return res.status(404).json({ message: "username is not exist" });
  }

  return res.status(200).json({ user });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  const now = new Date(Date.now());
  const PHExpirationDate = now.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  const currentTime = new Date(PHExpirationDate);

  const token = await prisma.token.findFirst({
    where: {
      token: refresh_token,
      expirationTime: {
        gt: currentTime,
      },
    },
  });

  if (!token) {
    return res.status(401).json({ message: "invalid token" });
  }

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "the token is not valid" });
      } else {
        const username = decoded.username;
        const refresh_token = generateToken(username);

        return res
          .status(201)
          .json({ message: "Created a new access token ", refresh_token });
      }
    }
  );
};



export {register, login, user, refreshToken} 