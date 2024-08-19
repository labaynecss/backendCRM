import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ScorecardController {
  async scoredcardList(req: Request, res: Response): Promise<void> {
    try {
      const scorecardlists = await prisma.crm_kycScoreCard_dtl.findMany({})

      res.status(200).json({
        data: scorecardlists, // Ensure the processedAuthorities are sent in the `data` key
      })
      // console.log(scorecardlists)
    } catch (err) {
      console.error('Error retrieving scorecard list:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async scorecardCount(req: Request, res: Response): Promise<void> {
    try {
      const scorecardCount = await prisma.crm_kycScoreCard_dtl.groupBy({
        by: ['scorecardId'],
        _count: {
          id: true,
        },
      })

      res.status(200).json({
        data: scorecardCount,
      })
    } catch (err) {
      console.error('Error retrieving scorecard list:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async createScorecard(req: Request, res: Response): Promise<void> {
    try {
      const {
        scorecardId,
        scoreMatrixCode,
        scoreBusinessMatrix,
        scoreEmployedMatrix,
        scorePoints,
      } = req.body
      const existingScorecard = await prisma.crm_kycScoreCard_dtl.findFirst({
        where: {
          OR: [{ scoreMatrixCode }],
        },
      })

      if (existingScorecard) {
        res.status(400).json({ error: 'Scorecard already exists.' })
        return
      }

      const registerScorecard = await prisma.crm_kycScoreCard_dtl.create({
        data: {
          scorecardId: scorecardId,
          scoreMatrixCode: scoreMatrixCode,
          scoreBusinessMatrix: scoreBusinessMatrix,
          scoreEmployedMatrix: scoreEmployedMatrix,
          scorePoints: scorePoints,
        },
      })

      res.status(201).json({
        message: 'Created Authority Successfully',
        registerScorecard,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async updateScorecard(req: Request, res: Response): Promise<void> {
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

export default new ScorecardController()
