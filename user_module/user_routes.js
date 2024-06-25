import { Router } from "express";
import { viewProfile, editProfile, fetchUsers} from "./user_controllers.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

const routes = Router() 

routes.get("/profile", authMiddleware, viewProfile)
routes.put("/profile", authMiddleware, editProfile)
routes.get("/users", fetchUsers)

export default routes