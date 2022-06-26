import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material'
import { Blog } from '../hooks/inprint';
import { ethers } from 'ethers'

const blog = new Blog("0x5FbDB2315678afecb367f032d93F642f64180aa3",
                      "http://127.0.0.1:8545");

const Creation = () => {


  const [provider, setProvider] = useState()
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [blogPosts, setBlogPosts] = useState(null)

  const readBlogPosts = async () => {
    const blogList = await blog.getBlogInfo()
    setBlogPosts(blogList)
    console.log(blogList)
  }


  useEffect(()=>{
    readBlogPosts();
  }, [])


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
        Form here
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
