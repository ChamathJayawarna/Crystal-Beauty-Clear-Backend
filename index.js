import bodyParser from 'body-parser'
import express from 'express'

const app = express()
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