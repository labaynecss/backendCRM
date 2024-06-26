import { Router } from "express";

import SchoolController from "../controllers/schoolController";

const router = Router();

router.get("/school/", SchoolController.schoolList);
router.get("/school/name/:school_name", SchoolController.schoolList);
router.get("/course", SchoolController.courselist);

export const schoolRoutes = router;
