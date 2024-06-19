// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();


// class EmployeeController {
//     async Address(req: Request, res: Response): Promise<void> {
//       try {
//         const employee = await prisma.cr.findMany({
//          select:{
//           citymunDesc: true,
//          }
//         });
//         console.log("Fetch success", address);
//         res.status(200).json(address);
//       } catch (err) {
//         console.error("Error retrieving branches:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     }



// }

// export default  new EmployeeController()