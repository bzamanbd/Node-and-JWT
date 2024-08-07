import express from "express" 
import 'dotenv/config' 
import routes from "./routes/index.js" 
import path from "path"
const app = express() 
const port = process.env.PORT || 3005 


// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/public", express.static(path.join(path.resolve(), "public")));

app.get("/", (req,res)=>{ 
    res.status(200).json({ 
        message:"Welcome to our app. This is home route of the app"
    })
})

app.use(routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });
const server = app.listen(port,()=>console.log(`server runs on http://localhost:${port}`))
server.timeout = 120000; // 2 minutes