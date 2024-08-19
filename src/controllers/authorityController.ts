import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class AuthorityController {
  async authorityList(req: Request, res: Response): Promise<void> {
    try {
      const authoritylists = await prisma.crm_creditAuthority.findMany({
        include: {
          crm_users: {
            select: {
              u_lastname: true,
              u_firstname: true,
              u_middlename: true,
            },
          },
        },
      })

      // Use flatMap to process each authority and flatten the structure
      const processedAuthorities = authoritylists.flatMap((authority) => {
        const fullName = [
          authority.crm_users?.u_lastname,
          authority.crm_users?.u_firstname,
          authority.crm_users?.u_middlename,
        ]
          .filter(Boolean) // Filter out null or undefined values
          .join(', ') // Join the names with commas

        // Return an array with the processed authority to flatten the structure
        return {
          fullName, // Add the fullName to each authority object
          ...authority,
        }
      })

      // Count the total number of authorities
      const countApprover = await prisma.crm_creditAuthority.count()

      res.status(200).json({
        data: processedAuthorities, // Ensure the processedAuthorities are sent in the `data` key
        total: [{ countApprover }],
      })
      console.log(processedAuthorities)
    } catch (err) {
      console.error('Error retrieving authority list:', err)
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
        res.status(400).json({ error: 'Authority already exists.' })
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
