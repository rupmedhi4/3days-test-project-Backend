import express from 'express'
import { signup,login, logout } from '../controllers/user.controller.js'
import { isAuthMiddleware, isLogin } from '../middleware/secure.middleware.js'
const router = express.Router()


router.post('/signup',isLogin,signup)
router.post('/login',isLogin,login)
router.post('/logout',isAuthMiddleware,logout)


export default router