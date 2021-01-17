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
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import { FirestoreBatchedWrite } from "@react-firebase/firestore";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    // position: "absolute",
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
  const { isAddDialog, setIsAddDialog, setImageUrls } = useContext(
    GlobalContext
  );
  const handleUploadSuccess = async (filename) => {
    const name = await filename;

    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(name)
      .getDownloadURL();

    console.log(downloadURL); // the uploaded img url
  };

  const handleClose = () => {
    setIsAddDialog(false);
  };

  const handleSave = (files) => {
    let imageUrls = [];
    files.forEach((file) => {
      console.log(file);
      const uploadTask = firebase
        .storage()
        .ref(`images/${file.name}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.total) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              imageUrls.push(url);
            });
        }
      );
    });
    setImageUrls(imageUrls);
  };

  return (
    <DropzoneDialog
      style={{ width: "50%", height: "50%" }}
      open={true}
      onSave={handleSave}
      acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
      showPreviews={true}
      maxFileSize={20000000}
      onClose={handleClose}
      dialogTitle={"Send us some snapshots of your best dishes!"}
      submitButtonText={"Next"}
    />
  );
}
