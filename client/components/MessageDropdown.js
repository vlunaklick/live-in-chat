import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import axios from 'axios'

export default function MessageDropdown({
	options,
	open,
	setOpen,
	setOptions,
	setChatSelected,
	chatId,
	setLastChats,
	lastChats,
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

	return (
		<WrapperDropdown
			options={options}
			onClick={() => setOpen(prevState => !prevState)}
			ref={dropdownRef}>
			<BsChevronUp className='dropdown-menu' />
			<DropdownStyle open={open}>
				<div>Delete message</div>
			</DropdownStyle>
		</WrapperDropdown>
	)
}

const WrapperDropdown = styled.div`
	width: 20px;
	height: 20px;
	display: ${props => (props.options ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 8px;
	top: 5px;
	z-index: 2;
	background-color: #4c1d95;
	transition: opacity 0.3s ease-in-out, display 0.3s ease-in-out;

	.dropdown-menu {
		cursor: pointer;
		color: #fafafa;
		font-size: 0.8rem;
		z-index: 3;
		position: relative;
		transform: rotate(180deg);
	}
`

const DropdownStyle = styled.div`
	position: absolute;
	top: 20px;
	right: 15px;
	width: 150px;
	transform: translate(-45%);
	overflow: hidden;
	background-color: #190627;
	border-radius: 4px;
	border-top-right-radius: 0;
	padding: 0.5rem 0;
	overflow: hidden;
	z-index: 5;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top right;
	transition: transform 0.2s ease-in;

	div {
		padding: 0.5rem 1rem;
		color: #fafafa;
		font-size: 0.6rem;
		line-height: 1;
		transition: background-color 0.5s ease-in-out;
		cursor: pointer;
	}

	div:hover {
		background-color: #040106;
	}
`
