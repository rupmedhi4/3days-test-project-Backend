import express from 'express'
import { placedOrder,getOrder, sellerGetOrder, orderUpdate, addAddress } from '../../controllers/clientControllers/client.order.controller.js'
import { isAuthMiddleware } from '../../middleware/secure.middleware.js'
const router = express.Router()

router.post('/placed/:id',isAuthMiddleware,placedOrder)
router.get('/get',isAuthMiddleware,getOrder)
router.get('/get/seller',isAuthMiddleware,sellerGetOrder)
router.put('/update/status/:id',isAuthMiddleware,orderUpdate)

router.post("/set",isAuthMiddleware,addAddress)


export default router