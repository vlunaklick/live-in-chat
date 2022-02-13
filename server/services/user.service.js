import prisma from '../utils/prisma.js'
import { hashFunction, compareHash } from '../utils/bcrypt.js'

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
		const hashedPass = hashFunction(password)
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPass,
			},
		})
		return [true, 'Account created.']
	}
	return [false, 'That email already exists.']
}

export async function checkAccount(email, password) {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	if (user === null) {
		return [false, 'The email does not exist.', 'email']
	}

	const isValid = compareHash(password, user.password)

	return isValid
		? [true, 'Loged']
		: [false, 'The password is invalid.', 'password']
}

export async function accountId(email) {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	return user.id
}
