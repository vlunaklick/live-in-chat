import styled from 'styled-components'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useDropdown from '../hooks/useDropdown'

export default function ChatHeaderDropdown({ closeChat, setSureDelete }) {
	const { open, setOpen, dropdownRef } = useDropdown()

	return (
		<WrapperDropdown
			onClick={() => setOpen(prevState => !prevState)}
			ref={dropdownRef}>
			<BsThreeDotsVertical className='dropdown-menu' />
			<DropdownStyle open={open}>
				<div onClick={() => closeChat(false)}>Close chat</div>
				<div onClick={() => setSureDelete(true)}>Delete chat</div>
			</DropdownStyle>
		</WrapperDropdown>
	)
}

const WrapperDropdown = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 20;
	transition: opacity 0.3s ease-in-out, display 0.3s ease-in-out,
		background-color 0.5s ease-in-out, color 0.5s ease-in-out;

	.dropdown-menu {
		cursor: pointer;
		color: ${({ theme }) => theme.chat.user};
		font-size: 1.2rem;
		transition: color 0.5s ease-in-out;
	}
`

const DropdownStyle = styled.div`
	position: absolute;
	top: 42px;
	right: 25px;
	width: 150px;
	transform: translate(-45%);
	overflow: hidden;
	background-color: ${({ theme }) => theme.dropdown.bg};
	border-radius: 4px;
	border-top-right-radius: 0;
	padding: 0.5rem 0;
	overflow: hidden;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top right;
	transition: transform 0.2s ease-in, opacity 0.3s ease-in-out,
		display 0.3s ease-in-out, background-color 0.5s ease-in-out,
		color 0.5s ease-in-out;

	div {
		padding: 0.5rem 1rem;
		color: ${({ theme }) => theme.chat.user};
		font-size: 0.9rem;
		transition: background-color 0.5s ease-in-out;
		cursor: pointer;
	}

	div:hover {
		background-color: ${({ theme }) => theme.dropdown.hover};
	}
`
