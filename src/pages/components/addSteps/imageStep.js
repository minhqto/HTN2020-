import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import ImageDialog from "../ImageDialog";

export const ImageStep = () => {
  return (
    <div>
      <input accept="image/*" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          {/* <ImageDialog></ImageDialog>,<AddAPhoto /> */}
        </IconButton>
      </label>
    </div>
  );
};
