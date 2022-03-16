
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	textAlign: "center",
	'.MuiPaper-root':{
		backgroundColor: '#131313',
	},
	'& .MuiDialogContent-root': {
		padding: theme.spacing(3),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(2),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;
	return (
		<DialogTitle
			sx={{
				m: 0,
				p: 3,
				color: "#FFFFFF"
			}}
			{...other}
		>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 16,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

const AppDialogue = ({title = "", content = "", action={str: "Save changes"}, transaction = {pending: false}, onClose} = {}) => {
	const ComponentLoggingTag = `[TransactionDialog]`;
	const theme = useTheme();
	const {status, type} = transaction;
	const [open, setOpen] = React.useState(true);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		if(typeof onClose === "function"){
			onClose();
		}
	};
	
	console.info(`${ComponentLoggingTag} title: ${title}, content: ${content}, action: ${action}`);
	return (
		<div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="transaction-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="transaction-dialog-title" onClose={handleClose}>
					{title}
				</BootstrapDialogTitle>
				<DialogContent
					dividers={false}
					sx={{
						fontSize: "18px",
						lineHeight: 1.5,
						color: "#FFFFFF"
					}}
				>
					{content()}
				</DialogContent>
				<DialogActions>
					<Button
						sx={{
							fontSize: "16px",
							color: theme.palette.secondary.main,
							'&:hover':{
								backgroundColor: '#410709'
							}
						}}
						onClick={handleClose}
					>
						{action.str}
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}

export default AppDialogue;