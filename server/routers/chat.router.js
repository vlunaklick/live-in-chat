import express from 'express'
import { ChatController } from '../controller/chat.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

/* Create a chat */

router.post('/create', isAuth, ChatController.create)

/* See user last chats */

router.get('/:userId', isAuth, ChatController.userLastChats)

export { router as chatRouter }
