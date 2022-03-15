import { createTheme } from '@mui/material/styles';


// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#000000'
		},
		secondary:{
			main: `#661013`,
			light: `#661013`
		}
	},
	typography:{
		fontFamily: `"Lato", "Helvetica Neue", sans-serif`
	}
});

export default theme;
