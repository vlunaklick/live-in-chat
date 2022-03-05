import { useState, useRef, useEffect } from 'react'

export default function useDropdownMessage() {
	const [open, setOpen] = useState(false)
	const [options, setOptions] = useState(false)

	let messageDropdownRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!messageDropdownRef.current?.contains(e.target)) {
				setOptions(false)
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	return { open, setOpen, messageDropdownRef, options, setOptions }
}
