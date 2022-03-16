import {Box, ImageList, Typography, Grid} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SongCard from "./SongCard";
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
const SongsSection = (props) => {
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
			<Grid item>
				<Carousel
					centerMode={true}
					centerSlidePercentage={50}
					selectedItem={2}
					showStatus={false}
					showThumbs={false}
				>
					{songs.map(song => (
						<Box
							key={song.id}
							sx={{
								ml: 1,
								mr: 1
							}}
						>
							<img alt={song.title} src={song.img_src}/>
							<Typography>{song.title}</Typography>
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