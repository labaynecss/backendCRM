import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SchoolController {

  async schoolList(req: Request, res: Response): Promise<void> {
    try {
      // const {school_name } = req.body
      const lists = await prisma.crm_schools.findMany({
      // where:{
      //   school_name: {
      //     contains: school_name
      //   }
      // },
      select: {
        school_name: true
      }
   
      });
      console.log("Fetch success", lists);
      res.status(200).json(lists);
    } catch (err) {
      console.error("Error retrieving schoollist:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async courselist(req: Request, res: Response): Promise<void> {
    try {
      // const {course_description} = req.body
      const courses = await prisma.crm_course.findMany({
        // where:{
        //   course_description: {
        //     contains: course_description
        //   }
        // },
       select:{
          course_id: true,
          course_description: true
       }
      });
      console.log("Fetch success", courses);
      res.status(200).json(courses);
    } catch (err) {
      console.error("Error retrieving course:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async createAddress(req: Request, res: Response): Promise<void> {
  //   const { zipcode, province, city, status } = req.body;

  //   try {
  //     const address = await prisma.crm_address_citymunicipality.create({
  //       data: {
  //         ZIP_CODE: zipcode,
  //         PROVINCE: province,
  //         CITY: city,
  //         STATUS: status ?? 0,
  //       },
  //       select: {
  //         ZIP_CODE: true,
  //         PROVINCE: true,
  //         CITY: true,
  //         STATUS: true,
  //         DATE: true,
  //       },
  //     });
  //     res
  //       .status(201)
  //       .json({ message: "Created Address Successfully", address });
  //   } catch (err) {
  //     console.error("Error retrieving client:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
}
export default new SchoolController();
