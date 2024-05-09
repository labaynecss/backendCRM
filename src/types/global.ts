import { Request } from "express"; 

export interface UserCred {
    id: number;
    username: string;
    f_name: string;
    l_name: string;
    mobile: number;
    m_name: string ;
    branch: string;
    email: string;
    password: string;
}

export interface AuthRequest extends Request {
    email?: string;
  }
