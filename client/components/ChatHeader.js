import styled from 'styled-components'
import UserIcon from './UserIcon'
import ChatHeaderDropdown from './ChatHeaderDropdown'
import { useEffect } from 'react'

export default function ChatHeader({
	user,
	profilePicture,
	setChatSelected,
	name,
	chatId,
	setLastChats,
	lastChats,
	setMessages,
	socket,
	userConnecteds,
	receiver,
	isTypingUser,
}) {
	let isConnected = userConnecteds.some(user => user.userEmail === receiver)

	let info

	if (isConnected && isTypingUser.success) {
		info = 'User is typing...'
	} else if (isConnected) {
		info = 'Online'
	} else {
		info = 'User is disconnected'
	}

	return (
		<ChatHeaderWrapper isConnected={isConnected}>
			<div className='data-container'>
				<div className='left-header-chat'>
					<UserIcon profilePicture={profilePicture} />
					<div className='container-data-user'>
						<p className='user-name-header'>{name}</p>
						<p className='user-name-online'>{info}</p>
					</div>
				</div>
				<ChatHeaderDropdown
					setChatSelected={setChatSelected}
					chatId={chatId}
					setLastChats={setLastChats}
					lastChats={lastChats}
					setMessages={setMessages}
				/>
			</div>
		</ChatHeaderWrapper>
	)
}

const ChatHeaderWrapper = styled.header`
	background-color: ${({ theme }) => theme.chat.header};
	padding: 0.6rem;
	display: flex;
	align-items: center;
	z-index: 10;
	border-bottom: ${({ theme }) => theme.sidebar.border};

	.data-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.left-header-chat {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.back-header-chat {
			margin-right: 0.5rem;
			color: #fafafa;
			cursor: pointer;
			width: 20px;
			height: 20px;
		}

		p {
			line-height: 1;
		}

		.container-data-user {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.user-name-header {
				font-weight: 600;
				color: #fafafa;
			}

			.user-email-header {
				font-size: 0.8rem;
				color: #a3a3a3;
			}
		}
	}

	.user-name-online {
		opacity: 1;
		font-size: 0.8rem;
		font-style: italic;
		color: ${({ theme }) => theme.chat.online};
		transition: opacity 0.5s ease-in-out;
	}
`
