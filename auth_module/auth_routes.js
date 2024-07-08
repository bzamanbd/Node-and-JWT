import { Router } from "express";  
import { signup, signin} from "./auth_controllers.js"; 
import { singleUploader, singleCompressor } from "../middlewares/single_image_uploader.js";

const routes = Router() 

routes.post("/signup", singleUploader.single('avatar'), singleCompressor('avatar', { width: 50, height: 50, quality: 80 },'public/avatar'),signup)
 
routes.post("/signin", signin)

export default routes