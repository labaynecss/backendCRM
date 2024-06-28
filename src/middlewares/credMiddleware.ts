import {  Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/global";

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return res
        .status(400)
        .json({ message: "No token provided" });
    }

    jwt.verify(
      access_token,
      process.env.JWT_SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(400).json({ message: "The token is not valid." });
        } else {
          req.username = decoded.username;
          next();
        }
      }
    );
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export { verifyToken };