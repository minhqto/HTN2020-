import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ImageStep } from "./imageStep";
import ImageDialog from "../ImageDialog";
import { CaptionStep } from "./captionStep";
import { TimeStep } from "./timeStep";
import { PlatformStep } from "./platformStep";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

import { GlobalContext } from "../../../context/GlobalState";
import firebase from "../../../fire";

const useStyles = makeStyles((theme) => ({
	dialog: {
		minHeight: "200px",
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axios = require("axios").default;

const userSteps = [
	{
		title: "Choose or Upload an Image for your Post 📷",
		content: <ImageStep></ImageStep>,
	},
	{
		title: "Write your Post's Caption! ✍️",
		content: <CaptionStep></CaptionStep>,
	},
	{
		title: "Schedule a time to post",
		content: <TimeStep></TimeStep>,
	},
	{
		title: "Choose which platforms to deploy to",
		content: <PlatformStep></PlatformStep>,
	},
];

export const AddDialog = () => {
	const { editCaption, addPost } = useContext(GlobalContext);
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const [toast, setToast] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = userSteps.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleFinish = () => {
		console.log(addPost.caption);
		setOpen(false);
		setToast(true);

		let newSchedule = {
			title: addPost.caption,
			startDate: new Date(),
			endDate: new Date(),
			content: addPost.caption,
		};
		// insert into firebase
		firebase
			.firestore()
			.collection("schedules")
			.add(newSchedule)
			.then((result) => console.log(result));
		history.push("/hub");
	};

	return (
		<div>
			<IconButton color="primary" onClick={handleClickOpen}>
				<AddCircleOutlineIcon></AddCircleOutlineIcon>
			</IconButton>
			<Dialog
				className={{ paper: classes.dialog }}
				fullWidth={true}
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					<Box display="flex" alignItems="center">
						<Box flexGrow={1}>{userSteps[activeStep].title}</Box>
						<Box>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>{userSteps[activeStep].content}</DialogContent>
				<MobileStepper
					steps={maxSteps}
					position="static"
					variant="progress"
					activeStep={activeStep}
					nextButton={
						activeStep === maxSteps - 1 ? (
							<Button size="small" onClick={handleFinish}>
								Finish
							</Button>
						) : (
							<Button
								size="small"
								onClick={handleNext}
								disabled={activeStep === maxSteps - 1}
							>
								Next
								<KeyboardArrowRight />
							</Button>
						)
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							<KeyboardArrowLeft />
							Back
						</Button>
					}
				/>
			</Dialog>
			<Snackbar open={toast} autoHideDuration={3000}>
				<Alert severity="success">
					Your post has been successully scheduled!
				</Alert>
			</Snackbar>
		</div>
	);
};
