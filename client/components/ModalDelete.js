import styled from 'styled-components'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ModalDelete({
	mainEmail,
	setModal,
	messageSelected,
	messages,
	setMessages,
	socket,
	receiver,
}) {
	const deleteForYou = async () => {
		const token = getCookie('session')

		if (!token) {
			return { props: { success: false, user: {} } }
		}

		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/messages/delete/message`,
			{
				messageId: messageSelected[0].id,
				user: mainEmail,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			}
		)

		let newMessages = messages.filter(chat => {
			if (!(chat.id === messageSelected[0].id)) {
				return chat
			}
		})

		setMessages(newMessages)

		setModal(false)

		toast.success(`Message was deleted!`, {
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

	const deleteForEveryone = async () => {
		const token = getCookie('session')

		if (!token) {
			return { props: { success: false, user: {} } }
		}

		await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/messages/delete/${messageSelected[0].id}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
				withCredentials: true,
			}
		)

		socket.current?.emit('deleteMessage', {
			receiverId: receiver,
			messageId: messageSelected[0].id,
		})

		let newMessages = messages.map(chat => {
			if (chat.id === messageSelected[0].id) {
				return { ...chat, deleted: true }
			} else {
				return chat
			}
		})

		setMessages(newMessages)

		setModal(false)

		toast.success(`Message was deleted!`, {
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

	return (
		<ModalWrapper>
			<div className='box'>
				<p className='title'>Do you want to delete the message?</p>
				<div className='buttons'>
					<button className='cancel' onClick={() => setModal(false)}>
						CANCEL
					</button>
					<button className='delete_you' onClick={() => deleteForYou()}>
						DELETE FOR YOU
					</button>
					{messageSelected.length !== 0 &&
					mainEmail === messageSelected[0].creatorId &&
					messageSelected[0].deleted === false ? (
						<button className='delete_you' onClick={() => deleteForEveryone()}>
							DELETE FOR EVERYONE
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</ModalWrapper>
	)
}

const ModalWrapper = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => theme.modal.bg};
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;

	.box {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background-color: ${({ theme }) => theme.modal.box};
		padding: 1.2rem;
		border-radius: 2px;
		max-width: 315px;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
			0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

		.title {
			color: ${({ theme }) => theme.modal.title};
			font-weight: 500;
			font-size: 1.2rem;
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: flex-end;
			font-size: 1rem;
			font-weight: 500;

			.cancel {
				outline: none;
				letter-spacing: 0.15rem;
				text-align: center;
				background-color: transparent;
				padding: 0.5rem;
				font-size: 0.8rem;
				border: ${({ theme }) => theme.modal.cancel_border};
				color: ${({ theme }) => theme.modal.color_button};
				transition: background-color 0.3s ease-in-out,
					box-shadow 0.3s ease-in-out;
				cursor: pointer;
				border-radius: 2px;
			}

			.cancel:hover {
				background-color: ${({ theme }) => theme.modal.color_cancel_hover};
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
					0px 1px 2px 0px rgba(0, 0, 0, 0.06);
			}

			.delete_you {
				outline: none;
				border: none;
				letter-spacing: 0.15rem;
				text-align: center;
				padding: 0.5rem;
				font-size: 0.8rem;
				background-color: ${({ theme }) => theme.modal.color_button};
				transition: background-color 0.3s ease-in-out,
					box-shadow 0.3s ease-in-out;
				cursor: pointer;
				border-radius: 2px;
			}

			.delete_you:hover {
				background-color: ${({ theme }) => theme.modal.color_button_hover};
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
					0px 1px 2px 0px rgba(0, 0, 0, 0.06);
			}
		}
	}
`
