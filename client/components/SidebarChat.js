import styled from 'styled-components'
import UserIcon from './UserIcon'

const SidebarChat = ({
	name,
	lastMessage,
	profilePicture,
	id,
	setChatSelected,
	chatSelected,
	owner,
	messageMail,
	date,
}) => {
	const dateH = new Date(date)

	const hoursGood = dateH.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<SidebarChatWrapper
			selected={chatSelected}
			id={id}
			onClick={() => setChatSelected(id)}>
			<UserIcon profilePicture={profilePicture} />
			<div className='sidebar-chat-data'>
				<div className='container-hour-name'>
					<p className='sidebar-chat-name'>{name}</p>
					<p className='hour-sidebar-chats'>{hoursGood}</p>
				</div>
				<p className='sidebar-chat-last'>
					{owner === messageMail ? `You: ${lastMessage}` : lastMessage}
				</p>
			</div>
		</SidebarChatWrapper>
	)
}

export default SidebarChat

const SidebarChatWrapper = styled.div`
	display: flex;
	padding: 0.6rem;
	gap: 0.5rem;
	align-items: center;
	border-bottom: 1px solid #737373;
	cursor: pointer;
	background-color: ${({ selected, id }) => (selected === id ? '#737373' : '')};
	position: relative;

	.container-hour-name {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.hour-sidebar-chats {
		font-size: 0.6rem;
		color: #e5e5e5;
	}

	.sidebar-chat-data {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 80%;
		padding: 0.3rem 0.2rem;
		height: 46.39px;
		justify-content: center;

		p {
			line-height: 1;
		}

		.sidebar-chat-name {
			font-size: 0.8rem;
			font-weight: 600;
			color: #fafafa;
		}

		.sidebar-chat-last {
			font-size: 0.6rem;
			color: #d4d4d4;
			text-overflow: ellipsis;
			max-width: 239.84px;
			white-space: nowrap;
			overflow: hidden;
		}
	}
`
