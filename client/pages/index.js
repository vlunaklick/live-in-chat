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
import ModalDelete from '../components/ModalDelete'
import { io } from 'socket.io-client'

export default function Home(props) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState({})
	const [chatSelected, setChatSelected] = useState(false)
	const [lastChats, setLastChats] = useState([])
	const [modal, setModal] = useState(false)
	const [messageSelected, setMessageSelected] = useState([])
	const [messages, setMessages] = useState([])
	const [title, setTitle] = useState('')
	const [receiver, setReceiver] = useState('')
	const [arrivalMsg, setArrivalMsg] = useState(null)
	const [arrivalDelete, setArrivalDelete] = useState(null)
	const [userConnecteds, setUserConnecteds] = useState([])
	const [isTypingUser, setIsTypingUser] = useState({
		success: false,
		chatId: 0,
	})
	const [chatArrival, setChatArrival] = useState('')

	const socket = useRef()

	useEffect(() => {
		if (!props.success && props.user) {
			router.push('/login')
		} else {
			setUser(props.user)
		}
	}, [])

	useEffect(() => {
		socket.current = io('https://liveinchat-sockets.herokuapp.com/')
		socket.current?.on('getUsers', data => {
			setUserConnecteds(data)
		})
		socket.current?.on('getMessage', data => {
			setArrivalMsg(data)
		})
		socket.current?.on('getDeleteMessage', data => {
			setArrivalDelete(data)
		})
		socket.current?.on('getIsTyping', data => {
			setIsTypingUser(data)
		})
		socket.current?.on('getIsTyping', data => {
			setIsTypingUser(data)
		})
		socket.current?.on('getCreatedChat', data => {
			setChatArrival(data)
		})
	}, [])

	useEffect(() => {
		const mapedItem = messages.map(message => {
			if (message.id === arrivalDelete) {
				return { ...message, deleted: true }
			} else {
				return message
			}
		})
		setMessages(mapedItem)
	}, [arrivalDelete])

	useEffect(() => {
		if (arrivalMsg !== null && arrivalMsg.chatId === chatSelected) {
			setMessages([...messages, arrivalMsg])
		}
	}, [arrivalMsg])

	const router = useRouter()

	const closeChat = () => {
		setChatSelected(false)
		setLoading(true)
	}

	useEffect(() => {
		socket.current?.emit('userConnection', user.email)
		setLastChats(props.lastChats)
	}, [user])

	useEffect(() => {
		if (lastChats.length !== 0) {
			setReceiver(lastChats[0].otherEmail)
		}
	}, [chatSelected])

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
			`https://liveinchat-database.herokuapp.com/chats/${user.email}`,
			{
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			}
		)

		setLastChats(lastChatFetched.data.chats)
	}, [messages, arrivalMsg, arrivalDelete, chatArrival])

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
					`https://liveinchat-database.herokuapp.com/messages/${chatSelected}`,
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
							<SidebarHeader user={user} socket={socket} />
							<Sidebar
								owner={user.email}
								setChatSelected={setChatSelected}
								chatSelected={chatSelected}
								lastChats={lastChats}
								setLastChats={setLastChats}
								receiver={receiver}
								socket={socket}
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
							receiver={receiver}
							socket={socket}
							userConnecteds={userConnecteds}
							isTypingUser={isTypingUser}
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
						socket={socket}
						receiver={receiver}
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

	const authResponse = await axios.get(
		'https://liveinchat-database.herokuapp.com/users/me',
		{
			headers: { Authorization: `Bearer ${token}` },
			withCredentials: true,
		}
	)

	let props

	if (authResponse.status === 200) {
		props = {
			success: authResponse.data.success,
			user: authResponse.data.user,
		}
	}

	if (props.success !== true) {
		res.statusCode = 302
		res.setHeader('Location', `/login`)
		return { props: {} }
	}

	if (props.success) {
		const lastChats = await axios.get(
			`https://liveinchat-database.herokuapp.com/chats/${props.user.email}`,
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
