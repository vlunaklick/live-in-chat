import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'
import { regexMail } from '../utils/regexMail'

export default function ModalCreateChat({
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	setCreating,
	creating,
	text,
	setText,
}) {
	const changeName = async e => {
		try {
			if (text.match(regexMail) !== null) {
				try {
					const token = getCookie('session')
					await axios
						.post(
							`${process.env.NEXT_PUBLIC_API_URL}/chats/create`,
							{
								sender: sender,
								receiver: text,
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
							setChatSelected(data.message.id)
						})

					socket.current?.emit('createChat', {
						receiverId: text,
					})

					setCreating(false)

					toast.success(`Chat was created successfully!`, {
						theme: 'dark',
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
					})
				} catch (err) {
					console.log(err)
				}
			} else {
				toast.error(`That's not an email!`, {
					theme: 'dark',
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	const writeEmail = e => {
		setText(e.target.value)
	}

	const cancelEmail = () => {
		setCreating(prevState => !prevState)
		setText('')
	}

	return (
		<ModalCreateWrapper creating={creating}>
			<p className='title'>Insert the email you are refering to</p>
			<input
				className='create-input'
				type='text'
				placeholder='Email'
				value={text}
				onChange={writeEmail}
			/>
			<div className='btns-create-chat'>
				<button className='create-cancel' onClick={() => cancelEmail()}>
					CANCEL
				</button>
				<button className='create-create' onClick={e => changeName(e)}>
					CREATE
				</button>
			</div>
		</ModalCreateWrapper>
	)
}

const ModalCreateWrapper = styled.div`
	top: 50px;
	left: 0;
	right: 0;
	background-color: ${({ theme }) => theme.create_chat.box};
	position: absolute;
	width: 80%;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 15px;
	border-radius: 3px;
	margin: 0 auto;
	z-index: 5;
	filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
	transform: ${({ creating }) => (creating ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top;
	transition: transform 0.2s ease-in, background-color 0.5s ease-in-out;

	:before {
		content: '';
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 15px 15px 0px 15px;
		border-color: ${({ theme }) => theme.create_chat.box} transparent
			transparent transparent;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		top: -15px;
		transform: rotate(180deg);
		left: 0;
		right: 0;
		margin: 0 auto;

		transition: border-color 0.5s ease-in-out;
	}

	.title {
		color: ${({ theme }) => theme.create_chat.title};
		font-weight: 600;
		transition: color 0.5s ease-in-out;
	}

	.create-input {
		padding: 5px;
		outline: none;
		border: 2px solid ${({ theme }) => theme.create_chat.color_button};
		background-color: ${({ theme }) => theme.create_chat.bg};
		color: ${({ theme }) => theme.create_chat.color_input};
		font-size: 0.9rem;
		transition: border 0.5s ease-in-out, background-color 0.5s ease-in-out;
	}

	.btns-create-chat {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		font-size: 1rem;
		font-weight: 500;

		.create-cancel {
			outline: none;
			letter-spacing: 0.15rem;
			text-align: center;
			background-color: transparent;
			padding: 0.5rem;
			font-size: 0.8rem;
			border: ${({ theme }) => theme.create_chat.cancel_border};
			color: ${({ theme }) => theme.create_chat.color_button};
			transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
				border 0.5s ease-in-out, color 0.5s ease-in-out;
			cursor: pointer;
			border-radius: 2px;
		}

		.create-cancel:hover {
			background-color: ${({ theme }) => theme.create_chat.color_cancel_hover};
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
				0px 1px 2px 0px rgba(0, 0, 0, 0.06);
		}

		.create-create {
			outline: none;
			border: none;
			letter-spacing: 0.15rem;
			text-align: center;
			padding: 0.5rem;
			font-size: 0.8rem;
			color: ${({ theme }) => theme.create_chat.color_button_text};
			background-color: ${({ theme }) => theme.create_chat.color_button};
			transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
				border 0.5s ease-in-out, color 0.5s ease-in-out;
			cursor: pointer;
			border-radius: 2px;
		}

		.create-create:hover {
			background-color: ${({ theme }) => theme.create_chat.color_button_hover};
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
				0px 1px 2px 0px rgba(0, 0, 0, 0.06);
		}
	}
`
