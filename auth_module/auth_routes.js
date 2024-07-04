import { Router } from "express";  
import { signup, signin} from "./auth_controllers.js"; 
import { upload } from "../middlewares/multer_middleware.js";

const routes = Router() 

routes.post("/signup", upload.single('avatar'), signup)
 
routes.post("/signin", signin)

export default routes