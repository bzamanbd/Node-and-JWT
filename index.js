import express from "express" 
import 'dotenv/config' 
import dbDisconnect from './middlewares/db_disconnect.js'

const app = express() 
const port = process.env.PORT || 3005 

app.use(express.json())



app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))