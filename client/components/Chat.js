import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import MessageSender from './MessageSender'

export default function Chat({ user, chatSelected, setChatSelected }) {
	return (
		<ChatWrapper>
			{chatSelected !== false ? (
				<SubChatWrapper>
					<ChatHeader
						user={user}
						profilePicture='/no-user.jpg'
						setChatSelected={setChatSelected}
					/>
					<ChatContent />
					<MessageSender />
				</SubChatWrapper>
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

	@media screen and (min-width: 768px) {
		position: relative;
		height: 100%;
	}
`

const ChatContent = styled.section`
	background-color: #737373;
	background-image: url();
	height: calc(100vh - 59.19px - 59.19px);
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;

	@media screen and (min-width: 1386px) {
		height: calc(100vh - 59.19px - 59.19px - 20px);
	}
`
