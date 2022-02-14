import Image from 'next/image'
import styled from 'styled-components'

const UserIcon = () => {
	return (
		<ImageContainer>
			<Image
				src={'/no-user.jpg'}
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
	border-radius: 100%;

	img {
		border-radius: 100%;
	}
`
