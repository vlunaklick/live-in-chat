import { useState } from 'react'
import axios from 'axios'
import { setCookies, removeCookies } from 'cookies-next'
import { regexMail } from '../utils/regexMail'

export default function useErrorForms() {
	const [userError, setUserError] = useState([false, ''])
	const [mailError, setMailError] = useState([false, ''])
	const [passwordError, setPasswordError] = useState([false, ''])
	const [logged, setlogged] = useState(false)
	const [register, setRegister] = useState(false)
	const [loading, setLoading] = useState(false)

	const loginSubmit = async e => {
		e.preventDefault()

		restartErrors()

		const email = e.target[0].value
		const password = e.target[1].value

		checkEmailPass(email, password)

		if (email.match(regexMail) !== null && password.length >= 6) {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_API_URL}/users/login`,
					{
						email: email,
						password: password,
					},
					{ withCredentials: true }
				)
				.then(data => {
					let token = data.headers['authorization'].split(' ')[1]
					removeCookies('session')
					setCookies('session', token, {
						HttpOnly: true,
						maxAge: 60 * 60 * 24 * 15,
					})
					setlogged(true)
				})
				.catch(error => {
					setLoading(false)
					if (error.response.data.source === 'password') {
						setPasswordError([true, error.response.data.message])
					} else if (error.response.data.source === 'email') {
						setMailError([true, error.response.data.message])
					}
				})
		}
	}

	const registerSubmit = async e => {
		e.preventDefault()

		restartErrors()

		const user = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value

		checkEmailPass(email, password)

		if (user.length < 6) {
			setUserError([true, 'The user should be at least 6 characters long.'])
		}

		if (
			email.match(regexMail) !== null &&
			password.length >= 6 &&
			user.length >= 6
		) {
			axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
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
					setLoading(false)
				})
		}
	}

	const checkEmailPass = (email, password) => {
		if (email.match(regexMail).length !== 1) {
			setMailError([true, 'The email isn\u0027t valid.'])
		}

		if (password.length < 6) {
			setPasswordError([
				true,
				'The password should be at least 6 characters long.',
			])
		}
	}

	const restartErrors = () => {
		setLoading(true)
		setMailError([false, ''])
		setPasswordError([false, ''])
		setUserError([false, ''])
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
		loading,
	}
}
