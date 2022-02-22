import styled from 'styled-components'
import { FaUserPlus } from 'react-icons/fa'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export default function SidebarCreateChat({ sender, lastChats, setLastChats }) {
	const changeName = async () => {
		let newN = prompt('Enter the email')
		const regexMail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
		try {
			if (newN.match(regexMail) !== null) {
				try {
					const token = getCookie('session')
					await axios
						.post(
							'https://liveinchat-database.herokuapp.com/chats/create',
							{
								sender: sender,
								receiver: newN,
							},
							{
								headers: { Authorization: `Bearer ${token}` },
								withCredentials: true,
							}
						)
						.then(({ data }) => {
							setLastChats([
								...lastChats,
								{
									chatId: data.message.id,
									creator: data.message.members[1],
									date: data.message.createdAt,
									email: data.message.members[1],
									message: '',
								},
							])
						})
				} catch (err) {
					console.log(err)
				}
			}
		} catch (err) {}
	}

	return (
		<CreateWrapper onClick={() => changeName()}>
			<FaUserPlus />
			<p>Start a conversation.</p>
		</CreateWrapper>
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
`
