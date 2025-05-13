import express from 'express'
import { getAllUsers, googleLogin, loginUser, saveUser } from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.post("/",saveUser)
userRouter.get("/",getAllUsers)
userRouter.post("/login",loginUser)
userRouter.post("/google",googleLogin)

export default userRouter