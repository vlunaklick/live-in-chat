import styled from 'styled-components'
import Sidebarchat from './SidebarChat'
import { useState } from 'react'

const Sidebar = () => {
	const [chatSelected, setChatSelected] = useState(false)

	return (
		<SidebarWrapper>
			<Sidebarchat
				name='Valen'
				lastMessage='Re loco'
				profilePicture='/no-user.jpg'
				setChatSelected={setChatSelected}
				id='1'
				chatSelected={chatSelected}
			/>
			<Sidebarchat
				name='Valtol'
				lastMessage='ahre'
				profilePicture='/no-user.jpg'
				setChatSelected={setChatSelected}
				id='3'
				chatSelected={chatSelected}
			/>
			<Sidebarchat
				name='Angi'
				lastMessage='SAPEEE'
				profilePicture='/no-user.jpg'
				setChatSelected={setChatSelected}
				id='2'
				chatSelected={chatSelected}
			/>
		</SidebarWrapper>
	)
}

export default Sidebar

const SidebarWrapper = styled.section`
	background-color: #404040;
	width: 100%;
	height: 100%;
	transition: border-rigth 0.5s ease-in-out;

	@media screen and (min-width: 768px) {
		width: 320px;
		height: calc(100vh - 59.19px - 20px);
		border-right: 1px solid #737373;
	}
`
