import styled from 'styled-components'
import UserIcon from './UserIcon'

export default function ChatHeader({ user, profilePicture }) {
	return (
		<ChatHeaderWrapper>
			<div className='data-container'>
				<UserIcon profilePicture={profilePicture} />
				<div className='container-data-user'>
					<p className='user-name-header'>{user.name}</p>
				</div>
			</div>
		</ChatHeaderWrapper>
	)
}

const ChatHeaderWrapper = styled.header`
	background-color: #262626;
	padding: 0.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.data-container {
		display: flex;
		align-items: center;
		gap: 1rem;

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
