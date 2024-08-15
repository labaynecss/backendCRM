import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { count } from 'console'

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
      })

      // Count the total number of authorities
      const countApprover = await prisma.crm_creditAuthority.count()
      // console.log('Fetch success', lists)

      res.status(200).json({ data: lists, total: [{ countApprover }] })
    } catch (err) {
      console.error('Error retrieving score:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  public async createAuthority(req: Request, res: Response): Promise<void> {
    try {
      const { empId, unsecuredLoan, collateralLoan } = req.body
      const existingAuthority = await prisma.crm_creditAuthority.findFirst({
        where: {
          OR: [{ empId }],
        },
      })

      if (existingAuthority) {
        res.status(400).json({ error: ' already exists.' })
        return
      }

      const registerAuthority = await prisma.crm_creditAuthority.create({
        data: {
          empId: empId,
          unsecuredLoan: unsecuredLoan,
          collateralLoan: collateralLoan,
        },
      })

      res.status(201).json({
        message: 'Created Authority Successfully',
        registerAuthority,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async updateAuthority(req: Request, res: Response): Promise<void> {
    try {
      const { empId } = req.params
      const { unsecuredLoan, collateralLoan } = req.body

      let existingAuthority = await prisma.crm_creditAuthority.findFirst({
        where: { empId: empId },
      })

      if (!existingAuthority) {
        res.status(404).json({ error: 'Authority not found' })
        return
      }

      const user = await prisma.crm_creditAuthority.update({
        where: {
          empId: empId,
        },
        data: {
          unsecuredLoan: unsecuredLoan,
          collateralLoan: collateralLoan,
        },
      })

      res.status(200).json({ message: 'User Update Successful', user })
    } catch (err) {
      console.error('Error updating user:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new AuthorityController()
