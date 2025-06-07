import express from 'express'
import {createProduct, deleteProduct, getAdminCreateProducts, getProduct, getSingleProduct, updateProduct} from '../../controllers/adminControllers/product.controller.js'
import { isAuthMiddleware } from '../../middleware/secure.middleware.js'

const router = express.Router()


router.post("/create",isAuthMiddleware,createProduct)
router.put("/updates/:id",isAuthMiddleware,updateProduct)
router.delete("/delete/:id",isAuthMiddleware,deleteProduct)
router.get("/get",isAuthMiddleware,getProduct)
router.get("/get/my-products",isAuthMiddleware,getAdminCreateProducts)
router.get("/get/single/:id",isAuthMiddleware,getSingleProduct)


export default router 