import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material'

const ViewCard = (props) => {

  const {title, description } = props
  return (
    <Grid container columns={5}>
      <Grid item xs={1}>
        Name here
      </Grid>
      <Grid item xs={4}>
         Title: {`${title}`}
      </Grid>

      <Grid item xs={1}>
        Pic here
      </Grid>
      <Grid item xs={4} sx={{
        border: 'solid 1px black'
      }}>
        description: {`${description}`}
      </Grid>


    </Grid>
  )
}

export default ViewCard;
