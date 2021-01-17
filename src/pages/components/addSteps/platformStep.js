import React, { useContext, useEffect } from 'react';

import { Box, Grid, Fab } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { GlobalContext } from '../../../context/GlobalState';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minHeight: '90px',
  },
}))

export const PlatformStep = () => {
  
  const classes = useStyles();

  const { editPlatforms, addPost } = useContext(GlobalContext);

  const [postToTwitter, setTwitter] = React.useState(addPost.platforms.twitter);
  const [postToIG, setIG] = React.useState(addPost.platforms.instagram);
  const [postToFB, setFB] = React.useState(addPost.platforms.facebook);

  useEffect(() => {
    handleUpdate()
  },
  [postToTwitter, postToIG, postToFB])

  const handleUpdate = () => {
    editPlatforms({
      twitter: postToTwitter,
      instagram: postToIG,
      facebook: postToFB
    })
  }

  return (
    <Box className={classes.dialogContent}>
      <Grid container spacing={2}>
        <Grid item style={{justifyContent: 'center'}}>
          <ToggleButton
            value="check"
            selected={postToTwitter}
            onChange={() => {
              setTwitter(!postToTwitter);
            }}
          >
              <TwitterIcon/>
          </ToggleButton>
        </Grid>
        <Grid item style={{justifyContent: 'center'}}>
          <ToggleButton
            value="check"
            selected={postToIG}
            onChange={() => {
              setIG(!postToIG);
            }}
          >
              <InstagramIcon/>
          </ToggleButton>
        </Grid>
        <Grid item style={{justifyContent: 'center'}}>
          <ToggleButton
            value="check"
            selected={postToFB}
            onChange={() => {
              setFB(!postToFB);
            }}
          >
              <FacebookIcon/>
          </ToggleButton>
        </Grid>
      </Grid>
    </Box>
  )
}