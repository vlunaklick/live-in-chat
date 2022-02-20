import styled from 'styled-components'
import UserIcon from './UserIcon'
import ChatHeaderDropdown from './ChatHeaderDropdown'

export default function ChatHeader({
	user,
	profilePicture,
	setChatSelected,
	name,
	chatId,
	setLastChats,
	lastChats,
}) {
	return (
		<ChatHeaderWrapper>
			<div className='data-container'>
				<div className='left-header-chat'>
					<UserIcon profilePicture={profilePicture} />
					<div className='container-data-user'>
						<p className='user-name-header'>{name}</p>
					</div>
				</div>
				<ChatHeaderDropdown
					setChatSelected={setChatSelected}
					chatId={chatId}
					setLastChats={setLastChats}
					lastChats={lastChats}
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
			gap: 0.2rem;

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
`
