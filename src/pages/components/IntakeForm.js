import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  CssBaseline,
  Box,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import FormStepper from "./FormStepper";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function IntakeForm() {
  const classes = useStyles();
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const handleRestaurantChange = (event) => {
    setRestaurantName(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handlePostalChange = (event) => {
    setPostal(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs" style={{ display: "flex" }}>
      <CssBaseline />
      <div classvalue={classes.paper}>
        <Typography component="h1" variant="h5">
          Tell us about your restaurant!
        </Typography>
        <form classvalue={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="resvalue"
            label="Restaurant value"
            value={restaurantName}
            autoFocus
            onChange={handleRestaurantChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={address}
            label="Address"
            id="address"
            onChange={handleAddressChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={city}
            label="City"
            id="city"
            onChange={handleCityChange}
          />
          <FormControl
            style={{ minWidth: 200 }}
            required
            classvalue={classes.formControl}
          >
            <InputLabel id="demo-simple-select-helper-required-label">
              Province
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              value={province}
              onChange={handleProvinceChange}
            >
              <MenuItem value="AB">Alberta</MenuItem>
              <MenuItem value="BC">British Columbia</MenuItem>
              <MenuItem value="MB">Manitoba</MenuItem>
              <MenuItem value="NB">New Brunswick</MenuItem>
              <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
              <MenuItem value="NT">Northwest Territories</MenuItem>
              <MenuItem value="NS">Nova Scotia</MenuItem>
              <MenuItem value="NU">Nunavut</MenuItem>
              <MenuItem value="ON">Ontario</MenuItem>
              <MenuItem value="PEI">Prince Edward Island</MenuItem>
              <MenuItem value="QC">Quebec</MenuItem>
              <MenuItem value="PEI">Prince Edward Island</MenuItem>
              <MenuItem value="SK">Sasketchewan</MenuItem>
              <MenuItem value="YK">Yukon</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={postal}
            label="Postal Code"
            id="postal"
            onChange={handlePostalChange}
          />
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
