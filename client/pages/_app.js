import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../themeConfig'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState('dark')

	const toggleTheme = () => {
		theme == 'light' ? setTheme('dark') : setTheme('light')
	}

	return (
		<ThemeProvider theme={theme == 'dark' ? lightTheme : darkTheme}>
			<Component toggleTheme={toggleTheme} {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
