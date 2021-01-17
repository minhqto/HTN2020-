import React from 'react';

import { Box, Grid, Fab } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { sizing } from '@material-ui/system';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

export const PlatformStep = () => {

  const [postToTwitter, setTwitter] = React.useState(false);
  const [postToIG, setIG] = React.useState(false);
  const [postToFB, setFB] = React.useState(false);

  return (
    <Box height="300">
      <Grid container spacing={3}>
        <Grid item xs>
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
        <Grid item xs>
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
        <Grid item xs>
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