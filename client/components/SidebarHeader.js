import styled from 'styled-components'
import UserIcon from './UserIcon'
import Logoutbutton from './LogoutButton'

export default function SidebarHeader({ user, socket }) {
	return (
		<HeaderWrapper>
			<div className='data-container'>
				<UserIcon profilePicture='/no-user.jpg' />
				<div className='container-data-user'>
					<p className='user-name-header'>{user.name}</p>
					<p className='user-email-header'>{user.email}</p>
				</div>
			</div>

			<Logoutbutton socket={socket} />
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.header`
	background-color: ${({ theme }) => theme.sidebar.header};
	padding: 0.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: border-rigth 0.5s ease-in-out;
	position: relative;

	.data-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;

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

	@media screen and (min-width: 768px) {
		width: 320px;
		border-right: ${({ theme }) => theme.sidebar.border};
		z-index: 5;
	}
`
