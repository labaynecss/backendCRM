import { Router } from 'express'

import AuthorityController from '../controllers/authorityController'
// import Authorization from '../services/Authorization'

const router = Router()

router.get('/credit-authority', AuthorityController.authorityList)
// router.get('/totalscore/:loanprofile', ScoreController.scoreTotal)
router.post('/credit-authority/register', AuthorityController.createAuthority)
router.put('/credit-authority/:empId', AuthorityController.updateAuthority)
export const authorityRoutes = router
