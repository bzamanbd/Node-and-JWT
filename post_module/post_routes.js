import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { createPost,fetchPosts,viewPost,editPost,deletePost } from "./post_controllers.js";

const routes = Router() 

routes.get("/",authMiddleware,fetchPosts) 
routes.get("/:id", authMiddleware,viewPost) 
routes.put("/:id",authMiddleware, editPost) 
routes.delete("/:id",authMiddleware, deletePost) 
routes.post("/post", authMiddleware,createPost)


export default routes