import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

class FileController {
  async Documents(req: Request, res: Response): Promise<void> {
    try {
      const documents = await prisma.crm_documentUploaded.findMany();
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
      if (!files) {
       res.status(400).json({ message: 'No files uploaded' });
      }

      // Process and save file information to the database
      const uploadedFiles = [];
      for (const file of files) {
        const newDocument = await prisma.crm_documentUploaded.create({
          data: {
          document_path: file.path,
          document_type: file.filename,
          document_verified: file.originalname,

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
