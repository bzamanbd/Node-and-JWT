import { Router } from "express";  
import { signup, signin} from "./auth_controllers.js";

const routes = Router() 

routes.post("/signup", signup) 
routes.post("/signin", signin)

export default routes