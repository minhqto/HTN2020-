import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import { GlobalContext } from '../../../context/GlobalState';


export const CaptionStep = () => {

  const { editCaption, addPost } = useContext(GlobalContext);

  let tagMatches = [
    {
      lookFor: 'food',
      recommend: ["#restaurant", "#foodie"]
    },
    {
      lookFor: "Toronto",
      recommend: ["#eatlocal", "#torontoeats"]
    },
    {
      lookFor: "salad",
      recommend: ["#healthy", "#vegan"]
    }
  ]

  let [textValue, setTextValue] = useState(addPost.caption || '');
  let [tags, addTag] = useState([]);

  const handleChange = (event) => {
    setTextValue(event.target.value);

    tagMatches.forEach((el, index) => {
      if (textValue.includes(el.lookFor) && !el.matched) {
        for (const tag of el.recommend) {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        }
      }
    })

    editCaption(event.target.value);
  };

  const handleTagAdd = (el) => {
    setTextValue(textValue + " " + el);
    editCaption(textValue + " " + el);
  }

  return (
    <div>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6} >
            <TextField
              fullWidth
              id="Caption Area"
              label="Caption"
              multiline
              rows={8}
              variant="outlined"
              value={textValue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Recommended Tags
            </Typography>
            <Grid container spacing={1}>
              {
                tags.map((el) => (
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handleTagAdd(el)}> {el} </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}