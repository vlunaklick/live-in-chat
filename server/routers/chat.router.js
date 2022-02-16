import express from 'express'
import { ChatController } from '../controller/chat.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

/* Create a */

router.post('/create', ChatController.create)

/* See user chats */

router.get('/:userId', ChatController.userChats)

export { router as chatRouter }
