import { Router } from "express";
import LoansController from "../controllers/loansController"



const router = Router();


router.get("/loans", LoansController.listofLoans)


export const loansRoutes = router