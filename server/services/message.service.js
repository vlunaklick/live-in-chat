import prisma from '../utils/prisma.js'
import { chatExist } from './chat.service.js'
import { accountUsername } from './user.service.js'

export async function createMessage(email, chatId, text) {
	const isThere = await checkExistanceMessage(chatId)

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
	const isThere = await checkExistanceMessage(chatId)

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

export async function lastMessage(chatId) {
	const messages = await getAllMessages(chatId)

	const creator = await accountUsername(messages.pop().creatorId)

	return { creator: creator, message: messages.pop().message }
}

export async function checkExistanceMessage(chatId) {
	const isThere = await chatExist(chatId)

	if (!isThere) {
		return false
	}

	return true
}
