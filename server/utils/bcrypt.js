import bcrypt from 'bcryptjs'

export function hashFunction(password) {
	return bcrypt.hashSync(password, 10)
}

export function compareHash(password, passDb) {
	return bcrypt.compareSync(password, passDb, function (err, res) {
		return res
	})
}
