import { Router } from "express";

import BorrowersController from "../controllers/borrowersController";
    



const router = Router();


router.get("/borrowers", BorrowersController.allborrowers)
router.post("/borrowers", BorrowersController.createBorrower)



export const borrowersRoutes = router