import React, { Fragment } from "react";
import IntakeForm from "./components/IntakeForm";

export const Home = () => {
	return (
		<Fragment>
			<div style={{ paddingTop: "50px" }} className="App">
				<IntakeForm />
			</div>
		</Fragment>
	);
};
