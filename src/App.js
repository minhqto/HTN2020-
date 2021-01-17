import React, { useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./stylesheet/styles.css";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	makeStyles,
	ThemeProvider,
	createMuiTheme,
} from "@material-ui/core";
import { green, orange, red } from "@material-ui/core/colors";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Home } from "./pages/Home";
import Hub from "./pages/Hub";
import { GlobalProvider } from "./context/GlobalState";

import firebase from "./fire";
import { schedulePost } from "./api";
// Unrelated components for reference of using React-Context, global state
import { Addemployee } from "./components_old/Addemployee";
import { Editemployee } from "./components_old/Editemployee";
import { Employeelist } from "./components_old/Employeelist";

const mainTheme = createMuiTheme({
	palette: {
		primary: {
			main: red[500],
		},
		secondary: {
			main: orange[500],
		},
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function App() {
	const classes = useStyles();
	// Test API

	// useEffect(() => {
	// 	schedulePost("Test Content From App")
	// 		.then((res) => {
	// 			console.log("Result returned");
	// 			console.log(res);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, []);

	// Test connection to Firebase and get all data from 'users' collection. Comment out to stop uneccessary calls. Use this as a reference when we need to get data from Firebase

	// useEffect(() => {
	// 	// refer to users collection
	// 	const ref = firebase.firestore().collection("users");

	// 	// get all the documents from users
	// 	ref.onSnapshot((qrySnapshot) => {
	// 		const items = [];
	// 		qrySnapshot.forEach((doc) => {
	// 			items.push(doc.data());
	// 		});

	// 		console.log(items);
	// 	});
	// }, []);

	return (
		<GlobalProvider>
			<ThemeProvider theme={mainTheme}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						>
							<FastfoodIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Omakase
						</Typography>

						<Button color="inherit">
							<Link
								to={{
									pathname: "/",
								}}
							>
								Home
							</Link>
						</Button>

						<Button color="inherit">
							<Link
								to={{
									pathname: "/hub",
								}}
							>
								Hub
							</Link>
						</Button>
					</Toolbar>
				</AppBar>
				<Switch>
					{/* Intro, onboarding screen */}
					<Route path="/" component={Home} exact />
					<Route path="/hub" component={Hub} exact />
					{/* Unrelated stuff from our project for using reference of React-Context */}
					<Route path="/old/" component={Employeelist} exact />
					<Route path="/old/add" component={Addemployee} exact />
					<Route
						path="/old/edit/:id"
						component={Editemployee}
						exact
					/>
				</Switch>
			</ThemeProvider>
		</GlobalProvider>
	);
}

export default App;
