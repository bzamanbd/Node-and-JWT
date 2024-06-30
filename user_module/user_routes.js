import { Router } from "express";
import { viewProfile, editProfile, fetchUsers,deleteUser} from "./user_controllers.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

const routes = Router() 

routes.get("/profile", authMiddleware, viewProfile)
routes.put("/profile", authMiddleware, editProfile)
routes.delete("/profile",authMiddleware,deleteUser)
routes.get("/users",authMiddleware, fetchUsers)

export default routes