import { Router } from "express"
import { signup, signin} from "./auth_controllers.js"
import { avatarUploader, avatarProcessor } from "../middlewares/avatar_uploader.js"


const routes = Router() 

routes.post("/signup",avatarUploader,avatarProcessor,signup)
 
routes.post("/signin", signin)

export default routes