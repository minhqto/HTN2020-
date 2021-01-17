import React, { useState, useEffect } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import firebase from "../../fire";
import FileUploader from "react-firebase-file-uploader";
import { FirestoreBatchedWrite } from "@react-firebase/firestore";

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
}));

function getSteps() {
  return ["Restaurant Details", "Menu item images"];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  const handleUploadSuccess = async (filename) => {
    const name = await filename;

    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(name)
      .getDownloadURL();

    console.log(downloadURL); // the uploaded img url
  };

  const handleUploadStart = () => {
    console.log("Start uploading image");
  };

  const handleUploadError = (err) => {
    console.log(err);
  };

  const handleProgress = (progress) => {
    console.log(progress);
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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Go to dashboard
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.stepperButtons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Test image upload */}
      <FileUploader
        accept="image/*"
        name="newImage"
        storageRef={firebase.storage().ref("images")}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
      />
    </div>
  );
}
