import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'
import ModalCreateChat from './ModalCreateChat'
import useText from '../hooks/useText'
import useDropdown from '../hooks/useDropdown'

export default function SidebarCreateChat({
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	receiver,
}) {
	const { text, changeText, resetText } = useText()
	const { open, setOpen, dropdownRef } = useDropdown()

	return (
		<div ref={dropdownRef}>
			<CreateWrapper onClick={() => setOpen(prevState => !prevState)}>
				<FaUserPlus />
				<p>New chat</p>
			</CreateWrapper>
			<ModalCreateChat
				sender={sender}
				lastChats={lastChats}
				setLastChats={setLastChats}
				setChatSelected={setChatSelected}
				socket={socket}
				receiver={receiver}
				open={open}
				setOpen={setOpen}
				text={text}
				changeText={changeText}
				resetText={resetText}
			/>
		</div>
	)
}

const CreateWrapper = styled.div`
	display: flex;
	gap: 1rem;
	padding: 0.6rem 1.5rem;
	justify-content: center;
	align-items: center;
	border-bottom: ${({ theme }) => theme.sidebar.border};
	color: ${({ theme }) => theme.sidebar.search_svg};
	cursor: pointer;
	position: relative;
	transition: border-bottom 0.5s ease-in-out, color 0.5s ease-in-out;

	p {
		font-weight: 500;
	}
`
