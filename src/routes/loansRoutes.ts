import { Router } from "express";
import LoansController from "../controllers/loansController";
import Authorization from "../services/Authorization";
import FileController from "../controllers/FileController";
import upload from "../services/multerconfig";


const router = Router();



router.get("/loans",Authorization.authorized, LoansController.listofLoans);
router.patch("/clients/:profile",Authorization.authorized, LoansController.updateProduct);
router.post('/fileupload', upload.array('files'), FileController.UploadFile);
router.get ('/documents/:loanprofile', FileController.Documents )
router.put('/loans/:profile/:loanprofile',Authorization.authorized, LoansController.BorrowerInformation);


export const loansRoutes = router;
77958