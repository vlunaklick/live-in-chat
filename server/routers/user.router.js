import express from 'express'
import { UserController } from '../controller/user.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

/* Create an user */

router.post('/create', UserController.create)

/* Login */

router.post('/login', UserController.login)

/* See if is auth */

router.get('/me', isAuth, UserController.user)

export { router as userRouter }
