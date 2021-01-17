import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import firebase from "../../fire";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperButtons: {
    float: "right",
  },
  nextButton: {
    background: "linear-gradient( #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "100%",
    color: "white",
    height: "150%",
  },
}));

function getSteps() {
  return ["Restaurant Details", "Menu item images"];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const { isFormFilled, setImageDialog } = useContext(GlobalContext);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setImageDialog(true);
  };

  useEffect(() => {
    console.log(firebase.storage().ref("images"));
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          <div className={classes.stepperButtons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={isFormFilled ? classes.nextButton : null}
              disabled={!isFormFilled}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
