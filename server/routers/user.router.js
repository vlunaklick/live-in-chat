import express from 'express'
import { UserController } from '../controller/user.controller.js'

const router = express.Router()

router.post('/create', UserController.create)
router.post('/login', UserController.login)

export { router as userRouter }
