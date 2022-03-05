import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'
import useText from '../hooks/useText'

export default function SidebarSearch({ setShowChat, lastChats }) {
	const { text, changeText } = useText()

	const searchInput = () => {
		if (text === '') {
			setShowChat(lastChats)
		} else {
			let newChats = lastChats.filter(chat => {
				if (
					chat.creator.toLowerCase().includes(text.toLowerCase()) ||
					chat.email.toLowerCase().includes(text.toLowerCase())
				) {
					return chat
				}
			})
			setShowChat(newChats)
		}
	}

	return (
		<SearchWrapper>
			<div>
				<BsSearch className='svg' />
				<input
					value={text}
					type='text'
					placeholder='Search a chat'
					onChange={e => {
						changeText(e)
						searchInput()
					}}
				/>
			</div>
		</SearchWrapper>
	)
}

const SearchWrapper = styled.div`
	padding: 0.6rem 1.5rem;
	border-bottom: ${({ theme }) => theme.sidebar.border};
	transition: border-bottom 0.5s ease-in-out;

	div {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background-color: ${({ theme }) => theme.sidebar.search_color};
		padding: 0 0.5rem;
		border-radius: 0.5rem;
		transition: background-color 0.5s ease-in-out;

		.svg {
			cursor: pointer;
			color: ${({ theme }) => theme.sidebar.search_svg};
			transition: color 0.5s ease-in-out;
		}
	}

	input {
		padding: 0.3rem;
		width: 100%;
		border-radius: 15px;
		background-color: transparent;
		outline: none;
		border: none;
		color: ${({ theme }) => theme.sidebar.search_svg};
		transition: color 0.5s ease-in-out;
	}
`
