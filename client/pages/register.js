import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'

export default function Login() {
	return (
		<div>
			<Head>
				<title>Live in Chat</title>
				<meta name='description' content='Chatting app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<RegisterWrapper>
				<section>
					<h2>Register</h2>
					<form action='' method='post' onSubmit={e => e.preventDefault()}>
						<label>
							Username:
							<input type='text' minlength='6' required />
						</label>
						<label>
							Mail:
							<input type='text' />
						</label>
						<label>
							Password:
							<input type='password' minlength='6' required />
						</label>
						<Link href='/login'>
							<a>Alredy have an account? Log in here.</a>
						</Link>
						<button type='submit'>Register</button>
					</form>
				</section>
			</RegisterWrapper>
		</div>
	)
}

const RegisterWrapper = styled.main`
	background-color: #171717;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	section {
		padding: 1.25rem;
		width: 350px;
		background-color: #262626;
		border-radius: 0.5rem;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px 0px rgba(0, 0, 0, 0.06);

		h2 {
			color: #fafafa;
			border-bottom: 1px solid #404040;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		padding: 0.5rem 0;

		button {
			margin-top: 0.75rem;
			background-color: #1d4ed8;
			outline: none;
			border: none;
			cursor: pointer;
			padding: 0.625rem 1.25rem;
			border-radius: 0.5rem;
			color: #fafafa;
			font-size: 0.875rem;
			line-height: 1.25rem;
			transition: background-color 0.5s ease-in-out;
		}

		button:hover {
			background-color: #1e40af;
		}

		a {
			width: 100%;
			color: #38bdf8;
			font-size: 0.65rem;
			cursor: pointer;
		}

		a:hover {
			color: #0ea5e9;
		}

		label {
			color: #fafafa;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			width: 100%;

			input {
				width: 100%;
				outline: none;
				border: none;
				padding: 0.5rem;
				background-color: #404040;
				color: #fafafa;
				font-size: 0.7rem;
				border: 1px solid #525252;
				transition: border 0.5s ease-in-out;
			}

			input:focus {
				border: 1px solid #737373;
			}
		}
	}
`
