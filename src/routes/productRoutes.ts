import { Router } from "express";

import ProductController from  "../controllers/productController"



const router = Router();


router.get("/product", ProductController.productlist)


export const productRoutes = router