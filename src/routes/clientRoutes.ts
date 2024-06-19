import { Router } from "express";

import ClientController from "../controllers/clientController";

const router = Router();

router.get("/clients/profile/:profile", ClientController.getClientByProfile);
router.get("/clients", ClientController.clientjoinData);
router.get("/clients/tele", ClientController.getTelemarketer);
router.post("/createClients", ClientController.createClient);
router.post("/Checkclients", ClientController.checkclient);
//router.put("/clients/:profile", ClientController.updatebyProfile);

export const clientRoutes = router;
