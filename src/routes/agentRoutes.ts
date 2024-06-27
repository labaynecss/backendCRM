import { Router } from "express";

import AgentController from "../controllers/agentController";
import Authorization from "../services/Authorization";
("../controllers/clientController");

const router = Router();

router.get("/agents",Authorization.authorized ,AgentController.listagents);
router.get("/filteragents",Authorization.authorized ,AgentController.filterAgents);
router.patch("/client/:profile",Authorization.authorized ,AgentController.updateAgentLoans);
router.get("/agentId", Authorization.authorized,AgentController.agentjoinagentId);

export const agentRoutes = router;
