import { Router } from 'express'

import AuthorityController from '../controllers/authorityController'
// import Authorization from '../services/Authorization'

const router = Router()

router.get('/credit-authority', AuthorityController.authorityList)
// router.get('/totalscore/:loanprofile', ScoreController.scoreTotal)

export const authorityRoutes = router
