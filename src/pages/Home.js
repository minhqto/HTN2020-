import React, { Fragment } from "react";
import IntakeForm from "./components/IntakeForm";
export const Home = () => {
	return (
		<Fragment>
			<div className="App">
				<div className="container mx-auto">
					<h3 className="text-center  text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
						MINUTERICE
					</h3>
				</div>
				<IntakeForm />
			</div>
		</Fragment>
	);
};
