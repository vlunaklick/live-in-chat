import { createChat, lastMessageChats } from '../services/chat.service.js'

class ChatController {
	create = async (req, res) => {
		try {
			const { sender, receiver } = req.body

			const chat = await createChat(sender, receiver)

			if (!chat) {
				return res
					.status(401)
					.json({ success: false, message: 'Chat alredy exists.' })
			}

			res.status(200).json({ success: true, message: chat })
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	}

	userLastChats = async (req, res) => {
		try {
			const { userId } = req.params

			const chats = await lastMessageChats(userId)

			res.status(200).json({ success: true, chats: chats })
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	}
}

const controller = new ChatController()
export { controller as ChatController }
