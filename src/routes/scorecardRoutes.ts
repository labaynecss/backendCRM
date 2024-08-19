import { Router } from 'express'

import ScorecardController from '../controllers/scorecardController'
// import Authorization from '../services/Authorization'

const router = Router()

router.get('/credit-scorecard', ScorecardController.scoredcardList)
router.get('/credit-totalscorecard', ScorecardController.scorecardCount)
router.post('/credit-scorecard/register', ScorecardController.createScorecard)
router.put('/credit-scorecard/:empId', ScorecardController.updateScorecard)
export const scorecardRoutes = router
