import {AppBar, Button, Grid, IconButton, Toolbar, Typography, Container} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

const AppHeader = () => {
	return(
		<AppBar
			position={"static"}
			sx={{
				borderBottom: "1px solid rgba(100,0,0,0.5)"
			}}
		>
			<Toolbar>
				<Container
					maxWidth={"lg"}
				>
					<Grid
						container
						justifyContent={"space-between"}
						alignItems={"center"}
						flexWrap={"nowrap"}
						sx={{
							pt:2,
							pb:2
						}}
					>
						<Grid item>
							<Typography
								sx={{
									fontSize: "1.4rem"
								}}
							>Ely</Typography>
						</Grid>
						<Grid
							item
							container
							justifyContent={"flex-end"}
							alignItems={"center"}
							columnSpacing={2}
						>
							<Grid item>
								<a target={"_blank"} href={"https://twitter.com/ratkingnft/"}>
									<IconButton
										sx={{
											color: "#FFFFFF"
										}}
									>
										<TwitterIcon />
									</IconButton>
								</a>
							</Grid>
							<Grid item>
								<a style={{textDecoration: "underline"}} target={"_blank"} href={"https://opensea.io"}>
									<Button
										variant={"outlined"}
										sx={{
											border:`1px solid #FFFFFF`,
											color: "#FFFFFF",
											textTransform: "uppercase",
											padding: "10px 20px",
											borderRadius: "2px",
											textDecoration: "none",
											'&:hover':{
												borderColor: "#FFFFFF"
											}
										}}
									>
										View On Opensea
									</Button>
								</a>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default AppHeader;