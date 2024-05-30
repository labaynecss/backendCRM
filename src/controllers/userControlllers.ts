
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma  from '../utils/db'
import { generateRefreshToken, generateToken } from "../utils/generateRefreshtoken";


const createUser = async (req: Request, res: Response) => {
    try {
      const { USERNAME, EMAIL, password, lastactivity, FIRSTNAME, LASTNAME, MOBILE, address, BRANCH, level, secondlevel, VOICELINK, AVATAR, salt, COMETNAME, deleted } = req.body;
      const salted = await bcrypt.genSalt();
      const created = Date.now()
      const passwordHash = await bcrypt.hash(password, salted);
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { USERNAME },
            { EMAIL },
          ],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ error: "Username or email already exists." });
      }
  
      const signup = await prisma.users.create({
        data: {
            USERNAME, EMAIL, password: passwordHash, lastactivity: lastactivity?? 0, FIRSTNAME, LASTNAME, MOBILE,
            address, BRANCH, level, secondlevel,  VOICELINK: VOICELINK ?? '',
            AVATAR: AVATAR ?? '',
            salt: salt ?? '',
            COMETNAME: COMETNAME ?? '',
            deleted: deleted ?? '',
        },
      });
  
      const access_token = generateToken(signup.USERNAME);
      const refresh_token = generateRefreshToken(signup.USERNAME);
  
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        res.cookie("token", access_token, { httpOnly: true });
        res.cookie("refresh_token", refresh_token, { httpOnly: true });
        return res.status(201).json({ message: "Created User Successfully", signup });
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
    

const usersList = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany();
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateUsers = async (req: Request, res: Response): Promise<void> => { 
  //last friday 
try {
     const { id } = req.params;
    const { USERNAME, password, FIRSTNAME, LASTNAME, address, level, secondlevel, MOBILE, BRANCH } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let existingUser = await prisma.users.findUnique({
        where: { ID: Number(id) }
    });
    if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
     const user = await prisma.users.update({
         where: {
             ID: Number(id)
         },
         data: {
             USERNAME,
             FIRSTNAME,
             password: passwordHash,
             LASTNAME,
             address,
             level,
             secondlevel,
             MOBILE,
             BRANCH

         }
     })
     res.status(200).json({ message: "User Update Successful", user })

    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }



}

const userbyId = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { id } = req.params;
        const user_id = await prisma.users.findUnique({
          where: { ID: Number(id) },
          select: {
            ID: true,
            USERNAME: true,
            FIRSTNAME: true,
            LASTNAME: true,
            address: true,
            level: true,
            secondlevel: true,
            MOBILE: true,
            BRANCH: true,

          }
        });
    
        if (!user_id) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
    
        // Respond with user details
        res.status(200).json({message: "User Successful",user_id});
      } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    
    


export {usersList, createUser, updateUsers, userbyId }