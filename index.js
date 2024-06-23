import express from "express" 
import 'dotenv/config' 

const app = express() 
const port = process.env.PORT || 3005 

app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))