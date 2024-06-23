import express from "express" 
import 'dotenv/config' 
import routes from "./routes/index.js" 
const app = express() 
const port = process.env.PORT || 3005 

app.use(express.json())

app.get("/", (req,res)=>{ 
    res.status(200).json({ 
        message:"Welcome to our app. This is home route of the app"
    })
})

//===>Routes file<===///
app.use(routes)








app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))