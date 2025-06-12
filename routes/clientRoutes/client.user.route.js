import express from 'express'
import { getUser, login, signup } from '../../controllers/clientControllers/client.user.controller.js'
import { isAuthMiddleware,isLogin } from '../../middleware/secure.middleware.js'

const router = express.Router()


router.post('/user/signup',isLogin,signup)
router.post('/user/login',isLogin,login)
// router.post('/user/logout',logout)
router.get('/user/data',isAuthMiddleware,getUser)


export default router