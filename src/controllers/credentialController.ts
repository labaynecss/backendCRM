import { Request, Response } from "express";
import prisma from "../utils/db";
import {
  generateRefreshToken,
  generateToken,
} from "../utils/generateRefreshtoken";
import * as bcrypt from "bcrypt";

class UserController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { USERNAME, PASSWORD } = req.body;
      let signin = await prisma.crm_users.findFirst({
        where: { USERNAME: USERNAME },
        select: {
          BRANCH: true,
          USERNAME: true,
          u_firstname: true,
          u_lastname: true,
          u_departmentid: true,
          u_email: true,
          u_middlename: true,
          u_suffix: true,
          crm_department: true,
          PASSWORD: true,
          emp_id: true,
        },
      });

      if (!signin) {
        res.status(400).json({ message: "Invalid Credentials!" });
        return;
      }
      // Compare passwords
      const match = await bcrypt.compare(PASSWORD, signin.PASSWORD!);
      if (!match) {
        console.log("Password comparison failed");
        res.status(400).json({ message: "Password incorrect" });
        return;
      }

      // Generate tokens
      const access_token = generateToken(signin.USERNAME);
      const refresh_token = generateRefreshToken(signin.USERNAME);

      // Set cookies
      res.cookie("token", access_token, { httpOnly: true });
      res.cookie("refresh_token", refresh_token, { httpOnly: true });
      // Return success response
      res
        .status(200)
        .json({ message: "User is authenticated", signin, access_token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

// const refreshToken = async (req: Request, res: Response) => {
//   const { refresh_token } = req.cookies;
//   const now = new Date(Date.now());
//   const PHExpirationDate = now.toLocaleString("en-US", {
//     timeZone: "Asia/Manila",
//   });
//   const currentTime = new Date(PHExpirationDate);

//   const token = await prisma.users.findFirst({
//     where: {
//       session: refresh_token,
//       expirationTime: {
//         gt: currentTime,
//       },
//     },
//   });

//   if (!token) {
//     return res.status(401).json({ message: "invalid token" });
//   }

//   jwt.verify(
//     refresh_token,
//     process.env.REFRESH_TOKEN_SECRET_KEY as string,
//     (err: any, decoded: any) => {
//       if (err) {
//         return res.status(401).json({ message: "the token is not valid" });
//       } else {
//         const USERNAME = decoded.username;
//         const refresh_token = generateToken(USERNAME);

//         return res
//           .status(201)
//           .json({ message: "Created a new access token ", refresh_token });
//       }
//     }
//   );
// };

export default new UserController();
