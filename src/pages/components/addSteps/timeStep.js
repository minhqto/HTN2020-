import React, { useState } from "react";
import moment from "moment";

import {
	Paper,
	Grid,
	makeStyles,
	Container,
	Typography,
	TextField,
	TextareaAutosize,
	Button,
} from "@material-ui/core";

export const TimeStep = () => {
	const [formTime, setFormTime] = useState(
		moment(new Date()).format("YYYY-MM-DDTHH:mm")
	);

	return (
		<div>
			{" "}
			<TextField
				fullWidth
				id="datetime-local"
				label="Next appointment"
				type="datetime-local"
				defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
				onChange={(e) => {
					console.log(e.target.value);
					setFormTime(e.target.value);
				}}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button
				style={{ marginTop: "20px" }}
				variant="contained"
				color="primary"
			>
				Let us decide your time
			</Button>
		</div>
	);
};
