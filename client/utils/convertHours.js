export default function converHours(hours) {
	const date = new Date(hours)

	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})
}
