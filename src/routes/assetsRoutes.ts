
import { Router } from "express";

import AssetsController from "../controllers/assetsController";
    



const router = Router();

router.get("/assets", AssetsController.listAssets)

export const assetsRoutes = router