import styled from 'styled-components'
import MessageSend from './MessageSend'
import MessageReciever from './MessageReciever'

export default function ChatContent({
	messages,
	user,
	scrollRef,
	setModal,
	setMessageSelected,
}) {
	const messagesDisplay = messages.map(message => {
		return message.creatorId === user.email ? (
			<MessageSend
				text={message.message}
				deleted={message.deleted}
				hours={message.createdAt}
				key={message.createdAt + message.id}
				scrollRef={scrollRef}
				setModal={setModal}
				setMessageSelected={setMessageSelected}
				messagePlain={message}
			/>
		) : (
			<MessageReciever
				text={message.message}
				deleted={message.deleted}
				hours={message.createdAt}
				key={message.createdAt + message.creatorId}
				setModal={setModal}
				setMessageSelected={setMessageSelected}
				messagePlain={message}
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
