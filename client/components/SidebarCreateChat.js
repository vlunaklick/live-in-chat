import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'
import ModalCreateChat from './ModalCreateChat'
import { useState, useRef, useEffect } from 'react'
import useText from '../hooks/useText'

export default function SidebarCreateChat({
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	receiver,
}) {
	const { text, changeText, resetText } = useText()
	const [creating, setCreating] = useState(false)

	let createRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!createRef.current?.contains(e.target)) {
				setCreating(false)
				resetText()
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	return (
		<div ref={createRef}>
			<CreateWrapper onClick={() => setCreating(prevState => !prevState)}>
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
				creating={creating}
				setCreating={setCreating}
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
