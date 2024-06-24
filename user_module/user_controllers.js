import prisma from "../db_client/prisma_client.js"

export const viewProfile = async (req,res)=>{
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

export const editProfile = async (req,res)=>{ 
    const playload = req.body 
    const id = req.userId
    try {
        const oldUser = await prisma.user.findUnique({where:{id}})
        if (oldUser) {
            const user = await prisma.user.update({ 
                where:{ id:oldUser.id}, 
                data:playload
            })
            return res.status(200).json({
                message:"Your profile is updated", 
                user
            })
        }
        res.status(404).json({message:"User not found"})
    } catch (e) {
        res.status(500).json({
            error:"Something went wrong",
            e
        })
    }
}