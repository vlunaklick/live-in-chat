import express from 'express'
import { MessageController } from '../controller/message.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

/* Create a message */

router.post('/create', isAuth, MessageController.create)

/* See user message */

router.get('/:chatId', isAuth, MessageController.getConversation)

export { router as messageRouter }
