import { Router } from "express";
import LoansController from "../controllers/loansController";
import Authorization from "../services/Authorization";
import multer from 'multer';
import FileController from "../controllers/FileController";


const router = Router();

// Configure multer to store files in 'uploads/' directory
const upload = multer({ dest: 'uploads/' });


router.get("/loans",Authorization.authorized, LoansController.listofLoans);
router.patch("/clients/:profile",Authorization.authorized, LoansController.updateProduct);
router.post("/fileupload", upload.array('files'), FileController.UploadFile);

export const loansRoutes = router;
