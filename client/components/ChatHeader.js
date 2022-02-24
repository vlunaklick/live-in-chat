import styled from 'styled-components'
import UserIcon from './UserIcon'
import ChatHeaderDropdown from './ChatHeaderDropdown'
import { useEffect, useState } from 'react'

export default function ChatHeader({
	profilePicture,
	closeChat,
	name,
	userConnecteds,
	receiver,
	isTypingUser,
	setSureDelete,
}) {
	const [info, setInfo] = useState('User is disconnected')
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		setIsConnected(userConnecteds.some(user => user.userEmail === receiver))

		if (isConnected) {
			setInfo('Online')
		} else if (isTypingUser.success) {
			setInfo('User is typing...')
		} else {
			setInfo('User is disconnected')
		}
	}, [isTypingUser, userConnecteds])

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
					setSureDelete={setSureDelete}
					closeChat={closeChat}
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
	transition: opacity 0.3s ease-in-out, background-color 0.5s ease-in-out,
		color 0.5s ease-in-out;

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

		p {
			line-height: 1;
		}

		.container-data-user {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.user-name-header {
				font-weight: 600;
				color: ${({ theme }) => theme.chat.user};
			}

			.user-email-header {
				font-size: 0.8rem;
				color: ${({ theme }) => theme.chat.mail};
			}
		}
	}

	.user-name-online {
		opacity: 1;
		font-size: 0.8rem;
		font-style: italic;
		color: ${({ theme }) => theme.chat.online};
	}
`
