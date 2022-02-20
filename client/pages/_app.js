import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from '../themeConfig'

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
