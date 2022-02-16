import styled from 'styled-components'
import MessageSenderPeople from './MessageSenderPeople'
import MessageReciever from './MessageReciever'

export default function ChatContent({ messages, user, scrollRef }) {
	const messagesDisplay = messages.map(({ creatorId, message, createdAt }) => {
		if (creatorId === user.email) {
			return (
				<div className='width-ref' ref={scrollRef}>
					<MessageSenderPeople
						ref={scrollRef}
						text={message}
						hours={createdAt}
						key={createdAt}
					/>
				</div>
			)
		} else {
			return (
				<div className='width-ref' ref={scrollRef}>
					<MessageReciever text={message} hours={createdAt} key={createdAt} />
				</div>
			)
		}
	})

	return <ChatContentWrapper>{messagesDisplay}</ChatContentWrapper>
}

const ChatContentWrapper = styled.section`
	background-color: #737373;
	background-image: url();
	height: calc(100vh - 59.19px);
	width: 100%;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0.8rem 4.5rem 0.8rem;
	gap: 1rem;
	overflow-y: auto;
	align-items: flex-end;

	.width-ref {
		width: 100%;
	}

	@media screen and (min-width: 1386px) {
		height: calc(100vh - 59.19px);
		padding: 0.5rem 2rem 4.5rem 2.625rem;
		max-height: calc(100vh - 59.19px);
	}
`
