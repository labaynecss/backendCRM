import { Router } from "express";

import AgencyController from  "../controllers/agencyController"
import Authorization from "../services/Authorization";



const router = Router();


router.get("/agency",Authorization.authorized, AgencyController.listagency)


export const agencyRoutes = router