import { Router } from "express";
import LoansController from "../controllers/loansController";

const router = Router();

router.get("/loans", LoansController.listofLoans);
router.patch("/clients/:profile", LoansController.updateProduct);

router.post("/upload");

export const loansRoutes = router;
