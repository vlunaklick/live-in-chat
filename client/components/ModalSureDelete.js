import styled from 'styled-components'
import { getCookie } from 'cookies-next'
import axios from 'axios'

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
					} catch (err) {
						console.log(err)
					}
				})
		}
	}

	return (
		<ModalWrapper>
			<div className='box'>
				<p className='title'>Are you want to delete the chat?</p>
				<div className='buttons-sure'>
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

		.buttons-sure {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: flex-end;
			font-size: 1rem;
			font-weight: 500;

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
