import express from 'express'
import { placedOrder,getOrder } from '../../controllers/clientControllers/client.order.controller.js'
import { isAuthMiddleware } from '../../middleware/secure.middleware.js'
const router = express.Router()

router.post('/placed/:id',isAuthMiddleware,placedOrder)
router.get('/get',isAuthMiddleware,getOrder)


export default router