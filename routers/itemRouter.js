import express from 'express'
import { saveItem } from '../controllers/itemController.js'

const itemRouter = express.Router()
itemRouter.post("/",saveItem)

export default itemRouter