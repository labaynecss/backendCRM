import { Router } from "express";
import UserController from "../controllers/credentialController";
// import { verifyToken } from "../middlewares/credMiddleware";

const router = Router();


router.post('/login', UserController.login);
// router.get("/refresh", refreshToken)

export const credentialRoutes = router
