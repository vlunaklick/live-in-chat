import jwt from 'jsonwebtoken'
import { getUser } from '../services/user.service.js'

export async function isAuth(req, res, next) {
	try {
		let { authorization } = req.headers

		if (!authorization) {
			return res.status(401).json({ success: false, message: 'Not logged in' })
		}

		try {
			authorization = authorization.split(' ')[1]
		} catch (error) {
			console.log(error)
		}

		if (!authorization) {
			return res.status(401).json({ success: false, message: 'Not logged in' })
		}

		try {
			const authorizationValid = jwt.verify(
				authorization,
				process.env.JWT_SECRET
			)

			const user = await getUser(authorizationValid.email)

			req.user = user

			if (!authorizationValid) {
				return res
					.status(403)
					.json({ success: false, message: 'Session has expired' })
			}
		} catch (err) {
			console.log(err.message)
			return res.status(401).json({ success: false, message: 'Not logged in' })
		}

		next()
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ success: false, message: err.message })
	}
}
