
import { Router } from "express";
import AreasController from '../controllers/areasController';
    



const router = Router();

router.get("/collectionarea", AreasController.collectionArea)
router.get("/collectioncompany", AreasController.collectionCompany)
 router.get('/collectionjoin', AreasController.collectionAreaJoin);
// router.get("/area/:id", AreasController.getAreaById)
// router.post("/area", AreasController.createAreas)
// router.post("/area/:id", AreasController.updateArea)


export const areaRoutes = router