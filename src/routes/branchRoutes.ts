import { Router } from "express";
import { allbranches, branches, createBranch } from "../controllers/branchController";
import Authorization from "../services/Authorization";
    



const router = Router();


router.get("/allbranch/:branch_description",Authorization.authorized, allbranches)
router.get('/branches/:page', branches);
router.post("/branch", createBranch)

export const branchRoutes = router