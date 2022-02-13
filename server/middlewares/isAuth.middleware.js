import jwt from 'jsonwebtoken'

export function isAuth(req, res, next) {
	try {
		const { token } = req.cookies

		if (!token) {
			return res.status(401).json({ success: false, message: 'Not logged in' })
		}

		const tokenValid = jwt.verify(token, process.env.JWT_SECRET)

		if (!tokenValid) {
			return res
				.status()
				.json({ success: false, message: 'Session has expired' })
		}

		next()
	} catch (err) {
		res.status(500).json({ succes: false, message: err.message })
	}
}
