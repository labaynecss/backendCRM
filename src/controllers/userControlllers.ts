
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma  from '../utils/db'
import { generateRefreshToken, generateToken } from "../utils/generateRefreshtoken";


class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { USERNAME, EMAIL, password, lastactivity, FIRSTNAME, LASTNAME, MOBILE, address, BRANCH, level, secondlevel, VOICELINK, AVATAR, SALT, COMETNAME, deleted } = req.body;
      const salted = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salted);
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { USERNAME }
          ],
        },
      });

      if (existingUser) {
        res.status(400).json({ error: "Username already exists." });
        return;
      }

      const signup = await prisma.users.create({
        data: {
          USERNAME, EMAIL, password: passwordHash, lastactivity: lastactivity ?? 0, FIRSTNAME, LASTNAME, MOBILE,
          address, BRANCH, level, secondlevel, VOICELINK: VOICELINK ?? '', AVATAR: AVATAR ?? '',
          salt: SALT ?? '', COMETNAME: COMETNAME ?? '', deleted: deleted ?? '',
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
    try {
      const users = await prisma.users.findMany();
      console.log(users);
      res.status(200).json(users);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async updateUsers(req: Request, res: Response): Promise<void> {
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
          USERNAME, FIRSTNAME, password: passwordHash, LASTNAME, address, level, secondlevel, MOBILE, BRANCH
        }
      });

      res.status(200).json({ message: "User Update Successful", user });

    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async userbyId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user_id = await prisma.users.findUnique({
        where: { ID: Number(id) },
        select: {
          ID: true, USERNAME: true, FIRSTNAME: true, LASTNAME: true, address: true, level: true, secondlevel: true, MOBILE: true, BRANCH: true,
        }
      });

      if (!user_id) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({ message: "User Successful", user_id });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();