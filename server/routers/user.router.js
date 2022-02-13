import express from 'express'
import { UserController } from '../controller/user.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('/me', isAuth)

export { router as userRouter }
