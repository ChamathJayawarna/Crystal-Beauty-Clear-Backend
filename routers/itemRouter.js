import express from 'express'
import { getAllItems, saveItem } from '../controllers/itemController.js'

const itemRouter = express.Router()
itemRouter.post("/",saveItem)
itemRouter.get("/",getAllItems)

export default itemRouter