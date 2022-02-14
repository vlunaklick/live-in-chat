import styled from 'styled-components'
import UserIcon from './UserIcon'
import { useState } from 'react'

const SidebarChat = ({
	name,
	lastMessage,
	profilePicture,
	id,
	setChatSelected,
	chatSelected,
}) => {
	return (
		<SidebarChatWrapper
			selected={chatSelected}
			id={id}
			onClick={() => setChatSelected(id)}>
			<UserIcon profilePicture={profilePicture} />
			<div className='sidebar-chat-data'>
				<p className='sidebar-chat-name'>{name}</p>
				<p className='sidebar-chat-last'>{lastMessage}</p>
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
	cursor: pointer;
	background-color: ${({ selected, id }) => (selected === id ? '#737373' : '')};

	.sidebar-chat-data {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		width: 80%;
		padding: 0.3rem 0.2rem;
		border-bottom: 1px solid #737373;

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
		}
	}
`
