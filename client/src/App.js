import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material';
import NavBar from './components/NavBar';
import SiteRoutes from './components/SiteRoutes';

const App = () => {

  return (
    <Box sx={{
      display : 'flex'
    }}>
      <NavBar />
      <SiteRoutes />
    </Box>
  )
}

export default App;
