import express from 'express'
import { deleteProduct, getAllProducts, saveProduct, updateProduct } from '../controllers/productController.js'

const productRouter = express.Router()
productRouter.post("/",saveProduct)
productRouter.get("/",getAllProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

export default productRouter
