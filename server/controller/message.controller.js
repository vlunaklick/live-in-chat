import {
	createMessage,
	getAllMessages,
	deleteMessage,
} from '../services/message.service.js'

class MessageController {
	create = async (req, res) => {
		try {
			const { email, chatId, text } = req.body

			const message = await createMessage(email, chatId, text)

			if (!message) {
				return res
					.status(401)
					.json({ success: false, message: 'Chat does not exist.' })
			}

			res.status(200).json({ success: true, message: message })
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	}

	getConversation = async (req, res) => {
		try {
			const { chatId } = req.params
			const { user } = req.body

			const messages = await getAllMessages(chatId, user)

			if (!messages) {
				return res
					.status(401)
					.json({ success: false, message: 'Chat does not exist.' })
			}

			res.status(200).json({ success: true, messages: messages })
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	}

	delete = async (req, res) => {
		try {
			const { messageId, user } = req.body

			const message = await deleteMessage(messageId, user)

			if (!message) {
				return res
					.status(401)
					.json({ success: false, message: 'Message does not exist.' })
			}

			res.status(200).json({ success: true, messages: message })
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	}
}

const controller = new MessageController()
export { controller as MessageController }
