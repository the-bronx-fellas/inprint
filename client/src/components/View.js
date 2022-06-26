import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material'
import { Blog } from '../hooks/inprint';
import { ethers } from 'ethers'

const blog = new Blog("0x5FbDB2315678afecb367f032d93F642f64180aa3",
                      "http://127.0.0.1:8545");

const View = () => {

  //blog.inaugurateBlog(username<string>)
  //blog.

  // const create = async () => {
  //   blog.getBlogInfo().then(console.log).then(()=> blog.authWithMetamask()).then(()=> blog.inaugurateBlog('WhateverIwant')).then(console.log)
  // }




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


  //Privy test run


  return (

    <Paper sx={{
      width: '90vw',
      height: '100vh',
      border: 'solid 1px black',
      display: 'flex'
    }}>
      <Grid container spacing={1} columns={5}>
        <Grid item xs={3} sx={{
          border: 'solid 1px black'
        }}>

        {blogPosts ? (
          <>
          {`Name: ${blogPosts.blogName}`}
          <br></br>
          {`Description: ${blogPosts.blogDescription}`}
          </>
        ) : ('No current blog')}

        </Grid>



        <Grid item xs={2} sx={{
          border: 'solid 1px black'
        }}>
          post wallet address here : {connected ? (account) : (
          <Button onClick={()=>connectAccount()}>
            Connect
          </Button>)}


        </Grid>
      </Grid>
    </Paper>



    )
}

export default View
