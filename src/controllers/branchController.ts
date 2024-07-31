
import prisma from "../utils/db";
import  {Request , Response } from "express"

const allbranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const {branch_description} = req.params
        const branches = await prisma.crm_branch.findMany({
            where: {
                branch_description: {
                    contains: branch_description
                }
            },
            select: {
                areaid: true,
                branch_code: true,
                branch_description: true,
                
            },
            take: 100
        });
        console.log("fetch branch",branches);
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
        const count  = await prisma.crm_branch.count();
     const response = await prisma.crm_branch.findMany({
         take: perPage,
         skip: skip,    
         orderBy: {
             id: "desc"
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

    const {branch_code, areaid, branch_description, branch_status, createdBy } = req.body 
    try {
        const create = prisma.crm_branch.create({
            data: {
                branch_code: branch_code,
                branch_description: branch_description,
                areaid: areaid,
                branch_status: branch_status,
                createdBy: createdBy ?? 0,
                createddatetime :  new Date()

            }
            
        })
        res.status(200).json({message: "Created Branch Successfully" ,create})
    } catch (err) {
        console.error(err);
 res.status(500).json({ message: "Internal Server Error" });
    }
}






export {allbranches, branches, createBranch}