import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FileController {
  async Documents(req: Request, res: Response): Promise<void> {
    try {
      const { loanprofile } = req.params;
      const documents = await prisma.crm_documentUploaded.findMany({
        where: {
          loanprofile: loanprofile,
        },
        select: {
          file_category: true,
          file_directory: true,
          loanprofile: true,
        },
      });
      const documentsWithUrls = documents.map((doc) => ({
        ...doc,
        file_directory: `${req.protocol}://${req.get("host")}${
          doc.file_directory
        }`,
      }));
      // const documentsWithUrls = documents.map((doc) => ({
      //   ...doc,
      //   file_directory: `${req.protocol}://${req.get("host")}/${
      //     doc.file_directory
      //   }`,
      // })); // for deployment
      res.status(200).json(documentsWithUrls);
    } catch (err) {
      console.error("Error retrieving documents:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async UploadFile(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ message: "No files uploaded" });
        return;
      }

      const {
        loanprofile,
        file_category,
        document_verified,
        document_verifiedby,
        createdby,
        updatedby,
      } = req.body;

      const uploadedFiles = [];
      for (const file of files) {
        const newDocument = await prisma.crm_documentUploaded.create({
          data: {
            loanprofile,
            file_category,
            filename: file.originalname,
            file_directory: `/uploads/${file.filename}`,
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
        message: "Files uploaded successfully",
        files: uploadedFiles,
      });
    } catch (err) {
      console.error("Error uploading files:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FileController();
