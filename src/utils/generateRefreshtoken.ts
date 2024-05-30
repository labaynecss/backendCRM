
import jwt from "jsonwebtoken";
export const generateRefreshToken = (USERNAME: string | null) => {
    return jwt.sign({ USERNAME }, process.env.REFRESH_TOKEN_SECRET_KEY as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  };
  
  export const generateToken = (USERNAME: string | null) => {
    return jwt.sign({ USERNAME }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  
  