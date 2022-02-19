import styled from 'styled-components'
import { useState } from 'react'
import DropdownMessageSender from './DropdownMessageSender'

const MessageSenderPeople = ({ text, hours, scrollRef }) => {
	const [options, setOptions] = useState(false)
	const [open, setOpen] = useState(false)

	const dateH = new Date(hours)

	const hoursGood = dateH.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<MessageSenderPeopleWrapper
			ref={scrollRef}
			optionsThing={options}
			onMouseEnter={() => setOptions(true)}
			onMouseLeave={() => {
				if (!open) {
					setOptions(false)
				}
			}}>
			<div className='wrapper-right-text'>
				<p className='text-rigth'>{text}</p>
			</div>
			<p className='hour-rigth'>{hoursGood}</p>
			<DropdownMessageSender
				options={options}
				open={open}
				setOpen={setOpen}
				setOptions={setOptions}
			/>
		</MessageSenderPeopleWrapper>
	)
}

export default MessageSenderPeople

const MessageSenderPeopleWrapper = styled.div`
	padding: 6px 7px 8px 9px;
	margin: 0 0 0 auto;
	display: flex;
	flex-direction: column;
	background-color: #4c1d95;
	border-radius: 7.5px;
	border-top-right-radius: 0;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	line-height: 19px;
	max-width: 65%;
	position: relative;
	box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
		0px 2px 4px -1px rgba(0, 0, 0, 0.06);

	.options-message {
		display: ${props => (props.optionsThing === true ? 'block' : 'none')};
		opacity: ${props => (props.optionsThing === true ? '1' : '0')};
		color: white;
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
		color: #fafafa;
		min-width: 111px;
		max-width: 622px;
		margin-bottom: 0.5rem;
	}

	.hour-rigth {
		font-size: 0.5rem;
		color: #a1a1aa;
		position: absolute;
		right: 8px;
		bottom: 5px;
		z-index: 2;
		line-height: 1;
	}
`
