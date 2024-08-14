import { Router } from 'express'

import ScoreController from '../controllers/scoreController'
// import Authorization from '../services/Authorization'

const router = Router()

router.get('/score/:loanprofile', ScoreController.scoreList)
// router.get('/totalscore/:loanprofile', ScoreController.scoreTotal)

export const scoreRoutes = router
