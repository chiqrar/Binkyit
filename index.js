import express from "express"
import cors from "cors"
 import dotenv from "dotenv"
 import cookiparser from "cookie-parser"
 import morgan from "morgan"
 import helmet from "helmet"
import connectDB from "./config/Connectdb.js"
import userRouter from "./route/user.route.js"
    


dotenv.config()
 const app = express()
  app.use(express.json())
  app.use(cookiparser())
  app.use(morgan())
  app.use(helmet({
    crossOriginResourcePolicy:false,

  }))
  app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
  }))
   //....... roterr ko y handle kiyyaaa...


   app.use ('/api/user',userRouter)

  app.get("/",(req,res)=>{
    res.status(200).json({mesaage:"server is running" +PORT})
  })
  

  const PORT = 4507 || process.env.PORT
 
  connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running",PORT)
      })
  })

 