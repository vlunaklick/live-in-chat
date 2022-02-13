import Head from 'next/head'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function Home(props) {
	const [user, setUser] = useState({})

	const router = useRouter()

	useEffect(() => {
		if (!props.success) {
			router.push('/login')
		} else {
			setUser(props.user)
		}
	}, [])

	return (
		<div>
			<Head>
				<title>Live in Chat</title>
				<meta name='description' content='Chatting app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ChatWrapper>
				<p>{user.email}</p>
			</ChatWrapper>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { params, query, res, req } = context

	const token = getCookie('session', { req, res })

	if (!token) {
		return { props: { success: false, user: {} } }
	}

	const apiResponse = await axios.get('http://localhost:3005/users/me', {
		headers: { Authorization: `Bearer ${token}` },
		withCredentials: true,
	})

	if (apiResponse.status === 200) {
		const props = {
			success: apiResponse.data.success,
			user: apiResponse.data.user,
		}
		return { props: props }
	}
}

const ChatWrapper = styled.main`
	background-color: #171717;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
