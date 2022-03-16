import {Box, ImageList, Typography, Grid, useMediaQuery} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SongCard from "./SongCard";
import {useTheme} from "@mui/material/styles";
const songs = [
	{
		id: "bitter",
		img_src: require("../images/bitter.jpeg"),
		title: "Bitter",
		description: `Vulnerability in it’s purest form, “Bitter’ delivers a journey of heartbreak and self-realization. Soulful vocals layered over a mellow but impactful composition, this one hits deep.`
	},
	{
		id: "bad-thing",
		img_src: require("../images/badthing.jpeg"),
		title: "Bad Thing",
		description: `"Bad Thing" is an upbeat and flirtatious track that boasts a bouncy, energetic cadence. This one is for the fun times and summer flings.`
	},
	{
		id: "through-the-night",
		img_src: require("../images/though_the_night.jpg"),
		title: "Through the Night",
		description: `With “Through the Night”, a declaration is made that whatever sacrifices are required to achieve a goal, will be made. Dreams will become reality.`
	},
	{
		id: "mangekyou",
		img_src: require("../images/mangekyou.jpeg"),
		title: "Mangekyou",
		cols: 2,
		description: `From the title alone, it's clear that “Mangekyou” draws influence from Ely’s love for anime. A darker vibe with a catchy hook, a mood is definitely set.`
	},
	{
		id: "save-me",
		img_src: require("../images/saveme.jpeg"),
		title: "Save Me",
		description: `Digging deeper and looking past pride, “Save Me” is an honest track that displays a throw away of pride while admitting that pain can't always be burdened alone.`
		
	},
]

const renderCarouselImageItem = (item, options) => {
	const componentLoggingTag = `[renderCarouselImageItem]`;
	
	console.info(`${componentLoggingTag} item`, item);
	console.info(`${componentLoggingTag} props`, options);
	const {props} = item;
	const {title, content, src, isMobile} = props;
	return (
		<Box
			sx={{
				position: "relative",
				ml: 2,
				mr: 2
			}}
		>
			<img
				style={{
					width: "100%",
					height: "100%"
				}}
				alt={title}
				src={src}
			/>
			<Box
				sx={{
					position: isMobile ? "static" : "absolute",
					bottom: "0px",
					left: "0px",
					right: "0px",
					zIndex: 1,
					pt: 2,
					pb: 2,
					backgroundColor: `rgba(0,0,0,0.4)`
				}}
			>
				<Box>
					<Typography
						sx={{
							fontSize: isMobile ? "0.9rem" : "1.4rem",
							fontWeight: "bold",
							mb: 2,
							zIndex: 1,
							color: "#FFFFFF"
						}}
					>{title}</Typography>
				</Box>
				<Box>
					<Typography
						sx={{
							fontSize: isMobile ? "0.8rem" : "1.2rem",
							mb: 2,
							color: "#FFFFFF"
						}}
					>{content}</Typography>
				</Box>
			</Box>
		</Box>
	)
}

const SongsSection = (props) => {
	const theme = useTheme();
	const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Grid
			item
			container
			flexDirection={"column"}
		>
			<Grid item>
				<Typography
					sx={{
						textAlign: "center",
						fontSize: "2rem",
						mb:4
					}}
				>Songs</Typography>
			</Grid>
			<Grid
				item
				sx={{
					maxWidth: {
						xs: "100%",
						md: "none"
					}
				}}
			>
				<Carousel
					centerMode={true}
					centerSlidePercentage={isMobileDevice ? 60 : 40}
					selectedItem={2}
					showStatus={false}
					showThumbs={false}
					renderItem={renderCarouselImageItem}
				>
					{songs.map(song => (
						<Box
							key={song.id}
							sx={{
								ml: 1,
								mr: 1
							}}
							src={song.img_src}
							title={song.title}
							content={song.description}
							isMobile={isMobileDevice}
						>
							{/*<img src={song.img_src}/>*/}
							{/*<Typography>{song.title}</Typography>*/}
							{/*<Typography>{song.description}</Typography>*/}
						</Box>
					))}
				</Carousel>
				{/*<ImageList*/}
				{/*	variant={"quilted"}*/}
				{/*	cols={3}*/}
				{/*	*/}
				{/*	gap={8}*/}
				{/*	*/}
				{/*>*/}
				{/*	{*/}
				{/*		songs.map((song) => (*/}
				{/*			<SongCard key={song.id} {...song}/>*/}
				{/*		))*/}
				{/*	}*/}
				{/*</ImageList>*/}
			</Grid>
		</Grid>
		
	)
}

export default SongsSection;