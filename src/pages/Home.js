import React, { Fragment } from "react";
import IntakeForm from "./components/IntakeForm";
import Typography from "@material-ui/core/Typography";
import FormStepper from "./components/FormStepper";

export const Home = () => {
  return (
    <Fragment>
      <div className="App">
        {/* <div className="container mx-auto"> */}

        {/* </div> */}
        <IntakeForm />
      </div>
    </Fragment>
  );
};
