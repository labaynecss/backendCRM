import { Router } from "express";

import AddressController from "../controllers/addressController";
import Authorization from "../services/Authorization";
 "../controllers/clientController";



const router = Router();

router.get("/address",Authorization.authorized ,AddressController.Address)
router.post("/address", AddressController.createAddress)


export const addressRoutes = router