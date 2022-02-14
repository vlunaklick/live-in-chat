import styled from 'styled-components'
import UserIcon from './UserIcon'
import { BiArrowBack } from 'react-icons/bi'

export default function ChatHeader({ user, profilePicture, setChatSelected }) {
	return (
		<ChatHeaderWrapper>
			<div className='data-container'>
				<div className='left-header-chat'>
					<UserIcon profilePicture={profilePicture} />
					<div className='container-data-user'>
						<p className='user-name-header'>{user.name}</p>
					</div>
				</div>
				<BiArrowBack
					className='back-header-chat'
					onClick={() => setChatSelected(false)}
				/>
			</div>
		</ChatHeaderWrapper>
	)
}

const ChatHeaderWrapper = styled.header`
	background-color: #262626;
	padding: 0.6rem;
	display: flex;
	align-items: center;

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
