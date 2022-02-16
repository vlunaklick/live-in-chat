import Head from 'next/head'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { newConnection } from '../socket/socket'

export default function Home(props) {
	const [user, setUser] = useState({})
	const [chatSelected, setChatSelected] = useState(false)
	const [lastChats, setLastChats] = useState(props.lastChats)

	newConnection()

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
			<MainWrapper>
				{props.success ? (
					<ChatWrapper>
						<div className='sidebar-selection'>
							<Header user={user} />
							<Sidebar
								owner={user.email}
								setChatSelected={setChatSelected}
								chatSelected={chatSelected}
								lastChats={lastChats}
							/>
						</div>
						<Chat
							user={user}
							chatSelected={chatSelected}
							setChatSelected={setChatSelected}
						/>
					</ChatWrapper>
				) : (
					<Spinner />
				)}
			</MainWrapper>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { res, req } = context

	const token = getCookie('session', { req, res })

	if (!token) {
		return { props: { success: false, user: {} } }
	}

	const authResponse = await axios.get('http://localhost:3005/users/me', {
		headers: { Authorization: `Bearer ${token}` },
		withCredentials: true,
	})

	let props

	if (authResponse.status === 200) {
		props = {
			success: authResponse.data.success,
			user: authResponse.data.user,
		}
	}

	const lastChats = await axios.get(
		`http://localhost:3005/chats/${props.user.email}`,
		{
			headers: { Authorization: `Bearer ${token}` },
			withCredentials: true,
		}
	)

	if (lastChats.status === 200) {
		props = {
			...props,
			lastChats: lastChats.data.chats,
		}
	}

	return { props: props }
}

const MainWrapper = styled.main`
	background-color: #171717;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ChatWrapper = styled.section`
	width: 100%;
	height: 100vh;
	display: flex;
	transition: width 0.5s ease-in-out, height 0.5s ease-in-out;

	.sidebar-selection {
		width: 100%;
	}

	@media screen and (min-width: 768px) {
		.sidebar-selection {
			width: 320px;
		}
	}

	@media screen and (min-width: 1386px) {
		width: 1386px;
		height: calc(100vh - 20px);
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px 0px rgba(0, 0, 0, 0.06);
	}
`
