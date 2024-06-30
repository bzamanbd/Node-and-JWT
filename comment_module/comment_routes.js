import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { createComment,fetchComments,deleteComment} from "./comment_controllers.js";

const routes = Router() 

routes.post("/comment",authMiddleware, createComment)
routes.delete("/comment:id",authMiddleware, deleteComment)
routes.get("/", authMiddleware, fetchComments)


export default routes