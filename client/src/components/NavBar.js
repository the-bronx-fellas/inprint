import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button} from '@mui/material'
import { Link } from 'react-router-dom'

const NavBar = () =>{

  return (
    <AppBar position='static' sx={{
      backgroundColor: '#B6BFD3',
      width: '10vw',
      height:'100vh'

    }}>
      <Toolbar>
        <Link style={{textDecoration: 'none'}} to="/home">
          <Typography variant="h6" noUnderline sx={{
            border: 'solid 1px gray',
            py: 2,
            px: 2,
            my: 2,
            alignSelf: 'center',
            justifyContent: 'center',
            color: 'black'
          }
        }>
            InPrint
          </Typography>
        </Link>

      </Toolbar>

    </AppBar>
  )
}

export default NavBar;
