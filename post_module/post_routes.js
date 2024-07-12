import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { createPost,fetchPosts,viewPost,editPost,deletePost,searchPost} from "./post_controllers.js"

import { mediaUploader, mediaProcessor } from "../middlewares/media_uploader.js";

const routes = Router() 

routes.get("/",authMiddleware,fetchPosts) 
routes.get("/search",authMiddleware,searchPost)
routes.get("/:id", authMiddleware,viewPost) 
routes.put("/:id",authMiddleware, editPost) 
routes.delete("/:id",authMiddleware, deletePost) 
routes.post("/post", authMiddleware,mediaUploader.fields([{name:'images',maxCount:5},{name:'videos',maxCount:3}]),mediaProcessor,createPost)
export default routes