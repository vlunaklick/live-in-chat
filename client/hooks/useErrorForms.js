import { useState } from 'react'

export default function useErrorForms() {
	const [userError, setUserError] = useState([false, ''])
	const [mailError, setMailError] = useState([false, ''])
	const [passwordError, setPasswordError] = useState([false, ''])

	const regexMail =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

	const loginSubmit = e => {
		e.preventDefault()
		const user = e.target[0].value
		const password = e.target[1].value

		if (user.length < 6) {
			setUserError([true, 'The user should be at least 6 characters long.'])
		} else {
			if (!user) {
				setUserError([true, 'The user doesn\u0027t exists.'])
			} else {
				setUserError([false, ''])
			}
		}

		if (password.length < 6) {
			setPasswordError([
				true,
				'The password should be at least 6 characters long.',
			])
		} else {
			if (!password) {
				setPasswordError([true, 'The password is incorrect.'])
			} else {
				setPasswordError([false, ''])
			}
		}
	}

	const registerSubmit = e => {
		e.preventDefault()
		const user = e.target[0].value
		const mail = e.target[1].value
		const password = e.target[2].value

		if (user.length < 6) {
			setUserError([true, 'The user should be at least 6 characters long.'])
		} else {
			if (!user) {
				setUserError([true, 'The user doesn\u0027t exists.'])
			} else {
				setUserError([false, ''])
			}
		}

		if (mail.match(regexMail) === null) {
			setMailError([true, 'The email isn\u0027t valid.'])
		} else {
			if (!mail) {
				setMailError([true, 'The user doesn\u0027t exists.'])
			} else {
				setMailError([false, ''])
			}
		}

		if (password.length < 6) {
			setPasswordError([
				true,
				'The password should be at least 6 characters long.',
			])
		} else {
			if (!password) {
				setPasswordError([true, 'The password is incorrect.'])
			} else {
				setPasswordError([false, ''])
			}
		}
	}

	return { userError, passwordError, mailError, loginSubmit, registerSubmit }
}
