import bcrypt from 'bcrypt'
import User from '../models/user.js'

export function saveUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    
    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : hashedPassword
    })
    user.save().then(
        ()=>{
            res.json({
                "message": "User saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                "message": "User not saved"
            })
        }
    )
}