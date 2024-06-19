import { Router } from "express";

import AgentController from "../controllers/agentController";
("../controllers/clientController");

const router = Router();

router.get("/agents", AgentController.listagents);
router.get("/filteragents", AgentController.filterAgents);
router.patch("/client/:profile", AgentController.updateAgentLoans);
router.get("/agentId", AgentController.agentjoinagentId);

export const agentRoutes = router;
