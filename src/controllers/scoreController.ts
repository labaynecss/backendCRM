import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ScoreController {
  async scoreList(req: Request, res: Response): Promise<void> {
    try {
      const { loanprofile } = req.params
      const lists = await prisma.crm_kycScoring.findMany({
        where: {
          loanprofile: {
            contains: loanprofile,
          },
        },
        include: {
          crm_kycScoreCard_dtl: {
            select: {
              scoreBusinessMatrix: true,
              scoreEmployedMatrix: true,
              scorePoints: true,
            },
          },
        },
      })

      const result = await prisma.crm_kycScoreCard_dtl.aggregate({
        _sum: {
          scorePoints: true,
        },
        where: {
          crm_kycScoring: {
            some: {
              loanprofile: {
                contains: loanprofile,
              },
            },
          },
        },
      })

      const totalScore = result._sum.scorePoints || 0

      console.log('Fetch success', lists)
      res.status(200).json({ data: lists, total: [{ totalScore }] })
    } catch (err) {
      console.error('Error retrieving score:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // async scoreTotal(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { loanprofile } = req.params

  //     // Fetch the sum of scorePoints using Prisma's aggregate function
  //     const result = await prisma.crm_kycScoreCard_dtl.aggregate({
  //       _sum: {
  //         scorePoints: true,
  //       },
  //       where: {
  //         crm_kycScoring: {
  //           some: {
  //             loanprofile: {
  //               contains: loanprofile,
  //             },
  //           },
  //         },
  //       },
  //     })

  //     const totalScore = result._sum.scorePoints || 0

  //     console.log('Fetch success', totalScore)
  //     res.status(200).json({ totalScore })
  //   } catch (err) {
  //     console.error('Error retrieving score:', err)
  //     res.status(500).json({ error: 'Internal Server Error' })
  //   }
  // }
}

export default new ScoreController()
