import { Router } from "express";

import BusinessController from  "../controllers/businessController"
import Authorization from "../services/Authorization";



const router = Router();


router.get("/businessTypes",Authorization.authorized, BusinessController.businessTypes)


export const businessRoutes = router