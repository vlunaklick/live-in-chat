import styled from 'styled-components'
import { HiOutlineBan } from 'react-icons/hi'
import MessageDropdown from './MessageDropdown'
import converHours from '../utils/convertHours'

import useDropdownMessage from '../hooks/useDropdownMessage'

const MessageReciever = ({
	text,
	hours,
	deleted,
	setModal,
	setMessageSelected,
	messagePlain,
}) => {
	const { open, setOpen, messageDropdownRef, options, setOptions } =
		useDropdownMessage()

	const hoursGood = converHours(hours)

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
				setModal={setModal}
				setMessageSelected={setMessageSelected}
				message={messagePlain}
				sender={false}
				messageDropdownRef={messageDropdownRef}
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
	background-color: ${({ theme }) => theme.receiver.bg};
	border-radius: 7.5px;
	border-top-left-radius: 0;
	max-width: 65%;
	position: relative;
	box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
		0px 2px 4px -1px rgba(0, 0, 0, 0.06);
	width: fit-content;
	transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;

	.wrapper-left-text {
		position: relative;
		overflow-wrap: break-word;
		white-space: pre-wrap;
		font-size: 0.8875rem;
		line-height: 1.1875rem;
	}

	.text-left {
		font-size: 0.8rem;
		min-width: ${({ deleted }) => (deleted ? '250px' : '111px')};
		max-width: 622px;
		margin-bottom: 0.5rem;
		line-height: ${({ deleted }) => (deleted ? '1' : '')};
		font-style: ${({ deleted }) => (deleted ? 'italic' : 'normal')};
		display: ${({ deleted }) => (deleted ? 'flex' : 'block')};
		align-items: center;
		gap: 0.2rem;
		color: ${({ deleted, theme }) =>
			deleted ? theme.receiver.eliminated : theme.receiver.text};
		transition: color 0.5s ease-in-out;
	}

	.hour-left {
		font-size: 0.5rem;
		color: ${({ theme }) => theme.receiver.numbers};
		position: absolute;
		right: 8px;
		bottom: 5px;
		z-index: 2;
		line-height: 1;
		transition: color 0.5s ease-in-out;
	}
`
