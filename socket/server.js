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

let users = []

const addUser = (userEmail, socketId) => {
	if (!users.some(user => user.userEmail === userEmail)) {
		users.push({ userEmail: userEmail, socketId: socketId })
	}
}

const removeUser = socketId => {
	users = users.filter(user => user.socketId !== socketId)
}

const findUser = userId => {
	let user = users.filter(user => {
		if (user.userEmail === userId) {
			return user
		}
	})
	return user[0]
}

io.on('connection', socket => {
	//when an user login
	socket.on('userConnection', userEmail => {
		if (userEmail !== null) {
			addUser(userEmail, socket.id)
		}
	})

	//when an user send message
	socket.on('sendMessage', ({ receiverId, message }) => {
		const receiver = findUser(receiverId)
		io.to(receiver.socketId).emit('getMessage', message)
	})

	// when an user logouts
	socket.on('userDisconnects', () => {
		removeUser(socket.id)
	})

	//when a user disconnects
	socket.on('disconnect', () => {
		removeUser(socket.id)
	})
})

/* Socket listener */

httpServer.listen(process.env.PORT || 3010)
