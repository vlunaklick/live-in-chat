import prisma from '../utils/prisma.js'
import { chatExist } from './chat.service.js'

export async function createMessage(email, chatId, text) {
	const isThere = await chatExist(chatId)

	if (!isThere) {
		return false
	}

	const newMessage = await prisma.message.create({
		data: {
			message: text,
			chatId: chatId,
			creatorId: email,
		},
	})

	return newMessage
}

export async function getAllMessages(chatId) {
	const isThere = await chatExist(chatId)

	console.log(isThere)

	if (!isThere) {
		return false
	}

	const messages = await prisma.message.findMany({
		where: {
			chatId: chatId,
		},
	})

	return messages
}
