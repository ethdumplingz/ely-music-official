import {ButtonGroup, Button, Grid, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Add, Remove} from "@mui/icons-material";
import {useState} from "react";

const UpdateCountBtn = (props) => {
	const componentLoggingTag = `[updateCountBtn]`;
	const {children, onClick = () => {}, max = 3} = props;
	return(
		<Button
			variant={"outlined"}
			onClick={onClick}
			disabled={max <= 1}
			sx={{
				border: 'none',
				'&.MuiButton-root:hover':{
					cursor: 'pointer',
					border: 'none !important'
				},
				'&.Mui-disabled':{
					opacity: 0.5
				}
			}}
		>
			{children}
		</Button>
	)
}
const MintCart = (props) => {
	const componentLoggingTag = `[MintCart]`;
	const theme = useTheme();
	const {max=3} = props;
	const [numPurchases, setPurchases] = useState(1);
	
	const reduceNumPurchase = () => {
		const loggingTag = `${componentLoggingTag}[reduceNumPurchase]`;
		if(numPurchases > 1){
			setPurchases(prevState => (prevState-1));
		}
	}
	
	const increaseNumPurchase = () => {
		const loggingTag = `${componentLoggingTag}[increaseNumPurchase]`;
		if(numPurchases < max){
			setPurchases(prevState => (prevState+1));
		}
	}
	
	return(
		<Grid
			item
			container
			alignItems={"stretch"}
			flexWrap={"nowrap"}
			sx={{
				flexDirection:{
					xs: "column",
					md: "row"
				}
			}}
			columns={16}
		>
			<Grid
				item
				container
				flexDirection={"column"}
				justifyContent={"space-between"}
				alignItems={"flex-start"}
				rowSpacing={2}
				sx={{
					order:{
						xs: 2,
						md: 1
					},
					mt: {
						xs: 0,
						md: 4
					},
					mb: {
						xs: 0,
						md: 4
					},
					pt: 3,
					pb: 5,
					pl: 5,
					pr: 5,
					backgroundColor: `rgba(255,255,255,0.15)`
				}}
				xs={16}
				md={5}
			>
				<Grid item>
					<Typography
						textAlign={"left"}
						sx={{
							fontSize: "1.2rem"
						}}
					>Ely is an artist based out of South Florida.  Blending melodic vocals, catchy flows and witty wordplay, he delivers a sound that is authentic to himself. After a year away, he's back.</Typography>
				</Grid>
				<Grid item>
					<Typography
						sx={{
							fontSize: "1.2rem"
						}}
					>This is Ely's Genesis Collection.</Typography>
				</Grid>
				<Grid
					item
					container
					flexDirection={"column"}
					rowSpacing={2}
				>
					<Grid item>
						<ButtonGroup
							variant={"outlined"}
							sx={{
								display:"flex",
								height:"100%",
								'& .MuiButton-root':{
									// borderColor: "#FFFFFF",
									borderRadius: "0px"
								},
								justifyContent: "center",
							}}
						>
							<UpdateCountBtn
								max={max}
								onClick={reduceNumPurchase}
							>
								<Remove sx={{color:"#FFFFFF", fontSize:"20px"}}/>
							</UpdateCountBtn>
							<Button
								disabled
								sx={{
									borderRightColor: max <= 1 ? "white !important" : "",
									margin: `0px 16px !important`,
									pl: 4,
									pt: 1,
									pb: 1,
									pr: 4,
									'&.Mui-disabled':{
										color: "#FFFFFF",
										borderColor: "transparent",
										backgroundColor: theme.palette.secondary.main
									}
								}}
							>{numPurchases < 10 ? `0${numPurchases}` : numPurchases}</Button>
							<UpdateCountBtn
								max={max}
								onClick={increaseNumPurchase}
							>
								<Add sx={{color:"#FFFFFF", fontSize:"20px"}}/>
							</UpdateCountBtn>
						</ButtonGroup>
					</Grid>
					<Grid item>
						<Button
							variant={"contained"}
							sx={{
								color: `#FFFFFF`,
								padding: `12px 24px`,
								textTransform: `uppercase`,
								borderRadius: '0px',
								backgroundColor: theme.palette.secondary.main
							}}
						>Mint</Button>
					</Grid>
					<Grid item>
						<Typography
							sx={{
								fontSize: "1.3rem"
							}}
						>Cost: 0.05 ETH</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				item
				flexGrow={2}
				xs={16} md={11}
				sx={{
					order:{
						xs: 1,
						md: 2
					}
				}}
			>
				<img
					alt={"Ely Official Music"} src={require("../images/ely_hires.jpeg")}
					style={{
						width: theme.breakpoints.down('md') ? '100%' : '80%',
						maxWidth: "1024px",
						height: "auto"
					}}
				/>
			</Grid>
		</Grid>
	)
}

export default MintCart;