import { Request, Response } from "express";
import prisma from "../utils/db";
import { generateRefreshToken, generateToken } from "../utils/generateRefreshtoken";
import { getExpirationTime } from "../utils/calcTime";
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt";


class UserController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { USERNAME, password } = req.body;
      let signin = await prisma.users.findFirst({
        where: { USERNAME: USERNAME }
      });

      if (!signin) {
        res.status(400).json({ message: "Invalid Credentials!" });
        return;
      }
      console.log(`Stored password: ${signin.password}`);

      // Compare passwords
      const match = await bcrypt.compare(password, signin.password!);
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
      res.status(200).json({ message: "User is authenticated", signin, access_token });
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