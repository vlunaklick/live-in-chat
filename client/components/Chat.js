import styled from 'styled-components'
import ChatHeader from './ChatHeader'

export default function Chat({ user }) {
	return (
		<ChatWrapper>
			<ChatHeader user={user} profilePicture='/no-user.jpg' />
		</ChatWrapper>
	)
}

const ChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;
`
