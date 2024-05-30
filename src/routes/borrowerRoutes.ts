import { Router } from "express";

import BorrowersController from "../controllers/borrowersController";
    



const router = Router();


router.get("/borrowers", BorrowersController.allborrowers)



export const borrowersRoutes = router