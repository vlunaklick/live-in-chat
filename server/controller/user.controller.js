import { createUser, checkAccount } from '../services/user.service.js'

class UserController {
	create = async (req, res) => {
		const { user, email, password } = req.body

		const resolution = await createUser(user, email, password)

		if (resolution) {
			res.status(200).json({ success: true })
		} else {
			res.status(406).json({ success: false })
		}
	}

	login = async (req, res) => {
		const { email, password } = req.body

		const resolution = await checkAccount(email, password)

		if (resolution) {
			res.status(200).json({ success: true })
		} else {
			res.status(406).json({ success: false })
		}
	}
}

const controller = new UserController()
export { controller as UserController }
