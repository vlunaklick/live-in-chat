import Image from 'next/image'
import styled from 'styled-components'

const UserIcon = ({ profilePicture }) => {
	return (
		<ImageContainer>
			<Image
				src={profilePicture}
				layout='fill'
				alt='Profile picture'
				objectFit='cover'
				priority
			/>
		</ImageContainer>
	)
}

export default UserIcon

const ImageContainer = styled.div`
	min-width: 40px;
	min-height: 40px;
	position: relative;
	border-radius: 50%;

	img {
		border-radius: 50%;
	}
`
