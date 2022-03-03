import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { BsChevronUp } from 'react-icons/bs'

export default function MessageDropdown({
	options,
	open,
	setOpen,
	setOptions,
	setModal,
	setMessageSelected,
	message,
	sender,
}) {
	let dropdownRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!dropdownRef.current?.contains(e.target) && open) {
				setOpen(false)
				setOptions(false)
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	const openModal = () => {
		setMessageSelected([message])
		setModal(true)
	}

	return (
		<>
			<WrapperDropdown
				options={options}
				onClick={() => setOpen(prevState => !prevState)}
				ref={dropdownRef}>
				<BsChevronUp className='dropdown-menu' />
				<DropdownStyle sender={sender} open={open}>
					<div onClick={() => openModal()}>Delete message</div>
				</DropdownStyle>
			</WrapperDropdown>
		</>
	)
}

const WrapperDropdown = styled.div`
	width: 1.2rem;
	height: 1.2rem;
	display: ${props => (props.options ? 'flex' : 'none')};
	position: absolute;
	justify-content: center;
	align-items: center;
	right: 5px;
	top: 5px;
	z-index: 2;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.dropdown.svg};
	transition: opacity 0.3s ease-in-out, display 0.3s ease-in-out,
		background-color 0.5s ease-in-out, color 0.5s ease-in-out;

	.dropdown-menu {
		cursor: pointer;
		color: ${({ theme }) => theme.chat.user};
		font-size: 0.8rem;
		z-index: 3;
		position: relative;
		transform: rotate(180deg);
	}
`

const DropdownStyle = styled.div`
	position: absolute;
	top: ${props => (props.sender ? '20px' : '20px')};
	right: ${props => (props.sender ? '15px' : '-140px')};
	width: 150px;
	transform: translate(-45%);
	overflow: hidden;
	background-color: ${({ theme }) => theme.dropdown.bg};
	border-radius: 4px;
	border-top-right-radius: 0;
	padding: 0.5rem 0;
	overflow: hidden;
	z-index: 5;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: ${props => (props.sender ? 'top right' : 'top left')};
	transition: transform 0.2s ease-in;

	div {
		padding: 0.5rem 1rem;
		font-size: 0.6rem;
		line-height: 1;
		transition: background-color 0.5s ease-in-out;
		cursor: pointer;
	}

	div:hover {
		background-color: ${({ theme }) => theme.dropdown.hover};
	}
`
