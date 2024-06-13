import { Router } from "express";
import LoansController from "../controllers/loansController";

const router = Router();

router.get("/loans", LoansController.listofLoans);
router.get("/clientjoinloans", LoansController.clientjoinloans);

export const loansRoutes = router;
