import { Router } from "express";

import ClientController from "../controllers/clientController";
import Authorization from "../services/Authorization";

const router = Router();

router.get("/clients/profile/:profile",Authorization.authorized, ClientController.getClientByProfile);
router.get("/clients", Authorization.authorized,ClientController.clientjoinData);
router.get("/clients/tele",Authorization.authorized, ClientController.getTelemarketer);
router.post("/createClients", ClientController.createClient);
router.post("/Checkclients", ClientController.checkclient);
//router.put("/clients/:profile", ClientController.updatebyProfile);

export const clientRoutes = router;
