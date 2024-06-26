import prisma from "../db_client/prisma_client.js"

export const createPost = async (req,res)=>{
    const {title,description} = req.body 
    const userId = req.userId
    try {
        if (!userId) {
            return res.status(401).status({ 
                message:"Authorization Required. Please login to create post"
            })
        }
        const post = await prisma.post.create({
            data: { title,description,userId}
            })
        return res.status(201).json({ 
            message:"Post created successfully", 
            post
        })
    } catch (e) {
        return res.status(500).json({ 
            error:"Something went wrong", 
            e
        })
    }
}


export const fetchPosts = async(req,res)=>{  
    try {
        const posts  = await prisma.post.findMany({})
        return res.status(200).json({ 
            message: `Total ${posts.length} posts found`, 
            posts
        })
    } catch (e) {
        return res.status(500).json({ 
            error:"Something went wrong", 
            e
        })
    }
    
}

export const viewPost = async (req,res)=>{
    try {
        const post = await prisma.post.findUnique({where:{id}})
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


export const deleteUser = async (req,res)=>{ 
    try { 
        const user = await prisma.user.findUnique({where:{id:req.userId}}) 
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        await prisma.user.delete({where:{id:req.userId}})
        return res.status(200).json({ 
            message:"User deleted successfully"
        })
    } catch (e) {
        return res.status(500).json({ error:"Something went wrong"}) 
    }
}
