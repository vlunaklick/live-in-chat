import prisma from '../utils/prisma.js'

class UserController {
	create = async (req, res) => {
		const { user, email, password } = req.body

		const mailExisting = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (mailExisting === null) {
			await prisma.user.create({
				data: {
					user,
					email,
					password,
				},
			})
			res.status(200).json({ success: true })
		} else {
			res.status(406).json({ success: false })
		}
	}
}
