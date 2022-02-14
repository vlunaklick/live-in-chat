import styled from 'styled-components'
import UserIcon from './UserIcon'
import Logoutbutton from './LogoutButton'

export default function Header({ user }) {
	return (
		<HeaderWrapper>
			<div className='data-container'>
				<UserIcon />
				<div className='container-data-user'>
					<p className='user-name-header'>{user.name}</p>
					<p className='user-email-header'>{user.email}</p>
				</div>
			</div>

			<Logoutbutton />
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.header`
	background-color: #262626;
	padding: 0.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

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
	}
`
