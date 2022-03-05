import styled from 'styled-components'
import UserIcon from './UserIcon'
import { HiOutlineBan } from 'react-icons/hi'

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
	deleted,
	sideChatRef,
}) => {
	const dateH = new Date(date)

	const hoursGood = dateH.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})

	let messageShow

	if (owner === messageMail) {
		messageShow = `You: ${lastMessage}`
	} else {
		messageShow = `${lastMessage}`
	}

	return (
		<SidebarChatWrapper
			ref={sideChatRef}
			deleted={deleted}
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
					{deleted ? (
						<>
							<HiOutlineBan className='icon-cancel' />
							Message has been eliminated
						</>
					) : (
						messageShow
					)}
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
	border-bottom: ${({ theme }) => theme.sidebar.border};
	cursor: pointer;
	background-color: ${({ selected, id, theme }) =>
		selected === id ? theme.sidebar.chats_hover : ''};
	position: relative;
	transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out,
		border-bottom 0.5s ease-in-out;

	.container-hour-name {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.hour-sidebar-chats {
		font-size: 0.6rem;
		color: ${({ theme }) => theme.chat.chat_hour};
	}

	.sidebar-chat-data {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		padding: 0.3rem 0.2rem;
		height: 46.39px;
		justify-content: center;

		p {
			line-height: 1;
		}

		.sidebar-chat-name {
			font-size: 0.8rem;
			font-weight: 600;
			color: ${({ theme }) => theme.chat.chat_name};
		}

		.sidebar-chat-last {
			font-size: 0.6rem;
			color: ${({ theme }) => theme.chat.chat_message};
			text-overflow: ellipsis;
			max-width: 239.84px;
			white-space: nowrap;
			overflow: hidden;
			font-style: ${({ deleted }) => (deleted ? 'italic' : 'normal')};
			display: ${({ deleted }) => (deleted ? 'flex' : 'block')};
			gap: 0.2rem;
			align-items: center;
		}

		.icon-cancel {
			font-size: 1rem;
		}
	}
`
