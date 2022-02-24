import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'
import ModalCreateChat from './ModalCreateChat'
import { useState, useRef, useEffect } from 'react'

export default function SidebarCreateChat({
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	receiver,
}) {
	const [text, setText] = useState('')
	const [creating, setCreating] = useState(false)

	let createRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!createRef.current?.contains(e.target)) {
				setCreating(false)
				setText('')
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
				setText={setText}
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
	color: #fafafa;
	cursor: pointer;
	position: relative;

	p {
		font-weight: 500;
	}
`
