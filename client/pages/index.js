import Head from 'next/head'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import SidebarHeader from '../components/SidebarHeader'
import Spinner from '../components/Spinner'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { newConnection } from '../socket/socket'
import ModalDelete from '../components/ModalDelete'

newConnection()

export default function Home(props) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState({})
	const [chatSelected, setChatSelected] = useState(false)
	const [lastChats, setLastChats] = useState(props.lastChats)
	const [modal, setModal] = useState(false)
	const [messageSelected, setMessageSelected] = useState([])
	const [messages, setMessages] = useState([])
	const [title, setTitle] = useState('')

	const router = useRouter()

	const closeChat = () => {
		setChatSelected(false)
		setLoading(true)
	}

	useEffect(() => {
		if (!props.success) {
			router.push('/login')
		} else {
			setUser(props.user)
		}
	}, [])

	const firstUpdate = useRef(true)

	const scrollRef = useRef()

	useEffect(async () => {
		if (firstUpdate.current) {
			firstUpdate.current = false
			return
		}

		const token = getCookie('session')

		if (!token) {
			return { props: { success: false, user: {} } }
		}

		const lastChatFetched = await axios.get(
			`http://localhost:3005/chats/${user.email}`,
			{
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			}
		)

		setLastChats(lastChatFetched.data.chats)
	}, [messages])

	useEffect(async () => {
		if (firstUpdate.current) {
			firstUpdate.current = false
			return
		}

		setLoading(true)

		const token = getCookie('session')
		if (chatSelected) {
			await axios
				.post(
					`http://localhost:3005/messages/${chatSelected}`,
					{
						user: user.email,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
						withCredentials: true,
					}
				)
				.then(data => {
					setMessages(data.data.messages)
					setLoading(false)
				})
		}

		let titleName = lastChats.map(chat => {
			return chat.chatId === chatSelected ? chat.creator : ''
		})

		let newArray = new Array()
		for (var i = 0, j = titleName.length; i < j; i++) {
			if (titleName[i]) {
				newArray.push(titleName[i])
			}
		}

		setTitle(newArray[0])

		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chatSelected])

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
							<SidebarHeader user={user} />
							<Sidebar
								owner={user.email}
								setChatSelected={setChatSelected}
								chatSelected={chatSelected}
								lastChats={lastChats}
								setLastChats={setLastChats}
							/>
						</div>
						<Chat
							loading={loading}
							setLoading={setLoading}
							user={user}
							chatSelected={chatSelected}
							setChatSelected={closeChat}
							setLastChats={setLastChats}
							lastChats={lastChats}
							setModal={setModal}
							setMessageSelected={setMessageSelected}
							messages={messages}
							scrollRef={scrollRef}
							title={title}
							setMessages={setMessages}
						/>
					</ChatWrapper>
				) : (
					<Spinner />
				)}
				{modal ? (
					<ModalDelete
						mainEmail={user.email}
						setModal={setModal}
						messageSelected={messageSelected}
						lastChats={lastChats}
						setLastChats={setLastChats}
						messages={messages}
						setMessages={setMessages}
					/>
				) : (
					''
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

	if (props.user) {
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
	position: relative;

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
