import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material'
import { ethers } from 'ethers';
import { connectBlog } from '../hooks/inPrintHooks'
import CreateBlogForm from './CreateBlogForm';

const Creation = () => {


  const [provider, setProvider] = useState()
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState('');



  // useEffect(()=>{
  //   const blog = connectBlog();
  //   setContract(blog)
  //   console.log('contract', contract)
  // }, [])


  const connectAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('ethereum is available')

      // get provider injected by metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)

    setProvider(provider)
    await provider.send('eth_requestAccounts', []);
    const accountList = await provider.listAccounts();
    setAccount(accountList[0])
    setConnected(true);
    }
  }

  const NotConnected = () => {
    return (
      <>
      <Typography variant="h4">
        Connect with Metamask:
        <br></br>
        <Button onClick={()=>{connectAccount()}}>
          Connect
        </Button>
      </Typography>
      </>
    )
  }

  const ValidConnection = () => {
    return (
      <>
        <CreateBlogForm />
      </>
    )
  }

  return (

    <Paper sx={{
      width: '90vw',
      height: '100vh',
      border: 'solid 1px black',
      display: 'flex'
    }}>

      {connected ? (<ValidConnection />) : (<NotConnected />)}

    </Paper>



    )

}

export default Creation;
