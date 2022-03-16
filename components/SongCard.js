import {ImageListItem, ImageListItemBar, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${
			size * rows
		}&fit=crop&auto=format&dpr=2 2x`,
	};
}

const SongCard = (props) => {
	const componentLoggingTag = `[SongCard]`;
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	
	console.info(`${componentLoggingTag} card`, matches);
	
	const {id, title, img_src, description, cols = 1, rows = 1} = props;
	return(
		<ImageListItem
			cols={matches ? 3 : cols}
			rows={rows}
			sx={{
				// border: `1px solid ${theme.palette.secondary.main}`
			}}
		>
			<img
				src={img_src}
				alt={title}
				loading={"lazy"}
				style={{
					width: '100%',
					height: '100%',
					objectFit:"cover"
				}}
			/>
			<ImageListItemBar
				title={title}
				subtitle={description}
				sx={{
					'&:hover .MuiImageListItemBar-subtitle':{
					},
					'& .MuiImageListItemBar-title' : {
						fontSize: {
							xs: "1.15rem",
							md: "1.3rem"
						},
						mb:{
							xs: 0.5,
							md: 1.5
						}
					},
					'& .MuiImageListItemBar-subtitle' : {
						fontSize: {
							xs: "0.9rem",
							md: "1rem"
						},
						whiteSpace: "normal",
						lineHeight: 1.4
					}
				}}
			/>
		</ImageListItem>
	)
}

export default SongCard;