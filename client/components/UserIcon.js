import Image from 'next/image'
import styled from 'styled-components'

const UserIcon = ({ profilePicture }) => {
	return (
		<ImageContainer>
			<Image
				src={profilePicture}
				layout='fill'
				alt='Profile picture'
				objectFit='contain'
				priority
			/>
		</ImageContainer>
	)
}

export default UserIcon

const ImageContainer = styled.div`
	width: 40px;
	height: 40px;
	position: relative;

	img {
		border-radius: 50%;
	}
`
