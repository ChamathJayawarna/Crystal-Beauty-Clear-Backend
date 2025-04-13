import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import itemRouter from './routers/itemRouter.js'
import userRouter from './routers/userRouter.js'
import jwt from 'jsonwebtoken'

const app = express()

mongoose.connect("mongodb+srv://admin:123@cluster0.89fe1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("Database connected successfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)
app.use(bodyParser.json())
app.use(
    (req,res,next)=>{
        const header = req.header("Authorization")
        if(header != null){
            const token = header.replace("Bearer ","")           
            jwt.verify(token,"secretKey123",(err,decoded)=>{
                if(decoded != null){
                    req.user = decoded
                }
            })            
        }
        next()
    }
)

app.listen(5000,()=>{
    console.log("The server is running on port 5000")
})

app.use("/api/item",itemRouter)
app.use("/api/user",userRouter)
