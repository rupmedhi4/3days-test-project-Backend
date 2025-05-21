import express from 'express'
import { createProduct,updateProduct,deleteProduct } from '../controllers/product.controller.js'
import { isAuthMiddleware } from '../middleware/secure.middleware.js'

const router = express.Router()


router.post("/create",isAuthMiddleware,createProduct)
router.put("/updates/:id",isAuthMiddleware,updateProduct)
router.delete("/delete/:id",isAuthMiddleware,deleteProduct)


export default router