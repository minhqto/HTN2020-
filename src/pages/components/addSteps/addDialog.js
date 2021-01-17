import React, { Fragment, useContext } from "react";
import { ImageStep } from "./imageStep";
import ImageDialog from "../ImageDialog";
import { CaptionStep } from "./captionStep";
import { TimeStep } from "./timeStep";
import { PlatformStep } from "./platformStep";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { GlobalContext } from "../../../context/GlobalState";
const axios = require("axios").default;

const userSteps = [
  {
    title: "Choose or Upload an Image for your Post 📷",
    content: <ImageStep></ImageStep>,
  },
  {
    title: "Write your Post's Caption! ✍️",
    content: <CaptionStep></CaptionStep>,
  },
  {
    title: "Schedule a time to post",
    content: <TimeStep></TimeStep>,
  },
  {
    title: "Choose which platforms to deploy to",
    content: <PlatformStep></PlatformStep>,
  },
];

export const AddDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { isAddDialog, setIsAddDialog } = useContext(GlobalContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsAddDialog(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = userSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // axios({
    //   method: 'post',
    //   url: 'https://platform.hootsuite.com/v1/messages',
    //   data: {
    //     text: "Come swing by our restaurant this friday!"
    //   }
    // })
  };

  return (
    <div>
      {/* <IconButton color="primary" onClick={handleClickOpen}>
        <AddCircleOutlineIcon></AddCircleOutlineIcon>
      </IconButton> */}
      <Dialog
        fullWidth={true}
        open={isAddDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {" "}
          {userSteps[activeStep].title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{userSteps[activeStep].content}</DialogContent>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="progress"
          activeStep={activeStep}
          nextButton={
            activeStep === maxSteps - 1 ? (
              <Button size="small" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Dialog>
    </div>
  );
};
