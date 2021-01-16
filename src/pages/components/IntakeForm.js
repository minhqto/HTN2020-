import React from "react";
import {
	Container,
	Typography,
	TextField,
	CssBaseline,
	Box,
	makeStyles,
} from "@material-ui/core";

import FormStepper from "./FormStepper";
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function IntakeForm() {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Tell us about your restaurant!
				</Typography>
				<form className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="resName"
						label="Restaurant Name"
						name="resName"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						required
						name="address"
						label="Address"
						id="address"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						name="city"
						label="City"
						id="city"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						name="province"
						label="Province"
						id="province"
					/>
					<FormStepper />
				</form>
			</div>
			<Box mt={8}></Box>
		</Container>
	);
}
