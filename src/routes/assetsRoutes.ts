
import { Router } from "express";

import AssetsController from "../controllers/assetsController";
import Authorization from "../services/Authorization";
    



const router = Router();

router.get("/assets",Authorization.authorized, AssetsController.listAssets)

export const assetsRoutes = router