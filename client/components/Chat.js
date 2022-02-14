import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import MessageSender from './MessageSender'

export default function Chat({ user }) {
	return (
		<ChatWrapper>
			<ChatHeader user={user} profilePicture='/no-user.jpg' />
			<ChatContent />
			<MessageSender />
		</ChatWrapper>
	)
}

const ChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;
`

const ChatContent = styled.section`
	background-color: #737373;
	height: 100%;
	width: 100%;
`
