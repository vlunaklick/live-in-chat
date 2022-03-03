import styled from 'styled-components'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useState } from 'react'

export default function ChatInputMessage({
	email,
	chatId,
	setMessages,
	messages,
	setLastChats,
	lastChats,
	name,
	otherEmail,
	socket,
}) {
	const [typing, setTyping] = useState(false)
	const [text, setText] = useState('')

	const createMessage = async e => {
		e.preventDefault()
		if (text.replace(/\s/g, '').length) {
			try {
				const token = getCookie('session')
				const data = {
					email: email,
					chatId: chatId,
					text: text,
				}

				const message = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/messages/create`,
					data,
					{
						headers: { Authorization: `Bearer ${token}` },
						withCredentials: true,
					}
				)

				socket.current?.emit('sendMessage', {
					receiverId: otherEmail,
					message: message.data.message,
				})

				setMessages([...messages, message.data.message])

				let newLastChats = lastChats.map(chat => {
					if (chat.creator === name) {
						return {
							messageId: message.data.message.id,
							creator: chat.creator,
							chatId: chat.chatId,
							email: email,
							deleted: false,
							date: message.data.message.createdAt,
							message: message.data.message.message,
						}
					} else {
						return chat
					}
				})

				setLastChats(newLastChats)

				setText('')

				notTyping()
			} catch (err) {
				console.log(err)
			}
		}
	}

	const notTyping = () => {
		setTyping(false)
		socket.current?.emit('stopTyping', {
			receiverId: otherEmail,
			chatId: chatId,
		})
	}

	const isTyping = () => {
		if (!typing) {
			setTyping(true)
			socket.current?.emit('isTyping', {
				receiverId: otherEmail,
				chatId: chatId,
			})
			let time = setTimeout(notTyping, 5000)
		} else {
			clearTimeout(time)
			let time = setTimeout(notTyping, 5000)
		}
	}

	const writeEmail = e => {
		setText(e.target.value)
	}

	return (
		<InputWrapper>
			<form action='' method='post' onSubmit={createMessage}>
				<div className='inputwr'>
					<input
						type='text'
						placeholder='Write your message here.'
						onKeyDown={() => isTyping()}
						value={text}
						onChange={writeEmail}
					/>
				</div>
				<button>
					<IoMdSend className='message-send-svg' />
				</button>
			</form>
		</InputWrapper>
	)
}

const InputWrapper = styled.section`
	padding: 0.6rem;
	background-color: ${({ theme }) => theme.chat.input};
	display: flex;
	align-items: center;
	gap: 0.5rem;
	bottom: 0;
	width: 100%;
	min-height: 59.19px;
	flex: 1;
	z-index: 5;
	border-top: ${({ theme }) => theme.sidebar.border};
	transition: background-color 0.5s ease-in-out, border-top 0.5s ease-in-out;

	form {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		justify-content: space-between;
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

	.inputwr {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		border-radius: 0.5rem;
		background-color: ${({ theme }) => theme.chat.holder};
		transition: background-color 0.5s ease-in-out;
		padding: 9px 12px 11px;
	}

	input {
		width: 100%;
		color: ${({ theme }) => theme.chat.holder_text};
		background-color: transparent;
		border: none;
		outline: none;
		max-height: 100px;
		min-height: 20px;
		font-size: 15px;
		overflow-y: auto;
		overflow-x: hidden;
		white-space: pre-wrap;
		word-wrap: break-word;
		transition: color 0.5s ease-in-out;
	}

	input::placeholder {
		color: ${({ theme }) => theme.chat.holder_no_text};
	}

	.message-send-svg {
		line-height: 1;
		font-size: 1.5rem;
		color: ${({ theme }) => theme.chat.holder_no_text};
		cursor: pointer;
		transition: color 0.5s ease-in-out;
	}

	@media screen and (min-width: 768px) {
		position: absolute;
		bottom: 0;
	}
`
