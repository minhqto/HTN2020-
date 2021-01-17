import React from "react";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../fire";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    zIndex: 1000,
    position: "absolute",
    margin: theme.spacing(1),
    backgroundColor: "white",
    width: "70%",
    height: "70%",
  },
  svg: {
    width: "70%",
    height: "70%",
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function SimpleSlide() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Fade in={checked}>
          <Container className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              className="text-center  text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide"
            >
              Upload some images of your best dishes!
            </Typography>
          </Container>
        </Fade>
      </div>
    </div>
  );
}
