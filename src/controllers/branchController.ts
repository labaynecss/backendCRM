
import prisma from "../utils/db";
import  {Request , Response } from "express"

const allbranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const branches = await prisma.branch.findMany();
        console.log("fetch success",allbranches);
        res.status(200).json(branches);
    } catch (err) {
        console.error('Error retrieving branches:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const branches = async (req: Request, res: Response): Promise<void> => {

    const page = parseInt(req.params.page, 20)
    const perPage = 20
    const skip = (page - 1 ) * perPage;
    
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: 'Invalid page number' });
        return;
    }

    try {
        const count  = await prisma.branch.count();
     const response = await prisma.branch.findMany({
         take: perPage,
         skip: skip,    
         orderBy: {
             ID: "desc"
         }
         
     });
     console.log("fetch success",branches);
        res.status(200).json({branches: response, perPage, count});
    } catch (err) {
        console.error('Error retrieving branches:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createBranch = async (req: Request, res: Response): Promise<void> => {

    const {branch, area, info, deleted, date } = req.body 
    try {
        const create = prisma.branch.create({
            data: {
                branch: branch,
                area: area,
                info: info,
                owner: '',
                deleted: deleted ?? 0,
                date: date ?? new Date()

            }
            
        })
        res.status(200).json({message: "Created Branch Successfully" ,create})
    } catch (err) {
        console.error(err);
 res.status(500).json({ message: "Internal Server Error" });
    }
}





export {allbranches, branches, createBranch}