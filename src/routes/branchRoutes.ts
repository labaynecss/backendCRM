import { Router } from "express";
import { allbranches, branches, createBranch } from "../controllers/branchController";
    



const router = Router();


router.get("/allbranch", allbranches)
router.get('/branches/:page', branches);
router.post("/branch", createBranch)

export const branchRoutes = router