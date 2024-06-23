import { Router } from "express";  
import { createUser } from "./auth_controllers.js";

const routes = Router() 

routes.post("/", createUser) 

export default routes