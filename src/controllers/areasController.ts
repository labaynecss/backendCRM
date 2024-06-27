// src/controllers/branchController.ts
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// class AreaController {
//   async collectionCompany(req: Request, res: Response): Promise<void> {
//     try {
//       const company = await prisma.crm_collectionCompany.findMany({
//        take: 500
//       });
//       console.log("Fetch success", company);
//       res.status(200).json(company);
//     } catch (err) {
//       console.error("Error retrieving branches:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   async collectionArea(req: Request, res: Response): Promise<void> {
//     try {
//       const area = await prisma.crm_collectionArea.findMany();
//       console.log("Fetch success", area);
//       res.status(200).json(area);
//     } catch (err) {
//       console.error("Error retrieving branches:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   async areas(req: Request, res: Response): Promise<void> {
//     const page = parseInt(req.query.page as string, 10) || 1;
//     const perPage = 15;
//     const skip = (page - 1) * perPage;

//     if (isNaN(page) || page < 1) {
//       res.status(400).json({ error: "Invalid page number" });
//       return;
//     }
//   }

//   async collectionAreaJoin(req: Request, res: Response): Promise<void> {
//     try {
//       const areas = await prisma.crm_collectionCompany.findMany({
//         include: {
//           crm_collectionArea: {
//             include: {
//               crm_address_citymunicipality: true,
//             },
//           },
//         },
//       });
  
//       const flattened = areas.map(area => {
//         return area.crm_collectionArea.map(collectionArea => ({
//           collection_id: area.collection_id,
//           collection_company: area.collection_company,
//           area_id: collectionArea.area_id,
//           citymunDesc: collectionArea.crm_address_citymunicipality.citymunDesc,
//           citymuncode: collectionArea.crm_address_citymunicipality.citymuncode,
//         }));
//       }).flat();
  
//       console.log("Fetch success", flattened);
//       res.status(200).json(flattened);
//     } catch (err) {
//       console.error("Error retrieving branches:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
  

  //   try {
  //     const count = await prisma.areas.count();
  //     const response = await prisma.areas.findMany({
  //       take: perPage,
  //       skip: skip,
  //       orderBy: {
  //         ID: "desc",
  //       },
  //     });

  //     res.status(200).json({ areas: response, perPage, count });
  //   } catch (err) {
  //     console.error("Error retrieving areas:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  // async createAreas(req: Request, res: Response): Promise<void> {
  //   const { zone, area, deleted } = req.body;

  //   try {
  //     const newArea = await prisma.areas.create({
  //       data: {
  //         ZONE_AREACODE: zone ?? "",
  //         area: area,
  //         deleted: deleted ?? false,
  //       },
  //     });

  //     res.status(201).json({ message: "Areas created successfully", newArea });
  //   } catch (err) {
  //     console.error("Error creating areas:", err);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

  // async getAreaById(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   try {
  //     const area = await prisma.areas.findUnique({
  //       where: { ID: Number(id) },
  //       select: {
  //         area: true,
  //       },
  //     });

  //     if (!area) {
  //       res.status(404).json({ error: "area not found" });
  //       return;
  //     }

  //     res.status(200).json(area);
  //   } catch (err) {
  //     console.error("Error retrieving branch:", err);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

  // async updateArea(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;
  //   const { zone, area, deleted } = req.body;

  //   try {
  //     const existingArea = await prisma.areas.findUnique({
  //       where: { ID: Number(id) },
  //     });

  //     if (!existingArea) {
  //       res.status(404).json({ error: "area not found" });
  //       return;
  //     }

  //     const updatedarea = await prisma.areas.update({
  //       where: { ID: Number(id) },
  //       data: {
  //         ZONE_AREACODE: zone ?? "",
  //         area: area,
  //         deleted: deleted ?? false,
  //       },
  //     });

  //     res
  //       .status(200)
  //       .json({ message: "Area updated successfully", updatedarea });
  //   } catch (err) {
  //     console.error("Error updating branch:", err);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  
// }

// export default new AreaController();
