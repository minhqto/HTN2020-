import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'

export const CaptionStep = () => {

  function handleChange(){};

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item md direction="column">
            <TextField
              id="Caption Area"
              label="Caption"
              multiline
              rows={8}
              variant="outlined"
              defaultValue="Type here!"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            Recommended Tags
          </Grid>
        </Grid>
    </div>
  )
}