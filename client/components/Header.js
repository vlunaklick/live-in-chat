import styled from 'styled-components'
import UserIcon from './UserIcon'

export default function Header() {
	return (
		<HeaderWrapper>
			<UserIcon />
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.header`
	background-color: #262626;
	padding: 0.5rem;
`
