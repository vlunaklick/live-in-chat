import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/* Import routers */

import { userRouter } from './routers/user.router.js'
import { chatRouter } from './routers/chat.router.js'
import { messageRouter } from './routers/message.router.js'

/* Create express app */

const app = express()

/* Express */

app.use(express.json())

const corsOptions = {
	origin: `${process.env.CLIENT_URL}`,
	credentials: true,
	optionSuccessStatus: 200,
	exposedHeaders: 'Authorization',
}

app.use(cors(corsOptions))

app.use(cookieParser())
const PORT = process.env.PORT || 3005

app.use('/users', userRouter)
app.use('/chats', chatRouter)
app.use('/messages', messageRouter)

/* Api listener */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
