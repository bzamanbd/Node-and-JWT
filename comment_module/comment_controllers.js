import prisma from "../db_client/prisma_client.js"

export const createComment = async (req, res) => {
    const {postId, comment } = req.body
    const userId = req.userId
    try {
        const post = await prisma.post.findUnique({ where:{ id:Number(postId)}}) 
        //   * Increase the comment counter
        await prisma.post.update({
            where: {id: post.id},
        data: {commentCount: {increment: 1}}
    })
    const newComent = await prisma.comment.create({ 
        data:{ 
            userId, 
            postId:post.id, 
            comment
        }
    })
    res.status(201).json({ 
        message:"New comment is created", 
        newComent
    })  
    } catch (err) {
        res.status(500).json({ 
            error:"Something went wrong", 
            err
        })
    }

  }

export const viewComment = async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({ 
            where:{ id: req.userId },
            include:{ 
                post:{ 
                    select:{ 
                        title:true, 
                        commentCount:true,
                    }
                },
            }
        })
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

export const editComment = async (req,res)=>{ 
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

export const fetchComments = async(req,res)=>{ 
    try {
        const comments = await prisma.comment.findMany({})
        if (comments.length < 1) {
            return res.status(200).json({ 
                message : "No comment available", 
                comments
            })
        }
        return res.status(200).json({ 
            message:`Total ${comments.length} comment found`, 
            comments
        })
    } catch (e) {
        return res.status(500).json({ 
            error:"Something went wrong", 
            e
        })
    }
    
}

export const deleteComment = async (req,res)=>{ 
    const commentId = req.params.id
    const userId = req.userId
    try { 
        const comment = await prisma.comment.findUnique({
            where:{
                id:Number(commentId), 
                userId,
            }
        }) 
        if (!comment) {
            return res.status(404).json({message:"Comment not found"})
        }
        await prisma.comment.delete({where:{id:comment.id}})
        return res.status(200).json({ 
            message:"Comment is deleted successfully"
        })
    } catch (e) {
        return res.status(500).json({ error:"Something went wrong"}) 
    }
}
