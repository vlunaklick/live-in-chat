import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Live in Chat</title>
				<meta name='description' content='Chatting app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ChatWrapper></ChatWrapper>
		</div>
	)
}

const ChatWrapper = styled.main`
	background-color: #171717;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
