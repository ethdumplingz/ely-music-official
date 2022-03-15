import {ButtonGroup, Button, Grid, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Add, Remove} from "@mui/icons-material";
import {useState, useEffect, useCallback} from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const UpdateCountBtn = (props) => {
	const componentLoggingTag = `[updateCountBtn]`;
	const {children, onClick = () => {}, max = 3} = props;
	return(
		<Button
			variant={"outlined"}
			onClick={onClick}
			disabled={max <= 1}
			sx={{
				borderRadius: '50%',
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


const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		cacheProvider: true,
		options:{
			infuraId: '12aab9661c0b4544b655c4246c0e4bc1'
		}
	}
}
let web3Modal;
if(typeof window !== "undefined"){
	web3Modal = new Web3Modal({
		network: "mainnet",
		cacheProvider: false,
		theme: "dark",
		providerOptions
	});
}

const MintCart = (props) => {
	const componentLoggingTag = `[MintCart]`;
	const theme = useTheme();
	const { max = 3 } = props;
	const [numPurchases, setPurchases] = useState(1);
	const [web3Connected, setWeb3Connected] = useState(false);
	// const [web3Modal, setWeb3Modal] = useState(false);
	const [provider, setProvider] = useState(false);
	const [signer, setSigner] = useState(false);
	
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
	
	const connectWeb3Wallet =  useCallback(async function () {
		// This is the initial `provider` that is returned when
		// using web3Modal to connect. Can be MetaMask or WalletConnect.
		const provider = await web3Modal.connect()
		setWeb3Connected(true);
		// We plug the initial `provider` into ethers.js and get back
		// a Web3Provider. This will add on methods from ethers.js and
		// event listeners such as `.on()` will be different.
		const web3Provider = new ethers.providers.Web3Provider(provider);
		setProvider(web3Provider);
		const signer = web3Provider.getSigner()
		setSigner(signer);
		const address = await signer.getAddress()
		console.info(`${componentLoggingTag} address: ${address}`);
		const network = await web3Provider.getNetwork()
		
	}, []);
	
	useEffect(async () => {
		if(typeof window !== "undefined" && web3Modal.cachedProvider){
			connect();
			setWeb3Connected(true);
		}
	}, []);
	
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
				{
					web3Connected ? (
						<Grid
							item
							container
							flexDirection={"column"}
							rowSpacing={2}
							sx={{
								mt:0
							}}
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
											pl: 8,
											pt: 1,
											pb: 1,
											pr: 8,
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
					) : (
						<Grid
							item
							container
							justifyContent={"center"}
						>
							<Grid
								item
							>
								<Button
									variant={"contained"}
									sx={{
										backgroundColor: theme.palette.secondary.main,
										textTransform: "uppercase",
										borderRadius: "2px",
										padding: "14px 24px"
									}}
									onClick={connectWeb3Wallet}
								>
									Connect Wallet
								</Button>
							</Grid>
						</Grid>
					)
				}
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
						height: theme.breakpoints.down('md') ? 'auto' : '100%',
						objectFit:"cover",
						maxWidth: "1024px"
					}}
				/>
			</Grid>
		</Grid>
	)
}

export default MintCart;