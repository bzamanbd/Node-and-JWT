import { Router } from "express"; 

import authRoutes from "../auth_module/auth_routes.js"

const router = Router() 

router.use("/api/auth", authRoutes)

export default router