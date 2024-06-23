import prisma from "../db_client/prisma_client.js"

export const profile = async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({where:{ id: req.userId }})
        if (user) {
            return res.status(200).json({ 
                message:`${user.name}'s profile`, 
                user
            })
        }
        return res.status(404).json({ 
            error:"sorry user not found"
        })
        
    } catch (err) {
        return res.status(500).json({ 
            error:"Something went wrong", 
            err
        })
    }
}