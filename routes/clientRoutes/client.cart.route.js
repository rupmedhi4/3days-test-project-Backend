import express from 'express'
import {  addAddress, addToCart, getAddToCart, deleteAddToCartItem } from '../../controllers/clientControllers/client.order.controller.js'
import { isAuthMiddleware } from '../../middleware/secure.middleware.js'
const router = express.Router()



router.post("/address/set",isAuthMiddleware,addAddress)
router.post("/add-to-cart/:id",isAuthMiddleware,addToCart)
router.get("/get/add-to-cart",isAuthMiddleware,getAddToCart) 
router.delete("/delete/add-to-cart/:id",isAuthMiddleware,deleteAddToCartItem) 


export default router 