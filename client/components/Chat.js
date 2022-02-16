import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import MessageSender from './MessageSender'

export default function Chat({ user, chatSelected, setChatSelected }) {
	return (
		<ChatWrapper>
			{chatSelected !== false ? (
				<SubChatWrapper>
					<ChatHeader
						user={user}
						profilePicture='/no-user.jpg'
						setChatSelected={setChatSelected}
					/>
					<ChatContent />
					<MessageSender />
				</SubChatWrapper>
			) : (
				''
			)}
		</ChatWrapper>
	)
}

export async function getServerSideProps(context) {
	const { res, req } = context

	const token = getCookie('session', { req, res })

	if (!token) {
		return { props: { success: false, user: {} } }
	}

	const authResponse = await axios.get('http://localhost:3005/users/me', {
		headers: { Authorization: `Bearer ${token}` },
		withCredentials: true,
	})

	let props

	if (authResponse.status === 200) {
		props = {
			success: authResponse.data.success,
			user: authResponse.data.user,
		}
	}

	const lastChats = await axios.get(
		`http://localhost:3005/chats/${props.user.email}`,
		{
			headers: { Authorization: `Bearer ${token}` },
			withCredentials: true,
		}
	)

	if (lastChats.status === 200) {
		props = {
			...props,
			lastChats: lastChats.data.chats,
		}
	}

	return { props: props }
}

const ChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;

	@media screen and (min-width: 768px) {
		position: relative;
		height: 100%;
	}
`

const SubChatWrapper = styled.section`
	width: 100%;
	background-color: #262626;
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 768px) {
		position: relative;
		height: 100%;
	}
`

const ChatContent = styled.section`
	background-color: #737373;
	background-image: url();
	height: calc(100vh - 59.19px - 59.19px);
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;

	@media screen and (min-width: 1386px) {
		height: calc(100vh - 59.19px - 59.19px - 20px);
	}
`
