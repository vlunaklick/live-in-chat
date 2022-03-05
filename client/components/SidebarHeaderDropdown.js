import styled from 'styled-components'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Logoutbutton from './LogoutButton'
import useDropdown from '../hooks/useDropdown'

export default function SidebarHeaderDropdown({ socket, changeTheme }) {
	const { open, setOpen, dropdownRef } = useDropdown()

	return (
		<WrapperDropdown
			onClick={() => setOpen(prevState => !prevState)}
			ref={dropdownRef}>
			<BsThreeDotsVertical className='dropdown-menu' />
			<DropdownStyle open={open}>
				<div className='wrapper-links'>
					<a
						className='thing-drop'
						href='https://github.com/vlunaklick'
						target='__blank'>
						GitHub
					</a>
					<div className='thing-drop' onClick={() => changeTheme()}>
						Change theme
					</div>
				</div>
				<Logoutbutton socket={socket} />
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

	.dropdown-menu {
		cursor: pointer;
		color: ${({ theme }) => theme.sidebar.user};
		font-size: 1.2rem;
		transition: color 0.5s ease-in-out;
	}
`

const DropdownStyle = styled.div`
	z-index: 5;
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
	display: flex;
	flex-direction: column;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top right;
	transition: transform 0.2s ease-in, background-color 0.5s ease-in-out;
	gap: 0.5rem;

	.wrapper-links {
		display: flex;
		flex-direction: column;
	}

	.thing-drop {
		padding: 0.5rem 1rem;
		color: ${({ theme }) => theme.sidebar.user};
		font-size: 0.9rem;
		transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
		cursor: pointer;
	}

	.thing-drop:hover {
		background-color: ${({ theme }) => theme.dropdown.hover};
	}
`
