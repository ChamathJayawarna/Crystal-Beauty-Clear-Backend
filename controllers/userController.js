import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

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
                message: "User saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "User not saved"
            })
        }
    )
}
export function getAllUsers(req,res){
    User.find().then(
        (users)=>{
            res.json(users)
        }
    ).catch(
        ()=>{
            res.json({
                message:"An error occured"
            })
        }
    )
}
export function loginUser(req,res){
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email : email
    }).then(
        (user)=>{
            if(user == null){
                res.json({
                    message: "Invalid email"
                })
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){
                    const userData = {
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        phoneNumber : user.phoneNumber,
                        isDisabled : user.isDisabled,
                        isEmailVerified : user.isEmailVerified
                    }
                    const token = jwt.sign(userData,"secretKey123")
                    res.json({
                        message: "User logged in successfully",
                        token : token
                    })
                }else{
                    res.json({
                        message: "Invalid password"
                    })
                }
            }
        }
    )
}