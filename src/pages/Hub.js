import React, { useState, useEffect } from "react";

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
import {
	Scheduler,
	WeekView,
	Appointments,
	MonthView,
	Toolbar,
	DateNavigator,
	TodayButton,
	AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import moment from "moment";
import firebase from "../fire";

const useStyles = makeStyles((theme) => ({
	formContainer: {
		marginTop: "50px",
		border: "1px solid lightgrey",
		borderRadius: "5px",
		padding: "30px 20px",
		display: "flex",
		flexWrap: "wrap",
		gap: "20px",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	appointmentContent: {
		padding: "10px 10px 10px 20px",
	},
}));

const Content = ({ children, appointmentData, ...restProps }) => {
	const classes = useStyles();

	return (
		<AppointmentTooltip.Content
			{...restProps}
			appointmentData={appointmentData}
		>
			<Grid container alignItems="center">
				<Grid className={classes.appointmentContent} item xs={10}>
					<span>{appointmentData.content}</span>
				</Grid>
			</Grid>
		</AppointmentTooltip.Content>
	);
};

export default () => {
	const classes = useStyles();
	const appointments_sample = [
		{
			title: "Approve Personal Computer Upgrade Plan",
			startDate: new Date(2021, 0, 16, 17, 10),
			endDate: new Date(2021, 0, 16, 17, 50),
			content: "Test Content",
		},
	];
	const [currentDate, setCurrentDate] = useState(new Date());
	const [appointments, setAppointments] = useState([]);
	const [formTitle, setFormTitle] = useState("");
	const [formTime, setFormTime] = useState(
		moment(new Date()).format("YYYY-MM-DDTHH:mm")
	);

	const [formContent, setFormContent] = useState("");

	// get all the schedules from the database
	useEffect(() => {
		// refer to users collection
		const ref = firebase.firestore().collection("schedules");

		// get all the documents from users
		ref.onSnapshot((qrySnapshot) => {
			const schedules = [];
			qrySnapshot.forEach((doc) => {
				let curSchedule = doc.data();
				curSchedule.startDate = moment(curSchedule.startDate.toDate());
				curSchedule.endDate = moment(curSchedule.endDate.toDate());

				schedules.push(curSchedule);
			});

			setAppointments(schedules);
		});
	}, []);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(moment(formTime));
		if (formTitle && formContent && formTime) {
			let newSchedule = {
				title: formTitle,
				startDate: moment(formTime).toDate(),
				endDate: moment(formTime).toDate(),
				content: formContent,
			};
			// insert into firebase
			firebase
				.firestore()
				.collection("schedules")
				.add(newSchedule)
				.then((result) => console.log(result));

			setAppointments([...appointments, newSchedule]);
		}
	};

	return (
		<Container>
			<Typography style={{ fontSize: "50px", textAlign: "center" }}>
				The Hub
			</Typography>

			{/* Calendar view */}
			<Scheduler data={appointments} height={660}>
				<ViewState
					currentDate={currentDate}
					onCurrentDateChange={(curDate) => {
						setCurrentDate(curDate);
					}}
				/>
				<WeekView startDayHour={6} endDayHour={23} />
				<Toolbar />
				<DateNavigator />
				<TodayButton />

				<Appointments />
				{/* Show up when we click to an appointment */}
				<AppointmentTooltip
					contentComponent={Content}
					showCloseButton
				/>
			</Scheduler>

			{/* Add new schedule */}
			<form
				className={classes.formContainer}
				onSubmit={handleFormSubmit}
				noValidate
			>
				<h1>Schedule a new post</h1>
				<TextField
					fullWidth
					id="outlined-basic"
					label="Media Plaform"
					variant="outlined"
					onChange={(e) => setFormTitle(e.target.value)}
					value={formTitle}
				/>
				<TextField
					fullWidth
					id="datetime-local"
					label="Next appointment"
					type="datetime-local"
					defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
					className={classes.textField}
					onChange={(e) => {
						console.log(e.target.value);
						setFormTime(e.target.value);
					}}
					InputLabelProps={{
						shrink: true,
					}}
					value={formTime}
				/>
				<Button
					onClick={() => {
						setFormTime(
							moment(new Date()).format("YYYY-MM-DDTHH:mm")
						);
					}}
					style={{ marginTop: "20px" }}
					variant="contained"
					color="primary"
				>
					Let us decide your time
				</Button>

				<TextareaAutosize
					style={{
						width: "100%",
						border: "1px solid grey",
						borderRadius: "5px",
						padding: "10px",
					}}
					name="content"
					rowsMin={5}
					aria-label="maximum height"
					placeholder="Your content"
					defaultValue=""
					onChange={(e) => setFormContent(e.target.value)}
					value={formContent}
				/>
				<Button type="submit" size="small" variant="contained">
					Add schedule
				</Button>
			</form>
		</Container>
	);
};
