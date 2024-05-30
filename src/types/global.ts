import { Request } from "express"; 



export interface AuthRequest extends Request {
    username ?: string;
    password ?: string | null;
  }


  declare module 'express-session' {
    interface Session {
      access_token?: string | undefined
    }
  }


  export interface UserInput {
    USERNAME: string;
    EMAIL: string;
    password: string;
    lastactivity: string;
    FIRSTNAME: string;
    LASTNAME: string;
    MOBILE: string;
    address: string;
    BRANCH: string;
    level: string;
    secondlevel: string;
    VOICELINK?:  null;
    AVATAR?: null
    salt?:null;
    COMETNAME?:null;
    deleted?: null;
  }
  