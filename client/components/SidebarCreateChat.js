import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'
import ModalCreateChat from './ModalCreateChat'
import { useState } from 'react'

export default function SidebarCreateChat({
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	receiver,
}) {
	const [creating, setCreating] = useState(false)

	return (
		<CreateWrapper onClick={() => setCreating(prevState => !prevState)}>
			<FaUserPlus className='icon' />
			<p>New chat</p>
			<ModalCreateChat
				sender={sender}
				lastChats={lastChats}
				setLastChats={setLastChats}
				setChatSelected={setChatSelected}
				socket={socket}
				receiver={receiver}
				creating={creating}
				setCreating={setCreating}
			/>
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

	p {
		font-weight: 500;
	}
`
