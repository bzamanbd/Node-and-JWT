import { Router } from "express"; 
import authRoutes from "../auth_module/auth_routes.js" 
import userRoutes from "../user_module/user_routes.js"
import postRoutes from "../post_module/post_routes.js"
import commentRoutes from "../comment_module/comment_routes.js"

const router = Router() 

router.use("/api/auth", authRoutes) 
router.use("/api/user", userRoutes)
router.use("/api/posts", postRoutes)
router.use("/api/comments", commentRoutes)

export default router