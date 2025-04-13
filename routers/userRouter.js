import express from 'express'
import { getAllUsers, loginUser, saveUser } from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.post("/",saveUser)
userRouter.get("/",getAllUsers)
userRouter.get("/login",loginUser)

export default userRouter