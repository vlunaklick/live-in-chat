/* Socket io imports */

import { Server } from 'socket.io'
import { createServer } from 'http'

/* Socket */

const httpServer = createServer()

const io = new Server(httpServer, {
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

httpServer.listen(process.env.PORT || 3010)
