import styled from 'styled-components'

const MessageSenderPeople = ({ text, hours }) => {
	const dateH = new Date(hours)

	const hoursGood = dateH.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<MessageSenderPeopleWrapper>
			<div className='wrapper-right-text'>
				<p className='text-rigth'>{text}</p>
			</div>
			<p className='hour-rigth'>{hoursGood}</p>
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
	width: fit-content;

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
