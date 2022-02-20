import express from 'express'
import { MessageController } from '../controller/message.controller.js'
import { isAuth } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

/* Create a message */

router.post('/create', isAuth, MessageController.create)

/* See user message */

router.post('/:chatId', isAuth, MessageController.getConversation)

/* Delete user message */

router.post('/delete/message', isAuth, MessageController.delete)

/* Don't show user message */

router.put('/delete/:messageId', isAuth, MessageController.dontShow)

export { router as messageRouter }
