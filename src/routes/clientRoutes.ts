import { Router } from "express";

import ClientController from "../controllers/clientController";
// import { checkClientValidationRules, validate} from "../validations/clientValidation";

    



const router = Router();


router.get("/clients", ClientController.allclients)
router.post("/clients", ClientController.checkclient)



export const clientRoutes = router