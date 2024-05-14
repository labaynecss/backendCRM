import { Request } from "express"; 

export interface UserCred {
   id: number;
    username: string;
    f_name: string;
    l_name: string;
  password: string
    email: string;
    mobile: string;
    branch: string;
    m_name: string
}

export interface AuthRequest extends Request {
    username ?: string;
  }


