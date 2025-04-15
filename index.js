import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import itemRouter from './routers/itemRouter.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import { decodeUser } from './middleware/auth.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB_URL).then(
    ()=>{
        console.log("Database connected successfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)
app.use(bodyParser.json())
app.use(decodeUser)

app.listen(5000,()=>{
    console.log("The server is running on port 5000")
})

app.use("/api/item",itemRouter)
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
