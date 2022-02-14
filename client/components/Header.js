import styled from 'styled-components'
import UserIcon from './UserIcon'

export default function Header({ user }) {
	console.log(user)
	return (
		<HeaderWrapper>
			<div className='data-container'>
				<UserIcon />
				<div>
					<p className='user-name-header'>{user.name}</p>
					<p className='user-email-header'>{user.email}</p>
				</div>
			</div>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.header`
	background-color: #262626;
	padding: 0.5rem;

	.data-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		p {
			line-height: 1;
		}

		.user-name-header {
			font-weight: 600;
			color: #fafafa;
		}

		.user-email-header {
			font-size: 0.8rem;
			color: #a3a3a3;
		}
	}
`
