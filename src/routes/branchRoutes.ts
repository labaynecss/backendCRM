import { Router } from "express";
import { allbranches, branch, createBranch } from "../controllers/branchController";
import Authorization from "../services/Authorization";
    



const router = Router();


router.get("/allbranch/:branch_description",Authorization.authorized, allbranches)
router.get('/branch', Authorization.authorized, branch);
router.post("/branch", createBranch)

export const branchRoutes = router