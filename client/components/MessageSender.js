import styled from 'styled-components'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export default function MessageSender({
	email,
	chatId,
	setMessages,
	messages,
	setLastChats,
	lastChats,
	name,
}) {
	const createMessage = async e => {
		e.preventDefault()
		if (e.target[0].value.replace(/\s/g, '').length) {
			try {
				const token = getCookie('session')
				const data = {
					email: email,
					chatId: chatId,
					text: e.target[0].value,
				}

				const message = await axios.post(
					'http://localhost:3005/messages/create',
					data,
					{
						headers: { Authorization: `Bearer ${token}` },
						withCredentials: true,
					}
				)

				setMessages([...messages, message.data.message])

				let newLastChats = lastChats.map(chat => {
					if (chat.creator === name) {
						return {
							creator: chat.creator,
							chatId: chat.chatId,
							email: email,
							date: message.data.message.createdAt,
							message: message.data.message.message,
						}
					} else {
						return chat
					}
				})

				newLastChats.sort((a, b) => {
					return new Date(b.date) - new Date(a.date)
				})

				setLastChats(newLastChats)

				e.target[0].value = ''
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<MessageSenderWrapper>
			<form action='' method='post' onSubmit={createMessage}>
				<input type='text' placeholder='Write your message here.' />
				<button>
					<IoMdSend className='message-send-svg' />
				</button>
			</form>
		</MessageSenderWrapper>
	)
}

const MessageSenderWrapper = styled.section`
	padding: 0.6rem;
	background-color: #525252;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	position: fixed;
	bottom: 0;
	width: 100%;
	min-height: 59.19px;
	flex: 1;

	form {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
	}

	button {
		background-color: transparent;
		outline: none;
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		padding: 9px 12px 11px;
		width: 100%;
		border-radius: 0.5rem;
		color: #fafafa;
		background-color: #696969;
		border: none;
		outline: none;
		max-height: 100px;
		min-height: 20px;
		font-size: 15px;
		overflow-y: auto;
		overflow-x: hidden;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	input::placeholder {
		color: #979797;
	}

	.message-send-svg {
		line-height: 1;
		font-size: 1.5rem;
		color: #979797;
		cursor: pointer;
		transition: color 0.5s ease-in-out;
	}

	@media screen and (min-width: 768px) {
		position: absolute;
		bottom: 0;
		z-index: 5;
	}
`
