import styled from 'styled-components'
import MessageSenderPeople from './MessageSenderPeople'
import MessageReciever from './MessageReciever'

export default function ChatContent({ messages, user }) {
	const messagesDisplay = messages.map(({ creatorId, message, createdAt }) => {
		if (creatorId === user.email) {
			return (
				<MessageSenderPeople text={message} hours={createdAt} key={createdAt} />
			)
		} else {
			return (
				<MessageReciever text={message} hours={createdAt} key={createdAt} />
			)
		}
	})

	return <ChatContentWrapper>{messagesDisplay}</ChatContentWrapper>
}

const ChatContentWrapper = styled.section`
	background-color: #737373;
	background-image: url();
	height: calc(100vh - 59.19px - 59.19px);
	width: 100%;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	padding: 0 2rem 1rem 2rem;
	gap: 1rem;
	justify-content: flex-end;
	overflow-y: scroll;

	@media screen and (min-width: 1386px) {
		height: 200px;
	}
`
