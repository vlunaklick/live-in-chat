import { useState } from 'react'

export default function useText() {
	const [text, setText] = useState('')

	const changeText = e => {
		setText(e.target.value)
	}

	const resetText = () => {
		setText('')
	}

	return { text, changeText, resetText }
}
