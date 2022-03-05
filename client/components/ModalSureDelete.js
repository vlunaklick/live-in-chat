import styled from 'styled-components'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ModalSureDelete({
	chatId,
	setMessages,
	setSureDelete,
}) {
	const deleteChat = async () => {
		const token = getCookie('session')

		if (chatId) {
			await axios
				.delete(`${process.env.NEXT_PUBLIC_API_URL}/chats/id/${chatId}`, {
					headers: { Authorization: `Bearer ${token}` },
					withCredentials: true,
				})
				.then(data => {
					try {
						setMessages([])
						setSureDelete(false)
					} catch (error) {
						console.log(error)
					}
				})
				.catch(error => console.log(error))
		}

		toast.success(`Chat was deleted!`, {
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
				<div className='info-wrap'>
					<p className='title'>DELETE CHAT</p>
					<p className='text-info'>
						You are one step away from permanently deleting{' '}
						<b>all the conversation, this action cannot be reversed.</b>
					</p>
				</div>
				<div className='buttons-sure'>
					<p className='text-btn'>Are you sure you want to delete it?</p>
					<button className='sure-cancel' onClick={() => setSureDelete(false)}>
						CANCEL
					</button>
					<button className='sure-confirm' onClick={deleteChat}>
						CONFIRM
					</button>
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
	transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;

	.box {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: ${({ theme }) => theme.modal.box};
		padding: 1.2rem;
		border-radius: 2px;
		max-width: 315px;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
			0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

		.info-wrap {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.title {
			color: ${({ theme }) => theme.modal.title};
			font-weight: 800;
			letter-spacing: 0.1rem;
			font-size: 1.4rem;
		}

		.text-info {
			color: ${({ theme }) => theme.modal.text_color};
			font-size: 0.9rem;
		}

		b {
			font-weight: 800;
			color: ${({ theme }) => theme.modal.text_bold};
		}

		.buttons-sure {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: flex-end;
			font-size: 1rem;
			font-weight: 500;

			.text-btn {
				color: ${({ theme }) => theme.modal.text_color};
				font-size: 0.9rem;
			}

			.sure-cancel {
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

			.sure-cancel:hover {
				background-color: ${({ theme }) => theme.modal.color_cancel_hover};
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
					0px 1px 2px 0px rgba(0, 0, 0, 0.06);
			}

			.sure-confirm {
				outline: none;
				border: none;
				letter-spacing: 0.15rem;
				text-align: center;
				padding: 0.5rem;
				font-size: 0.8rem;
				color: ${({ theme }) => theme.modal.color_confirm_text};
				background-color: ${({ theme }) => theme.modal.color_button};
				transition: background-color 0.3s ease-in-out,
					box-shadow 0.3s ease-in-out;
				cursor: pointer;
				border-radius: 2px;
			}

			.sure-confirm:hover {
				background-color: ${({ theme }) => theme.modal.color_button_hover};
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
					0px 1px 2px 0px rgba(0, 0, 0, 0.06);
			}
		}
	}
`
