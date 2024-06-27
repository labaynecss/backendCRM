import { Router } from "express";

import SchoolController from "../controllers/schoolController";
import Authorization from "../services/Authorization";

const router = Router();

router.get("/school/",Authorization.authorized, SchoolController.schoolList);
router.get("/school/name/:school_name", SchoolController.schoolList);
router.get("/course", Authorization.authorized,SchoolController.courselist);

export const schoolRoutes = router;
