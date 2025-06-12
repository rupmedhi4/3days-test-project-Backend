import express from 'express'
import { isAuthMiddleware } from '../../middleware/secure.middleware.js'
import { getClientSingleProduct, getProductAll } from '../../controllers/clientControllers/client.product.controller.js'
const router = express.Router()



router.get("/get/single/:id",isAuthMiddleware,getClientSingleProduct)
router.get("/get/all",isAuthMiddleware,getProductAll)



export default router 