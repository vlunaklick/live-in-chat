import styled from 'styled-components'
import Sidebarchat from './SidebarChat'
import SidebarSearch from './SidebarSearch'
import SidebarCreateChat from './SidebarCreateChat'
import { useState, useEffect } from 'react'

const Sidebar = ({
	chatSelected,
	setChatSelected,
	lastChats,
	owner,
	setLastChats,
	socket,
	receiver,
}) => {
	const [showChat, setShowChat] = useState(lastChats)

	useEffect(() => {
		setShowChat(lastChats)
	}, [lastChats])

	let fixedArray = showChat.sort((a, b) => {
		return new Date(b.date) - new Date(a.date)
	})

	let lastChatsShow = fixedArray.map(chat => {
		return (
			<Sidebarchat
				owner={owner}
				date={chat.date}
				messageMail={chat.email}
				name={chat.creator}
				lastMessage={chat.message}
				profilePicture='/no-user.jpg'
				setChatSelected={setChatSelected}
				id={chat.chatId}
				chatSelected={chatSelected}
				deleted={chat.deleted}
				key={chat.chatId}
			/>
		)
	})

	return (
		<SidebarWrapper>
			<SidebarCreateChat
				sender={owner}
				lastChats={showChat}
				setLastChats={setLastChats}
				setChatSelected={setChatSelected}
				socket={socket}
				receiver={receiver}
			/>
			<SidebarSearch setShowChat={setShowChat} lastChats={lastChats} />
			<div className='container-chats-side'>{lastChatsShow}</div>
		</SidebarWrapper>
	)
}

export default Sidebar

const SidebarWrapper = styled.section`
	background-color: ${({ theme }) => theme.sidebar.chats};
	width: 100%;
	height: calc(100vh - 59.19px);
	transition: border-rigth 0.5s ease-in-out;
	position: relative;

	.container-chats-side {
		position: absolute;
		max-height: 100%;
		width: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 59.19px - 44.19px - 53.78px);
	}

	@media screen and (min-width: 768px) {
		width: 320px;
		border-right: ${({ theme }) => theme.sidebar.border};
	}

	@media screen and (min-width: 1386px) {
		.container-chats-side {
			height: calc(100vh - 59.19px - 44.19px - 53.78px - 20px);
		}
		height: calc(100vh - 59.19px - 20px);
	}
`
