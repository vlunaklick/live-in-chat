import styled from 'styled-components'
import { IoIosSend } from 'react-icons/io'

export default function MessageSender() {
	return (
		<MessageSenderWrapper>
			<input type='text' placeholder='Write your message here.' />
			<IoIosSend className='message-send-svg' />
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

	input {
		padding: 0.5rem;
		width: 100%;
		border-radius: 0.5rem;
		color: #fafafa;
		background-color: #696969;
		border: none;
		outline: none;
	}

	input::placeholder {
		color: #979797;
	}

	.message-send-svg {
		height: 30px;
		width: 40px;
		color: #979797;
	}

	@media screen and (min-width: 768px) {
		position: relative;
	}
`
