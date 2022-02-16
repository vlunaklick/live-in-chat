import { createMessage, getAllMessages } from '../services/message.service.js'

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

			const messages = await getAllMessages(chatId)

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
}

const controller = new MessageController()
export { controller as MessageController }
