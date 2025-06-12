import express from 'express'
import { signup,login, logout } from '../../controllers/adminControllers/user.controller.js'
import { isAdminAuthMiddleware, isAdminLogin, isAuthMiddleware, isLogin } from '../../middleware/secure.middleware.js'
const router = express.Router()


router.post('/signup',isAdminLogin,signup)
router.post('/login',isAdminLogin,login)
router.post('/logout',isAdminAuthMiddleware,logout)


export default router