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
            data: { title,description,userId }
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
        const posts  = await prisma.post.findMany({ 
           include:{ 
            comment:{ 
                select:{ 
                    id:true, 
                    comment:true, 
                    userId:true, 
                    createdAt:true, 
                    updatedAt:true,
                }
            }
           }, 
           orderBy:{ 
            id:"desc"
           },
        where:{ 
            commentCount:{ 
                gt:0,
            }
        }
        })
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
    const postId = req.params.id
    try {
        const post = await prisma.post.findUnique({
            where:{
            id:Number(postId)
        }, 
        include:{ 
            comment:{ 
                select:{ 
                    id:true, 
                    userId:true, 
                    comment:true, 
                    createdAt:true, 
                    updatedAt:true,
                }
            }
        }
    })
        if (!post) {
            return res.status(404).json({ 
                message:"Post not found"
            })
        }
        res.status(200).json({ 
            message:"Post found", 
            post
        })
    } catch (err) {
        res.status(500).json({ 
            error:"Something went wrong", 
            err
        })
    }
}

export const editPost = async (req,res)=>{ 
    const payload = req.body 
    const postId = req.params.id
    const userId = req.userId
    try {
        const oldPost = await prisma.post.findUnique({ 
            where:{
                id:Number(postId), 
                userId,
            }
        })
        if (!oldPost) {
            return res.status(404).json({ 
                message:"Post not found! You can update only your own post"
            })
        }
        const post = await prisma.post.update({ 
            where:{ 
                id:oldPost.id
            },
            data:payload 
        })
        res.status(200).json({ 
            message:"Post is updated successfully", 
            post
        })
    } catch (e) {
        res.status(500).json({
            error:"Something went wrong",
            e
        })
    }
}

export const deletePost = async (req,res)=>{ 
    const postId = req.params.id
    const userId = req.userId
    try { 
        const post = await prisma.post.findUnique({ 
            where:{
                id:Number(postId), 
                userId,
            }}) 
        if (!post) {
            return res.status(404).json({message:"Post not found"})
        }
        await prisma.post.delete({where:{ id:post.id }})
        return res.status(200).json({ 
            message:"Post is deleted successfully"
        })
    } catch (e) {
        return res.status(500).json({ error:"Something went wrong"}) 
    }
}
