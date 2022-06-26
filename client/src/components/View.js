import React, { useState, useEffect } from 'react'
import { Box, Paper, AppBar, Toolbar, Typography, Grid, Button } from '@mui/material'
// import { Blog } from '../hooks/inprint';
import { connectBlog } from '../hooks/inPrintHooks'
import { ethers } from 'ethers'

// const blog = new Blog("http://127.0.0.1:8545");
// blog.connectToBlogAddress('0x5FbDB2315678afecb367f032d93F642f64180aa3')

const View = () => {

  const [provider, setProvider] = useState()
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [blogPosts, setBlogPosts] = useState(null)
  const [contract, setContract] = useState()


  useEffect(()=>{
    const blog = connectBlog();

    (async () =>{
      const readBlogPosts = async () => {
        const blogList = await blog.getBlogInfo()
        setBlogPosts(blogList)
        console.log(blogList)
      }
      readBlogPosts();
    })()
    setContract(blog)
    console.log('contract', contract)
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
