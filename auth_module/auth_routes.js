import { Router } from "express";  
import { signup, signin} from "./auth_controllers.js"; 
import { upload,compressImage } from "../middlewares/image_compressor.js";

const routes = Router() 

routes.post("/signup", upload.single('avatar'), compressImage('avatar', { width: 50, height: 50, quality: 80 }),signup)
 
routes.post("/signin", signin)

export default routes