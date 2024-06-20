import { Router } from "express";

import SchoolController from '../controllers/schoolController'



const router = Router();


router.post("/school", SchoolController.schoolList)
router.get("/course", SchoolController.courselist)


export const schoolRoutes = router