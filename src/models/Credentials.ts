// models/User.ts

import { PrismaClient } from '@prisma/client';
import { UserCred } from '../types/global';


const prisma = new PrismaClient();


function create(data: UserCred) {
  return prisma.user_Credentials.create({
    data: data
  });
  
}

export const UserCredentials = create