import styled from 'styled-components'
import MessageSend from './MessageSend'
import MessageReciever from './MessageReciever'

export default function ChatContent({ messages, user, scrollRef }) {
	const messagesDisplay = messages.map(({ creatorId, message, createdAt }) => {
		return creatorId === user.email ? (
			<MessageSend
				text={message}
				hours={createdAt}
				key={createdAt + creatorId}
				scrollRef={scrollRef}
			/>
		) : (
			<MessageReciever
				text={message}
				hours={createdAt}
				key={createdAt + creatorId}
			/>
		)
	})

	return <ChatContentWrapper>{messagesDisplay}</ChatContentWrapper>
}

const ChatContentWrapper = styled.section`
	background-color: ${({ theme }) => theme.chat.chat};
	height: calc(100vh - 61.19px - 63.69px);
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0.8rem 0.5rem 0.8rem;
	gap: 1rem;
	overflow-y: auto;
	width: 100%;

	@media screen and (min-width: 1386px) {
		height: calc(100vh - 61.19px - 63.69px - 20px);
		padding: 0.5rem 2rem 0.5rem 2.625rem;
		max-height: calc(100vh - 59.19px - 61.69px - 20px);
	}
`
