import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

const prisma = new PrismaClient();

class FileController {
  async Documents(req: Request, res: Response): Promise<void> {
    try {
      const documents = await prisma.crm_documentUploaded.findMany({
        select: {
          file_category: true,
          file_directory: true,
        }
      });
      console.log("Fetch success", documents);
      res.status(200).json(documents);
    } catch (err) {
      console.error("Error retrieving documents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async UploadFile(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const { loanprofile, file_category, document_verified, 
        document_verifiedby, createdby, updatedby } = req.body;

      const uploadedFiles = [];
      for (const file of files) {
        const newDocument = await prisma.crm_documentUploaded.create({
          data: {
            loanprofile,
            file_category ,
            filename: file.originalname,
            file_directory: path.join('uploads', file.filename),
            document_verified,
            document_verifiedby,
            createdby,
            createddatetime: new Date(),
            updatedby,
            updateddatetime: new Date(),
          },
        });
        uploadedFiles.push(newDocument);
      }

      res.status(200).json({
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      });
    } catch (err) {
      console.error("Error uploading files:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FileController();
