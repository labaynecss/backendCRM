import { Router } from "express";
import {  login  } from "../controllers/credentialController";
// import { verifyToken } from "../middlewares/credMiddleware";

const router = Router();


router.post("/login", login)
// router.get("/refresh", refreshToken)

export const credentialRoutes = router
