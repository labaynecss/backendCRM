import { Router } from "express";

import ProductController from  "../controllers/productController"
import Authorization from "../services/Authorization";



const router = Router();


router.get("/product",Authorization.authorized, ProductController.productlist)


export const productRoutes = router