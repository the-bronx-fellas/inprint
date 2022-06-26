import React, { useState, useEffect } from 'react';
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Welcome = () => {

  return (
    <Box component={Paper}
      sx={{
      width: '90vw',
      height: '100vh',
      border: 'solid 1px black',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        width: '100%'
      }}>
      <Typography variant="h1" sx={{
        alignSelf: 'center',
        justifySelf: 'center',
        width:'100%',
        textAlign: 'center'
      }}>
        InPrint
        <br></br>

        <Link to="/view">View </Link>|
        <Link to="/create">Create</Link>
      </Typography>
        <br></br>
      </Box>
    </Box>
  )
}

export default Welcome;
