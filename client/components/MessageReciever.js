import styled from 'styled-components'
import { HiOutlineBan } from 'react-icons/hi'
import MessageDropdown from './MessageDropdown'
import { useState } from 'react'

const MessageReciever = ({
	text,
	hours,
	deleted,
	setModal,
	setMessageSelected,
	message,
}) => {
	const [options, setOptions] = useState(false)
	const [open, setOpen] = useState(false)

	const dateH = new Date(hours)

	const hoursGood = dateH.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<MessageRecieverWrapper
			deleted={deleted}
			optionsThing={options}
			onMouseEnter={() => setOptions(true)}
			onMouseLeave={() => {
				if (!open) {
					setOptions(false)
				}
			}}>
			<div className='wrapper-left-text'>
				<p className='text-left'>
					{deleted ? (
						<>
							<HiOutlineBan className='icon-cancel' />
							Message has been eliminated
						</>
					) : (
						text
					)}
				</p>
			</div>
			<p className='hour-left'>{hoursGood}</p>
			<MessageDropdown
				options={options}
				open={open}
				setOpen={setOpen}
				setOptions={setOptions}
				setModal={setModal}
				setMessageSelected={setMessageSelected}
				message={message}
				sender={false}
			/>
		</MessageRecieverWrapper>
	)
}

export default MessageReciever

const MessageRecieverWrapper = styled.div`
	padding: 6px 7px 8px 9px;
	margin: 0 auto 0 0;
	display: flex;
	flex-direction: column;
	background-color: #171717;
	border-radius: 7.5px;
	border-top-left-radius: 0;
	max-width: 65%;
	position: relative;
	box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
		0px 2px 4px -1px rgba(0, 0, 0, 0.06);
	width: fit-content;

	.wrapper-left-text {
		position: relative;
		overflow-wrap: break-word;
		white-space: pre-wrap;
		font-size: 0.8875rem;
		line-height: 1.1875rem;
	}

	.text-left {
		font-size: 0.8rem;
		color: #fafafa;
		min-width: ${({ deleted }) => (deleted ? '250px' : '111px')};
		max-width: 622px;
		margin-bottom: 0.5rem;
		line-height: ${({ deleted }) => (deleted ? '1' : '')};
		font-style: ${({ deleted }) => (deleted ? 'italic' : 'normal')};
		display: ${({ deleted }) => (deleted ? 'flex' : 'block')};
		align-items: center;
		gap: 0.2rem;
		color: ${({ deleted, theme }) =>
			deleted ? theme.chat.deleted : '#fafafa'};
	}

	.hour-left {
		font-size: 0.5rem;
		color: #a1a1aa;
		position: absolute;
		right: 8px;
		bottom: 5px;
		z-index: 2;
		line-height: 1;
	}
`
