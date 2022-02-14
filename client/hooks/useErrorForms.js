import { useState } from 'react'
import axios from 'axios'
import { setCookies, removeCookies } from 'cookies-next'

export default function useErrorForms() {
	const [userError, setUserError] = useState([false, ''])
	const [mailError, setMailError] = useState([false, ''])
	const [passwordError, setPasswordError] = useState([false, ''])
	const [logged, setlogged] = useState(false)
	const [register, setRegister] = useState(false)

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

		if (mailError[0] === false && passwordError[0] === false) {
			axios
				.post(
					`http://localhost:3005/users/login`,
					{
						email: email,
						password: password,
					},
					{ withCredentials: true }
				)
				.then(data => {
					try {
						let token = data.headers['authorization'].split(' ')[1]
						removeCookies('session')
						setCookies('session', token, { HttpOnly: true })
						setlogged(true)
					} catch (error) {
						console.log(error)
					}
				})
				.catch(error => {
					if (error.response.data.source === 'password') {
						setPasswordError([true, error.response.data.message])
					} else if (error.response.data.source === 'email') {
						setMailError([true, error.response.data.message])
					} else {
						console.log(error)
					}
				})
		}
	}

	const registerSubmit = async e => {
		e.preventDefault()
		const user = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value

		if (email.match(regexMail) === null) {
			setMailError([true, 'The email isn\u0027t valid.'])
		} else {
			setMailError([false, ''])
		}

		if (user.length < 6) {
			setUserError([true, 'The user should be at least 6 characters long.'])
		} else {
			setUserError([false, ''])
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
			email.match(regexMail) !== null &&
			password.length >= 6 &&
			user.length >= 6
		) {
			axios
				.post(`http://localhost:3005/users/create`, {
					user: user,
					email: email,
					password: password,
				})
				.then(({ data }) => {
					if (data.success) {
						setRegister(true)
					}
				})
				.catch(({ response }) => {
					setMailError([true, response.data.message])
				})
		}
	}

	return {
		userError,
		passwordError,
		mailError,
		logged,
		register,
		loginSubmit,
		registerSubmit,
		setlogged,
	}
}
