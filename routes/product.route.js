import express from 'express'
import { createProduct } from '../controllers/product.controller.js'
import { isAuthMiddleware } from '../middleware/secure.middleware.js'

const router = express.Router()


router.post("/create",isAuthMiddleware,createProduct)


export default router