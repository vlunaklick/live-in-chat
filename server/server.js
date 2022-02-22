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
	origin: 'https://live-in-chat.vercel.app',
	credentials: true,
	optionSuccessStatus: 200,
	exposedHeaders: 'Authorization',
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.set('port', 3005 || process.env.PORT)

app.use('/users', userRouter)
app.use('/chats', chatRouter)
app.use('/messages', messageRouter)

/* Api listener */

app.listen(app.get('port'), () => {
	console.log(`Listening on port ${app.get('port')}`)
})
