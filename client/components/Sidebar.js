import styled from 'styled-components'
import Sidebarchat from './SidebarChat'
import SearchSide from './SearchSide'
import CreateNewChat from './CreateNewChat'

const Sidebar = ({
	chatSelected,
	setChatSelected,
	lastChats,
	owner,
	setLastChats,
}) => {
	let fixedArray = lastChats.sort((a, b) => {
		return new Date(b.date) - new Date(a.date)
	})

	const lastChatsShow = fixedArray.map(chat => {
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
				key={chat.chatId}
			/>
		)
	})

	return (
		<SidebarWrapper>
			<CreateNewChat
				sender={owner}
				lastChats={lastChats}
				setLastChats={setLastChats}
			/>
			<SearchSide />
			<div className='container-chats-side'>{lastChatsShow}</div>
		</SidebarWrapper>
	)
}

export default Sidebar

const SidebarWrapper = styled.section`
	background-color: #404040;
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
		border-right: 1px solid #737373;
	}

	@media screen and (min-width: 1386px) {
		.container-chats-side {
			height: calc(100vh - 59.19px - 44.19px - 53.78px - 20px);
		}
		height: calc(100vh - 59.19px - 20px);
	}
`
