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
			notSee: [],
		},
	})

	await prisma.chat.update({
		where: {
			id: chatId,
		},
		data: {
			updatedAt: new Date(),
		},
	})

	return newMessage
}

export async function getAllMessages(chatId, user) {
	const isThere = await checkExistanceMessage(chatId)

	if (!isThere) {
		return false
	}

	const messages = await prisma.message.findMany({
		where: {
			AND: [
				{ chatId: chatId },
				{
					NOT: {
						notSee: {
							has: user,
						},
					},
				},
			],
		},
	})

	return messages
}

export async function lastMessage(chatId, user, chatSender, date) {
	const messages = await getAllMessages(chatId, user)

	let value = chatSender.indexOf(user) === 0 ? chatSender[1] : chatSender[0]

	const creator = await accountUsername(value)

	if (messages.length === 0) {
		return {
			creator: creator,
			email: value,
			date: date,
			message: '',
			chatId: chatId,
		}
	}

	const lastMessage = messages.pop()

	return {
		creator: creator,
		email: lastMessage.creatorId,
		date: date,
		message: lastMessage.message,
		chatId: chatId,
	}
}

export async function checkExistanceMessage(chatId) {
	const isThere = await chatExist(chatId)

	if (!isThere) {
		return false
	}

	return true
}

export async function deleteMessage(messageId, user) {
	const message = await prisma.message.update({
		where: {
			id: parseInt(messageId),
		},
		data: {
			notSee: {
				push: user,
			},
		},
	})

	console.log(message)

	if (!message) {
		return false
	}

	return message
}
