import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function decodeUser(req,res,next){
        const header = req.header("Authorization")
        if(header != null){
            const token = header.replace("Bearer ","")           
            jwt.verify(token,process.env.JWT_SECRETKEY,(err,decoded)=>{
                if(decoded != null){
                    req.user = decoded
                }
            })            
        }
        next()
    }