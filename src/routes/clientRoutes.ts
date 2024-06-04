import { Router } from "express";

import ClientController from "../controllers/clientController";

    



const router = Router();


router.get("/clients", ClientController.allclients)
router.get("/clients/tele", ClientController.getTelemarketer)
router.post("/clients", ClientController.createClient)




export const clientRoutes = router