import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class AuthorityController {
  async authorityList(req: Request, res: Response): Promise<void> {
    try {
      const lists = await prisma.crm_creditAuthority.findMany({
        select: {
          id: true,
          empId: true,
          unsecuredLoan: true,
          collateralLoan: true,
        },
        // include: {
        //   crm_users: {
        //     // Fetching related `crm_users` data
        //     select: {
        //       empId: true,
        //       u_firstname: true,
        //       u_lastname: true,
        //       u_middlename: true,
        //     },
        //   },
        // },
      })

      console.log('Fetch success', lists)

      res.status(200).json(lists)
    } catch (err) {
      console.error('Error retrieving score:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new AuthorityController()
