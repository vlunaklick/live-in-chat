import prisma from '../utils/prisma.js'

export async function createChat(sender, receiver) {
	const chatExistence = await prisma.chat.findMany({
		where: {
			members: {
				hasEvery: [sender, receiver],
			},
		},
	})

	if (chatExistence.length === 0) {
		const chat = await prisma.chat.create({
			data: {
				members: [sender, receiver],
			},
		})

		return chat
	}

	return false
}

export async function userChats(user) {
	const conversations = await prisma.chat.findMany({
		where: {
			members: {
				has: user,
			},
		},
	})

	return conversations
}
