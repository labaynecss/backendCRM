import { Router } from "express";
import LoansController from "../controllers/loansController";
import Authorization from "../services/Authorization";

const router = Router();

router.get("/loans",Authorization.authorized, LoansController.listofLoans);
router.patch("/clients/:profile",Authorization.authorized, LoansController.updateProduct);

router.post("/upload");

export const loansRoutes = router;
