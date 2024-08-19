import { Router } from 'express'

import SchoolController from '../controllers/schoolController'
import Authorization from '../services/Authorization'

const router = Router()

router.get('/school/', Authorization.authorized, SchoolController.schoolList)
router.get('/school/name/:school_name', SchoolController.schoolList)
router.get(
  '/course/description/:course_description',
  Authorization.authorized,
  SchoolController.courselist
)
router.get(
  '/school/description/:school_id',
  Authorization.authorized,
  SchoolController.searchedSchool
)

export const schoolRoutes = router
