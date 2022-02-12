import express from 'express'
import { UserController } from '../controller/user.controller.js'

const router = express.Router()

router.post('/create', UserController.create)

export { router as userRouter }
