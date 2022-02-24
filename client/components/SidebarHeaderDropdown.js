import styled from 'styled-components'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useState, useRef, useEffect } from 'react'
import Logoutbutton from './LogoutButton'

export default function SidebarHeaderDropdown({ socket, changeTheme }) {
	const [open, setOpen] = useState(false)

	let dropdownRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!dropdownRef.current?.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

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
	z-index: 10;

	.dropdown-menu {
		cursor: pointer;
		color: #fafafa;
		font-size: 1.2rem;
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
	display: flex;
	flex-direction: column;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top right;
	transition: transform 0.2s ease-in;
	gap: 0.5rem;

	.wrapper-links {
		display: flex;
		flex-direction: column;
	}

	.thing-drop {
		padding: 0.5rem 1rem;
		color: #fafafa;
		font-size: 0.9rem;
		transition: background-color 0.5s ease-in-out;
		cursor: pointer;
	}

	.thing-drop:hover {
		background-color: ${({ theme }) => theme.dropdown.hover};
	}
`
