import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { createPost,fetchPosts,viewPost,editPost,deletePost,searchPost} from "./post_controllers.js";
import { imagesUpload, imagesCompressor } from "../middlewares/images_uploader.js";



const routes = Router() 

routes.get("/",authMiddleware,fetchPosts) 
routes.get("/search",authMiddleware,searchPost)
routes.get("/:id", authMiddleware,viewPost) 
routes.put("/:id",authMiddleware, editPost) 
routes.delete("/:id",authMiddleware, deletePost) 
// routes.post("/post", authMiddleware, upload.array('images',10), createPost)
routes.post("/post", authMiddleware, imagesUpload.array('images',10), imagesCompressor('images',{ width: 50, height: 50, quality: 80 },"public/post") ,createPost)

export default routes