import { Router } from "express";
import LoansController from "../controllers/loansController";

const router = Router();

router.get("/loans", LoansController.listofLoans);
router.post("/loans", LoansController.listofLoans);

export const loansRoutes = router;
