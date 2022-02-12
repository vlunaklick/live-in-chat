import prisma from '../utils/prisma.js'
import { hashFunction } from '../utils/bcrypt.js'

export async function getUser(email) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return user
}

export async function createUser(name, email, password) {
	const check = await getUser(email)

	if (check === null) {
		const hashedPass = await hashFunction(password)
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPass,
			},
		})
		return true
	}
	return false
}
