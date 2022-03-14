import "../styles/global.css"
import * as React from "react";
import Head from "next/head";
import theme from "../utils/theme";
import {ThemeProvider} from "@mui/material/styles";

const App = ({ Component, pageProps }) => {
	return(
		<ThemeProvider theme={theme}>
			<Head>
				<title>Ely Official Music</title>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default App;