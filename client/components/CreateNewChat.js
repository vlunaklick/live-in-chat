import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'

export default function CreateNewChat() {
	const changeName = () => {
		let newN = prompt('Enter the email')
	}

	return (
		<CreateWrapper onClick={() => changeName()}>
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
	border-bottom: 1px solid #737373;
	color: #fafafa;
	cursor: pointer;
`
