
import jwt from "jsonwebtoken";
export const generateRefreshToken = (username: string) => {
    return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET_KEY as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  };
  
  export const generateToken = (username: string) => {
    return jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  
  