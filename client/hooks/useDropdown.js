import { useState, useRef, useEffect } from 'react'

export default function useDropdown() {
	const [open, setOpen] = useState(false)

	let dropdownRef = useRef()

	useEffect(() => {
		let handler = e => {
			if (!dropdownRef.current?.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	return { open, setOpen, dropdownRef }
}
