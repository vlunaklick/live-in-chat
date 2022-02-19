import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInputMessage from './ChatInputMessage'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { getCookie } from 'cookies-next'
import ChatContent from './ChatContent'

export default function Chat(props) {
	const [messages, setMessages] = useState([])
	const [title, setTitle] = useState('')

	const firstUpdate = useRef(true)

	const scrollRef = useRef()

	useEffect(async () => {
		if (firstUpdate.current) {
			firstUpdate.current = false
			return
		}

		props.setLoading(true)

		const token = getCookie('session')
		if (props.chatSelected) {
			await axios
				.get(`http://localhost:3005/messages/${props.chatSelected}`, {
					headers: { Authorization: `Bearer ${token}` },
					withCredentials: true,
				})
				.then(data => {
					setMessages(data.data.messages)
					props.setLoading(false)
				})
		}

		let titleName = props.lastChats.map(chat => {
			return chat.chatId === props.chatSelected ? chat.creator : ''
		})

		let newArray = new Array()
		for (var i = 0, j = titleName.length; i < j; i++) {
			if (titleName[i]) {
				newArray.push(titleName[i])
			}
		}

		setTitle(newArray[0])

		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [props.chatSelected])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	return (
		<ChatWrapper>
			{props.chatSelected === false ? (
				''
			) : (
				<>
					<ChatHeader
						user={props.user}
						name={title}
						profilePicture='/no-user.jpg'
						setChatSelected={props.setChatSelected}
						chatId={props.chatSelected}
						setLastChats={props.setLastChats}
						lastChats={props.lastChats}
					/>
					<ChatContent
						messages={messages}
						user={props.user}
						scrollRef={scrollRef}
					/>
					<ChatInputMessage
						messages={messages}
						setMessages={setMessages}
						chatId={props.chatSelected}
						email={props.user.email}
						name={title}
						setLastChats={props.setLastChats}
						lastChats={props.lastChats}
					/>
				</>
			)}
		</ChatWrapper>
	)
}

const ChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;
	position: fixed;

	@media screen and (min-width: 786px) {
		position: relative;
	}
`

const SubChatWrapper = styled.section``
