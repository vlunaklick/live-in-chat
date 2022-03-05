import styled from 'styled-components'
import { useState } from 'react'
import MessageDropdown from './MessageDropdown'
import { HiOutlineBan } from 'react-icons/hi'
import useDropdownMessage from '../hooks/useDropdownMessage'
import converHours from '../utils/convertHours'

const MessageSend = ({
	text,
	hours,
	messageDropRef,
	deleted,
	setModal,
	setMessageSelected,
	messagePlain,
}) => {
	const { open, setOpen, messageDropdownRef, options, setOptions } =
		useDropdownMessage()

	const hoursGood = converHours(hours)

	return (
		<MessageWrapper
			ref={messageDropRef}
			deleted={deleted}
			optionsThing={options}
			onMouseEnter={() => setOptions(true)}
			onMouseLeave={() => {
				if (!open) {
					setOptions(false)
				}
			}}>
			<div className='wrapper-right-text'>
				<p className='text-rigth'>
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
			<p className='hour-rigth'>{hoursGood}</p>
			<MessageDropdown
				options={options}
				open={open}
				setOpen={setOpen}
				setModal={setModal}
				setMessageSelected={setMessageSelected}
				message={messagePlain}
				sender={true}
				messageDropdownRef={messageDropdownRef}
			/>
		</MessageWrapper>
	)
}

export default MessageSend

const MessageWrapper = styled.div`
	padding: 6px 7px 8px 9px;
	margin: 0 0 0 auto;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.sender.bg};
	border-radius: 7.5px;
	border-top-right-radius: 0;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	line-height: 19px;
	max-width: 65%;
	position: relative;
	box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
		0px 2px 4px -1px rgba(0, 0, 0, 0.06);
	transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;

	.options-message {
		display: ${props => (props.optionsThing === true ? 'block' : 'none')};
		opacity: ${props => (props.optionsThing === true ? '1' : '0')};
	}

	.wrapper-right-text {
		position: relative;
		overflow-wrap: break-word;
		white-space: pre-wrap;
		font-size: 0.8875rem;
		line-height: 1.1875rem;
	}

	.text-rigth {
		font-size: 0.8rem;
		color: ${({ theme }) => theme.sender.numbers};
		min-width: ${({ deleted }) => (deleted ? '250px' : '111px')};
		max-width: 622px;
		margin-bottom: 0.5rem;
		text-align: left;
		line-height: ${({ deleted }) => (deleted ? '1' : '')};
		font-style: ${({ deleted }) => (deleted ? 'italic' : 'normal')};
		display: ${({ deleted }) => (deleted ? 'flex' : 'block')};
		align-items: center;
		gap: 0.2rem;
		color: ${({ deleted, theme }) =>
			deleted ? theme.sender.eliminated : theme.sender.text};
		transition: color 0.5s ease-in-out;
	}

	.icon-cancel {
		font-size: 1rem;
	}

	.hour-rigth {
		font-size: 0.5rem;
		color: ${({ theme }) => theme.sender.numbers};
		position: absolute;
		right: 8px;
		bottom: 5px;
		z-index: 2;
		line-height: 1;
		transition: color 0.5s ease-in-out;
	}
`
