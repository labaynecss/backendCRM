import { Router } from "express";

import AddressController from "../controllers/addressController";
 "../controllers/clientController";



const router = Router();


router.get("/address", AddressController.getAddressList)
router.post("/address", AddressController.createAddress)


export const addressRoutes = router