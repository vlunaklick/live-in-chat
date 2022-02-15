import { io } from 'socket.io-client'

const socket = io('http://localhost:3010')

export async function newConnection() {
	socket.emit('connection')
}

export async function newDisconnection() {
	socket.emit('connection')
}

export async function createChat() {
	socket.emit('create-chat', () => {})
}
