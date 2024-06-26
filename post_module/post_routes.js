import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { createPost,fetchPosts } from "./post_controllers.js";

const routes = Router() 

routes.get("/",fetchPosts)
routes.post("/post", authMiddleware,createPost)


export default routes