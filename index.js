import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

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

app.listen(5000,()=>{
    console.log("The server is running on port 5000")
})

app.get("/",(req,res)=>{
    console.log(req.body)

    res.json({
        "message": "This is response"
    })
})