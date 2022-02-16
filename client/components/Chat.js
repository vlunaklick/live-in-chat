import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import MessageSender from './MessageSender'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { getCookie } from 'cookies-next'
import ChatContent from './ChatContent'

export default function Chat(props) {
	const [messages, setMessages] = useState([])

	const firstUpdate = useRef(true)

	useEffect(async () => {
		if (firstUpdate.current) {
			firstUpdate.current = false
			return
		}

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
	}, [props.chatSelected])

	return (
		<ChatWrapper>
			{props.chatSelected !== false ? (
				props.loading ? (
					<Spinner />
				) : (
					<SubChatWrapper>
						<ChatHeader
							user={props.user}
							profilePicture='/no-user.jpg'
							setChatSelected={props.setChatSelected}
						/>
						<ChatContent messages={messages} user={props.user} />
						<MessageSender />
					</SubChatWrapper>
				)
			) : (
				''
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
	top: 0;
	left: 0;

	@media screen and (min-width: 768px) {
		position: relative;
		height: 100%;
	}
`

const SubChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;
	position: relative;

	@media screen and (min-width: 768px) {
		height: 100%;
	}
`
