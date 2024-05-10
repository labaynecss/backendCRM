import { Request, Response } from "express";
import prisma from "../utils/db";
import { generateRefreshToken, generateToken } from "../utils/generateRefreshtoken";
import {  AuthRequest, UserCred } from "../types/global";
import { getExpirationTime } from "../utils/calcTime";
import * as bcrypt from "bcrypt";


 const register = async (req: Request, res: Response) => {
   const { username, email, password, f_name, l_name, m_name, mobile, branch } = req.body
   
   const salt = await bcrypt.genSalt();
   const passwordHash = await bcrypt.hash(password , salt);
   
   let signup : UserCred   = await prisma.userCredentials.create({
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
}

const login = async (req: Request, res: Response) => {
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
};

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


const logout = async (req: Request, res: Response) => {

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json({ message: "Cookies have been deleted" });
};



export {register, login, user, logout}