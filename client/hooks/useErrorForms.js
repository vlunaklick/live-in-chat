import { useState } from 'react'
import axios from 'axios'

export default function useErrorForms() {
	const [userError, setUserError] = useState([false, ''])
	const [mailError, setMailError] = useState([false, ''])
	const [passwordError, setPasswordError] = useState([false, ''])
	const [redirect, setRedirect] = useState(false)

	const regexMail =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

	const loginSubmit = async e => {
		e.preventDefault()
		const email = e.target[0].value
		const password = e.target[1].value

		if (email.match(regexMail) === null) {
			setMailError([true, 'The email isn\u0027t valid.'])
		} else {
			setMailError([false, ''])
		}

		if (password.length < 6) {
			setPasswordError([
				true,
				'The password should be at least 6 characters long.',
			])
		} else {
			setPasswordError([false, ''])
		}

		if (mailError[0] === false || passwordError[0] === false) {
			axios
				.post(`http://localhost:3005/users/login`, {
					email: email,
					password: password,
				})
				.then(({ data }) => {
					if (data.source === 'password') {
						setPasswordError([true, data.message])
					} else if (data.source === 'email') {
						setMailError([true, data.message])
					} else {
						console.log('Loged success')
					}
				})
		}
	}

	const registerSubmit = e => {
		e.preventDefault()
		const user = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value

		if (user.length < 6) {
			setUserError([true, 'The user should be at least 6 characters long.'])
		} else {
			setUserError([false, ''])
		}

		if (email.match(regexMail) === null) {
			setMailError([true, 'The email isn\u0027t valid.'])
		} else {
			setMailError([false, ''])
		}

		if (password.length < 6) {
			setPasswordError([
				true,
				'The password should be at least 6 characters long.',
			])
		} else {
			setPasswordError([false, ''])
		}

		if (
			mailError[0] === false ||
			passwordError[0] === false ||
			user[0] === false
		) {
			axios
				.post(`http://localhost:3005/users/create`, {
					user: user,
					email: email,
					password: password,
				})
				.then(({ data }) => {
					if (!data.success) {
						setMailError([true, data.message])
					} else {
						setRedirect(true)
					}
				})
		}
	}

	return {
		userError,
		passwordError,
		mailError,
		redirect,
		loginSubmit,
		registerSubmit,
	}
}
