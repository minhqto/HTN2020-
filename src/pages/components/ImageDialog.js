import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../../fire";
import { DropzoneArea } from "material-ui-dropzone";
import { FirestoreBatchedWrite } from "@react-firebase/firestore";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(),
  },
}))(MuiDialogActions);

export default function ImageDialog() {
  const { isImageDialog, setImageDialog } = useContext(GlobalContext);
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

  const handleClose = () => {
    setImageDialog(false);
  };
  const handleSubmit = () => {
    setImageDialog(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isImageDialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Image Upload
        </DialogTitle>
        <DialogContent dividers>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Upload up to 5 images!"}
            name="newImage"
            storageRef={firebase.storage().ref("images")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            maxFileSize={20000000}
            filesLimit={5}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
