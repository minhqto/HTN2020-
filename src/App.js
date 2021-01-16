import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./stylesheet/styles.css";
import { Home } from "./components/Home";
import { Addemployee } from "./components/Addemployee";
import { Editemployee } from "./components/Editemployee";

import { GlobalProvider } from "./context/GlobalState";

import firebase from "./fire";

function App() {
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
				<Route path="/" component={Home} exact />
				<Route path="/add" component={Addemployee} exact />
				<Route path="/edit/:id" component={Editemployee} exact />
			</Switch>
		</GlobalProvider>
	);
}

export default App;
