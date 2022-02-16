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
}) => {
	return (
		<SidebarChatWrapper
			selected={chatSelected}
			id={id}
			onClick={() => setChatSelected(id)}>
			<UserIcon profilePicture={profilePicture} />
			<div className='sidebar-chat-data'>
				<p className='sidebar-chat-name'>{name}</p>
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

	.sidebar-chat-data {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 80%;
		padding: 0.3rem 0.2rem;
		height: 46.39px;

		p {
			line-height: 1;
		}

		.sidebar-chat-name {
			font-weight: 600;
			color: #fafafa;
		}

		.sidebar-chat-last {
			font-size: 0.8rem;
			color: #d4d4d4;
			text-overflow: ellipsis;
			max-width: 239.84px;
			white-space: nowrap;
			overflow: hidden;
		}
	}
`
