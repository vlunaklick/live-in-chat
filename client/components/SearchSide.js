import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'

export default function SearchSide() {
	return (
		<SearchWrapper>
			<div>
				<BsSearch className='svg' />
				<input type='text' placeholder='Search a chat' />
			</div>
		</SearchWrapper>
	)
}

const SearchWrapper = styled.div`
	padding: 0.6rem 1.5rem;
	border-bottom: 1px solid #737373;

	div {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background-color: #525252;
		padding: 0 0.5rem;
		border-radius: 0.5rem;

		.svg {
			cursor: pointer;
			color: #fafafa;
		}
	}

	input {
		padding: 0.3rem;
		width: 100%;
		border-radius: 15px;
		background-color: transparent;
		outline: none;
		border: none;
		color: #fafafa;
	}
`
