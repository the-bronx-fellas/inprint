import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid } from '@mui/material'

const App = () => {

  return (
  <Box sx={{
    display : 'flex'
  }}>
    <AppBar position='static' sx={{
      backgroundColor: '#B6BFD3',
      width: '10vw',
      height:'100vh'

    }}>
      <Toolbar>
        <Typography variant="h6" sx={{
          border: 'solid 1px gray',
          py: 2,
          px: 2,
          my: 2,
          alignSelf: 'center',
          justifyContent: 'center'
        }}>
          InPrint
        </Typography>

      </Toolbar>

    </AppBar>
    <Box component={Paper} sx={{
      width: '90vw',
      height: '100vh',
      border: 'solid 1px black',
      display: 'flex'
    }}>
      Something here
    </Box>
  </Box>


    )
}

export default App
