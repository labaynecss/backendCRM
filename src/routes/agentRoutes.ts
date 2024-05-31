import { Router } from "express";

import AgentController from  "../controllers/agentController";
 "../controllers/clientController";



const router = Router();


router.get("/agents", AgentController.listagents)


export const agentRoutes = router