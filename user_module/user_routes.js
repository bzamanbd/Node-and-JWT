import { Router } from "express";
import { viewProfile, editProfile} from "./user_controllers.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

const routes = Router() 

routes.get("/profile", authMiddleware, viewProfile)
routes.put("/profile", authMiddleware, editProfile)

export default routes