import {ButtonGroup, Button, Grid, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Add, Remove} from "@mui/icons-material";
import {useState, useEffect, useCallback} from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import contractInfo from "../utils/contract";
import AppDialogue from "./AppDialogue";

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

const delay = (milliseconds = 5000) => {
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve(true);
		}, milliseconds);
	});
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
	const { max = 3 } = props;
	const [numPurchases, setPurchases] = useState(1);
	const [web3Connected, setWeb3Connected] = useState(false);
	// const [web3Modal, setWeb3Modal] = useState(false);
	const [provider, setProvider] = useState(false);
	const [signer, setSigner] = useState(false);
	const [contract, setContract] = useState(false);
	const [supply, setSupply] = useState(0);
	const [mintCount, setMintCount] = useState(0);
	const [mintPrice, setMintPrice] = useState(0);
	const [mintLive, setMintLive] = useState(false);
	const [transaction, setTransaction] = useState({
		pending: "",
		title: "",
		content: "",
		hash: "",
		action: {
			str: "OK"
		}
	});
	
	const theme = useTheme();
	const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'));
	
	
	useEffect(async () => {
		// console.info(`${componentLoggingTag} contract info`, contractInfo);
		if(web3Connected && provider && signer){
			const contractInstance = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
			console.info(`${componentLoggingTag} contract`, contractInstance);
			// const contractConnectedWithSigner = contractInstance.connect(signer);
			console.info(`${componentLoggingTag} contract after connecting signer`, contractInstance);
			setContract(contractInstance);
			
			try{
				const supplyFromContract = await contractInstance.functions.MAX_SUPPLY();
				console.info(`${componentLoggingTag} supply`, supplyFromContract);
				setSupply(supplyFromContract[0].toNumber());
			} catch(e){
				console.error(`${componentLoggingTag} Error:`, e);
			}
			
			try{
				const priceFromContract = await contractInstance.functions.PRICE();
					// priceAsNum = ethers.BigNumber.from(priceFromContract[0]).toBigInt();
				
				console.info(`${componentLoggingTag} price`, priceFromContract);
				setMintPrice(priceFromContract[0]);
			} catch(e){
				console.error(`${componentLoggingTag} Error getting price`, e);
			}
			
			try{
				const mintLiveStatus = await contractInstance.functions.purchaseable();
				console.info(`${componentLoggingTag} purchasable`, mintLiveStatus);
				// setMintLive(mintLiveStatus[0]);
			} catch(e){
				console.error(`${componentLoggingTag} set mint live`, e);
			}
			
			// const humanNumber = new ethers.BigNumber.from([priceFromContract]);
			// console.info(`${componentLoggingTag} human`, humanNumber);
			
		}
	}, [web3Connected, provider, signer]);
	
	//updating mint count periodically
	useEffect(()=>{
		const loggingTag = `${componentLoggingTag}[mintCountUpdater]`
		const interval = setInterval(async () => {
			if(web3Connected && provider && signer && contract){
				// console.info(`${loggingTag} provider`, provider, signer, contract);
				
				
				if(!mintLive){
					try{
						const mintLiveStatus = await contract.functions.purchaseable();
						console.info(`${componentLoggingTag} purchasable`, mintLiveStatus);
						setMintLive(mintLiveStatus[0]);
					} catch(e){
						console.error(`${componentLoggingTag} set mint live`, e);
					}
				} else {
					const totalMintedCount = await contract.totalSupplyAll();
					
					console.info(`${loggingTag} mintCount`, totalMintedCount, totalMintedCount.toNumber());
					setMintCount(totalMintedCount.toNumber());
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [web3Connected, provider, signer, contract, mintLive]);
	
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
		console.info(`${componentLoggingTag} network: ${network}`);
	}, []);
	
	const mintTokens = useCallback(async () => {
		const loggingTag = `${componentLoggingTag}[MintCart]`;
		console.info(`${loggingTag} purchasing ${numPurchases} tokens...`);
		// console.info(`${loggingTag} price: ${ethers.utils.parseUnits(50000000000000000, 'wei')}`);
		// const value = new ethers.BigNumber.from();
		try{
			const gasEstimate = await contract.estimateGas.purchase(numPurchases, {
				value: mintPrice.mul(numPurchases)
			});
			console.info(`${loggingTag} gas estimate`, gasEstimate.toString());
			setTransaction((prevState)=>({
				...prevState,
				pending: true,
				title: "Mint Pending...",
				content: () => (
					<Typography>Please complete the transaction in your wallet.</Typography>
				)
			}));
			const transaction = await contract.purchase(numPurchases, {
				value: mintPrice.mul(numPurchases),
				gasLimit: gasEstimate.toNumber() + 100000
			});
			console.info(`${loggingTag} transaction submitted!`, transaction);
			setTransaction((prevState)=>({
				...prevState,
				pending: true,
				title: "Mint Submitted",
				content: () => (
					<Typography>View your transaction <a style={{color: theme.palette.secondary.main}} href={`https://etherscan.io/tx/${transaction.hash}`} target={"_blank"}>here</a>.</Typography>
				)
			}));
			await transaction.wait();
			// await delay(3000);
			setTransaction((prevState)=>({
				...prevState,
				pending: true,
				title: "Mint Success!"
			}));
			console.info(`${loggingTag} transaction complete!`);
		} catch(e){
			if(typeof e.code === "number" && e.code === 4001){
				setTransaction((prevState)=>({
					...prevState,
					pending: true,
					title: "Mint Failed",
					content: () => (
						<Typography>User denied mint transaction.</Typography>
					)
				}));
			} else {
				setTransaction((prevState)=>({
					...prevState,
					pending: true,
					title: "Mint Failed",
					content: () => (
						<Typography>Error occurred during mint.  Please wait a bit and try again.</Typography>
					)
				}));
			}
			console.error(`${loggingTag} Error:`, typeof e.code);
		}
		
	}, [contract, numPurchases, mintPrice]);
	
	const resetTransactionState = () => {
		setTransaction({
			pending: false,
			title: "",
			content: "",
			hash: "",
			action: {
				str: ""
			}
		})
	}
	
	useEffect(async () => {
		if(web3Modal.cachedProvider){
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
				md={6}
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
					(web3Connected && (mintCount === supply)) ? (
						<Grid
							item
							container
							spacing={2}
							flexDirection={"column"}
							justifyContent={"center"}
						>
							<Grid item>
								<Typography sx={{fontSize: "1.6rem", fontWeight: "bold"}}>SOLD OUT</Typography>
							</Grid>
							<Grid item>
								<a href={"https://opensea.io/collection/ely-genesis"} target={"_blank"}>
									<Button
										variant={"contained"}
										sx={{
											color: `#FFFFFF`,
											padding: `12px 24px`,
											textTransform: `uppercase`,
											borderRadius: '2px',
											backgroundColor: theme.palette.secondary.main,
											'&:hover':{
												backgroundColor: theme.palette.secondary.dark
											}
										}}
									>view on opensea</Button>
								</a>
							</Grid>
							
						</Grid>
					) : web3Connected && mintLive ? (
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
								<Typography
									sx={{
										fontSize: "1.2rem"
									}}
								>Cost: 0.05 ETH (per token)</Typography>
							</Grid>
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
										borderRadius: '2px',
										backgroundColor: theme.palette.secondary.main,
										'&:hover':{
											backgroundColor: theme.palette.secondary.dark
										}
									}}
									onClick={mintTokens}
									disabled={transaction.pending}
								>Mint</Button>
							</Grid>
							<Grid item>
								<Typography>Total Minted: {mintCount}/{supply}</Typography>
							</Grid>
						</Grid>
					) : (!mintLive && web3Connected) ? (
						<Grid item>
							<Typography sx={{fontSize: "1.2rem"}}>Mint isn't live yet!</Typography>
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
										padding: "14px 24px",
										'&:hover':{
											backgroundColor: theme.palette.secondary.dark
										}
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
				xs={16} md={10}
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
						width: '100%',
						height: isMobileDevice ? 'auto' : '100%',
						objectFit:"cover",
						maxWidth: "1024px"
					}}
				/>
			</Grid>
			{
				transaction.pending ? (
					<AppDialogue
						transaction={transaction}
						title={transaction.title}
						content={transaction.content}
						action={{str:"Close"}}
						onClose={resetTransactionState}
					/>
				) : (
					<></>
				)
			}
		</Grid>
	)
}

export default MintCart;