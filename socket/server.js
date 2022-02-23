/* Socket io imports */

import { Server } from 'socket.io'
import { createServer } from 'http'

/* Socket */

const httpServer = createServer()

const io = new Server(httpServer, {
	cors: {
		origins: `${process.env.CLIENT_URL}`,
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
			io.emit('getUsers', users)
		}
	})

	//when an user send message
	socket.on('sendMessage', ({ receiverId, message }) => {
		const receiver = findUser(receiverId)
		if (receiver) {
			io.to(receiver.socketId).emit('getMessage', message)
		}
	})

	// delete an user message
	socket.on('deleteMessage', ({ receiverId, messageId }) => {
		const receiver = findUser(receiverId)
		if (receiver) {
			io.to(receiver.socketId).emit('getDeleteMessage', messageId)
		}
	})

	socket.on('createChat', ({ receiverId }) => {
		const receiver = findUser(receiverId)
		if (receiver) {
			io.to(receiver.socketId).emit('getCreatedChat', receiverId)
		}
	})

	// when user is typing
	socket.on('isTyping', ({ receiverId, chatId }) => {
		const receiver = findUser(receiverId)
		if (receiver) {
			io.to(receiver.socketId).emit('getIsTyping', {
				success: true,
				chatId: chatId,
			})
		}
	})

	// when user stop typing
	socket.on('stopTyping', ({ receiverId, chatId }) => {
		const receiver = findUser(receiverId)
		if (receiver) {
			io.to(receiver.socketId).emit('getIsTyping', {
				success: false,
				chatId: chatId,
			})
		}
	})

	// when an user logouts
	socket.on('userDisconnects', () => {
		removeUser(socket.id)
		io.emit('getUsers', users)
	})

	//when a user disconnects
	socket.on('disconnect', () => {
		removeUser(socket.id)
		io.emit('getUsers', users)
	})
})

/* Socket listener */

httpServer.listen(process.env.PORT || 3010)
