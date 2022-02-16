import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/* Socket io imports */

import { Server } from 'socket.io'
import { createServer } from 'http'

/* Import routers */

import { userRouter } from './routers/user.router.js'
import { chatRouter } from './routers/chat.router.js'
import { messageRouter } from './routers/message.router.js'

/* Create express app */

const app = express()

/* Express */

app.use(express.json())

const corsOptions = {
	origin: 'http://localhost:3000',
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

/* Socket */

const server = createServer(app)

const io = new Server(server, {
	cors: {
		origins: 'http://localhost:3000/',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', socket => {
	console.log('a user connected')
})

io.on('disconnect', socket => {
	console.log('a user has disconnected')
})

/* Socket listener */

server.listen(3010)

/* Api listener */

app.listen(app.get('port'), () => {
	console.log(`Listening on port ${app.get('port')}`)
})
