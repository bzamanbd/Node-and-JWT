import { Router } from "express";
import { profile } from "./user_controllers.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

const routes = Router() 

routes.get("/profile", authMiddleware, profile)

export default routes