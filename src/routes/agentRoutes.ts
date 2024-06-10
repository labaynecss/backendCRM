import { Router } from "express";

import AgentController from "../controllers/agentController";
("../controllers/clientController");

const router = Router();

router.get("/agents", AgentController.listagents);
router.get("/filteragents", AgentController.filterAgents);

export const agentRoutes = router;
