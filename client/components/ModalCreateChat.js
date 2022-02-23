import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

export default function ModalCreateChat({
	setCreating,
	sender,
	lastChats,
	setLastChats,
	setChatSelected,
	socket,
	creating,
}) {
	const [text, setText] = useState('')

	let createRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!createRef.current?.contains(e.target) && open) {
				setCreating(false)
				setText('')
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	const changeName = async e => {
		const regexMail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
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

	const cancelEmail = e => {
		setCreating(false)
		setText('')
	}

	return (
		<ModalCreateWrapper creating={creating} ref={createRef}>
			<p className='title'>Insert the email you are refering to</p>
			<input
				className='create-input'
				type='text'
				placeholder='Email'
				value={text}
				onChange={writeEmail}
			/>
			<div className='btns-create-chat'>
				<button className='create-cancel' onClick={cancelEmail}>
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
	top: 60px;
	left: 0;
	right: 0;
	background-color: ${({ theme }) => theme.modal.box};
	position: absolute;
	width: 80%;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 15px;
	border-radius: 3px;
	margin: 0 auto;
	z-index: 5;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
		0px 1px 2px 0px rgba(0, 0, 0, 0.06);
	transform: ${({ creating }) => (creating ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top;
	transition: transform 0.2s ease-in;

	:before {
		content: '';
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 15px 15px 0px 15px;
		border-color: ${({ theme }) => theme.modal.box} transparent transparent
			transparent;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		top: -15px;
		transform: rotate(180deg);
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.title {
		color: #fafafa;
		font-weight: 600;
	}

	.create-input {
		padding: 5px;
		outline: none;
		border: 2px solid ${({ theme }) => theme.modal.color_button};
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px 0px rgba(0, 0, 0, 0.06);
		background-color: ${({ theme }) => theme.modal.bg};
		color: #fafafa;
		font-size: 0.9rem;
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
			border: ${({ theme }) => theme.modal.cancel_border};
			color: ${({ theme }) => theme.modal.color_button};
			transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
			cursor: pointer;
			border-radius: 2px;
		}

		.create-cancel:hover {
			background-color: ${({ theme }) => theme.modal.color_cancel_hover};
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
			background-color: ${({ theme }) => theme.modal.color_button};
			transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
			cursor: pointer;
			border-radius: 2px;
		}

		.create-create:hover {
			background-color: ${({ theme }) => theme.modal.color_button_hover};
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
				0px 1px 2px 0px rgba(0, 0, 0, 0.06);
		}
	}
`
