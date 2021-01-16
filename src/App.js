import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./stylesheet/styles.css";
import { Home } from "./pages/Home";

import { GlobalProvider } from "./context/GlobalState";

import firebase from "./fire";

// Unrelated components for reference of using React-Context, global state
import { Addemployee } from "./components_old/Addemployee";
import { Editemployee } from "./components_old/Editemployee";
import { Employeelist } from "./components_old/Employeelist";

function App() {
	// Test connection to Firebase and get all data from 'users' collection. Comment out to stop uneccessary calls. Use this as a reference when we need to get data from Firebase

	useEffect(() => {
		// refer to users collection
		const ref = firebase.firestore().collection("users");

		// get all the documents from users
		ref.onSnapshot((qrySnapshot) => {
			const items = [];
			qrySnapshot.forEach((doc) => {
				items.push(doc.data());
			});

			console.log(items);
		});
	}, []);

	return (
		<GlobalProvider>
			<Switch>
				{/* Intro, onboarding screen */}
				<Route path="/" component={Home} exact />

				{/* Unrelated stuff from our project for using reference of React-Context */}
				<Route path="/old/" component={Employeelist} exact />
				<Route path="/old/add" component={Addemployee} exact />
				<Route path="/old/edit/:id" component={Editemployee} exact />
			</Switch>
		</GlobalProvider>
	);
}

export default App;
