import styled from 'styled-components'
import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { newDisconnection } from '../socket/socket.js'

const Logoutbutton = () => {
	const router = useRouter()

	const logOut = e => {
		e.preventDefault()
		removeCookies('session')
		newDisconnection()
		router.reload('/')
	}

	return <LogOutWrapper onClick={logOut}>Logout</LogOutWrapper>
}

export default Logoutbutton

const LogOutWrapper = styled.button`
	background-color: #dc2626;
	padding: 0.6rem 1rem;
	outline: none;
	border: none;
	cursor: pointer;
	border-radius: 0.5rem;
	color: #fafafa;
	font-size: 0.775rem;
	line-height: 1;
	transition: background-color 0.5s ease-in-out;

	:hover,
	:active {
		background-color: #b91c1c;
	}
`
