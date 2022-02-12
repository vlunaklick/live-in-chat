import bcrypt from 'bcryptjs'

export function hashFunction(password) {
	return bcrypt.hashSync(password, 10)
}
