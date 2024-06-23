import prisma from "../db_client/prisma_client.js"
import bcrypt from "bcryptjs"


export const createUser = async(req, res)=>{ 
const {name,email,password} = req.body 
const hashedPass = await bcrypt.hash(password, 10)
try { 
    const findUser = await prisma.user.findUnique({ where:{email}}) 
    if (findUser) {
        return res.status(401).json({ 
            message:`${email} already in used. Please try with other email`
        })
    }
    const user = await prisma.user.create({ 
        data:{name,email,password:hashedPass}
    })
    res.status(201).json({ 
        message:"Account is created", 
        user
    })
} catch (e) {
    res.status(500).json({ 
        error:"Something went wrong!", 
        e
    })
}
}

export const login = async(req,res)=>{ 
    const {email,password} = req.body
    try {
        const user = await prisma.user.findUnique({ where:{email}})
        if (user && await bcrypt.compare(password, user.password)) {
        }        
    } catch (e) {
        res.status(500).json({ 
            error:"Something went wrong!", 
            e
        })
    } 

}