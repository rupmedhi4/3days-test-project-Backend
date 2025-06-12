import express from 'express'
import {createProduct, deleteProduct, getAdminCreateProducts, getProduct, getSingleProduct, updateProduct} from '../../controllers/adminControllers/product.controller.js'
import { isAdminAuthMiddleware } from '../../middleware/secure.middleware.js'
import { orderUpdate } from '../../controllers/clientControllers/client.order.controller.js'

const router = express.Router()


router.post("/create",isAdminAuthMiddleware,createProduct)
router.put("/updates/:id",isAdminAuthMiddleware,updateProduct)
router.delete("/delete/:id",isAdminAuthMiddleware,deleteProduct)
router.get("/get",isAdminAuthMiddleware,getProduct)
router.get("/get/my-products",isAdminAuthMiddleware,getAdminCreateProducts)
router.get("/get/single/:id",isAdminAuthMiddleware,getSingleProduct)

router.put('/update/status/:id',isAdminAuthMiddleware,orderUpdate)



export default router 