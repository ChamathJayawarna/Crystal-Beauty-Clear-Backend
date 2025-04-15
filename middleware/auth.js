import jwt from 'jsonwebtoken'

export function decodeUser(req,res,next){
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