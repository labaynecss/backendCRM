import { Router } from "express";

import BusinessController from  "../controllers/businessController"



const router = Router();


router.get("/businessTypes", BusinessController.businessTypes)


export const businessRoutes = router