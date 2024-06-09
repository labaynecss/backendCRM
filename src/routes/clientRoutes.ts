import { Router } from "express";

import ClientController from "../controllers/clientController";

const router = Router();

router.get("/clients/profile/:profile", ClientController.getClientByProfile);
router.get("/clients", ClientController.allclients);
router.get("/clients/tele", ClientController.getTelemarketer);
router.post("/Createclients/:profile", ClientController.createClient);
// router.post("/Checkclients", ClientController.checkclient);
// router.get("/getclientbyID/:id", ClientController.getclientbyID);

export const clientRoutes = router;
