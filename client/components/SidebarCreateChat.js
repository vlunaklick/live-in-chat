import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'

export default function SidebarCreateChat({ setCreating }) {
	return (
		<CreateWrapper onClick={() => setCreating(true)}>
			<FaUserPlus />
			<p>Start a conversation.</p>
		</CreateWrapper>
	)
}

const CreateWrapper = styled.div`
	display: flex;
	gap: 1rem;
	padding: 0.6rem 1.5rem;
	justify-content: center;
	align-items: center;
	border-bottom: ${({ theme }) => theme.sidebar.border};
	color: #fafafa;
	cursor: pointer;
	position: relative;
`
