import React, { useState, useEffect } from 'react'
import { TextField, Divider, Radio, FormLabel, RadioGroup, FormControlLabel, Box} from '@mui/material'
import { ethers } from 'ethers';
import { connectBlog } from '../hooks/inPrintHooks'

const CreateBlogForm = (props) => {

    console.log(props)
    const [contract, setContract] = useState()
    const [creator, setCreator] = useState('')

    const defaultLocalState = {
      blogDescription: '',
      blogName: '',
      multiUser: false,
      publicBlog: false,
      deletable: false,
      modifiable: false,
      allowsReplies: false

    }

    const [intake, setIntake] = useState(defaultLocalState)


    const handleChange = (e) => {
      setIntake({
        ...intake,
        [e.target.id] : e.target.value
      })
    }

    const handleCheck = (e) => {
      setIntake({
        ...intake,
        [e.target.id] : changeToBoolean(e.target.value)
      })
    }
    const changeToBoolean = (str) => {
      if(str === 'true') return true
      else return false
    }

    useEffect(()=>{
      const blog = connectBlog();
      setContract(blog)
      setCreator(props.account)
    }, [props.account])

    console.log('contract here', contract)

    const handleSubmit = (e) => {
      e.preventDefault();
      submitNewBlog();
      //refresh to view blog
    }

    const submitNewBlog = async () => {
      let blogObj = {
        creator,
        blogName: intake.blogName,
        blogDescription: intake.blogDescription,
        multiUserP: intake.multiUser,
        publicBlogP: intake.publicBlog,
        deletableP: intake.deletable,
        modifiableP: intake.modifiable,
        allowsRepliesP: intake.allowsReplies,
        blogMetaData: '' };
      try {
        await contract.deployNewBlog(blogObj).then(console.log)
      } catch (error) {
        alert(error)
      }
    }

    const { blogName, blogDescription, multiUser, publicBlog, deletable, modifiable, allowsReplies } = intake
    console.log('intake', intake)
    return (
      <Box
      component="form"
      onSubmit={handleSubmit}
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        py: 3,
        px: 3,
        justifyContent: "center"

      }}>
        <Box>
          <TextField disabled id="outline-disabled" label="Wallet Address" value={`${creator}`} InputProps={{
            readOnly: true,
          }} />
          <br></br><br></br>
          <TextField required id="blogName" label="Blog Name" value={blogName} onChange={handleChange} />
          <br></br><br></br>
          <TextField required id="blogDescription" label="Description" value={blogDescription} onChange={handleChange} />
          <br></br><br></br>
        </Box>



        <Box sx={{
          display: "flex"
        }}>
          <Box>
            <FormLabel id="multiUser">Multi User?</FormLabel>
              <RadioGroup
              row
              name="multiUser"
              value={multiUser}
              onChange={handleCheck}
            >
              <FormControlLabel control={<Radio id="multiUser" value={'true'} />} label="Yes" />
              <FormControlLabel control={<Radio id="multiUser" value={'false'} />} label="No" />
          </RadioGroup>

          </Box>

        <br></br><br></br>

        <Box>
          <FormLabel id="publicBlog">Public?</FormLabel>
            <RadioGroup
            name="Public"
            value={publicBlog}
            onChange={handleCheck}
            row
          >
            <FormControlLabel control={<Radio id="publicBlog" value={'true'} />} label="Yes" />
            <FormControlLabel control={<Radio id="publicBlog" value={'false'} />} label="No" />
        </RadioGroup>
        </Box>

        <br></br><br></br>

        <Box>
          <FormLabel id="deletable">Deletable?</FormLabel>
            <RadioGroup
            name="deletable"
            value={deletable}
            onChange={handleCheck}
            row
          >
            <FormControlLabel control={<Radio id="deletable" value={'true'} />} label="Yes" />
            <FormControlLabel control={<Radio id="deletable" value={'false'} />} label="No" />
        </RadioGroup>
        </Box>

        <br></br><br></br>
        <Box>
          <FormLabel id="modifiable">Modifiable?</FormLabel>
            <RadioGroup
            name="modifiable"
            value={modifiable}
            onChange={handleCheck}
            row
          >
            <FormControlLabel control={<Radio id="modifiable" value={'true'} />} label="Yes" />
            <FormControlLabel control={<Radio id="modifiable" value={'false'} />} label="No" />
        </RadioGroup>
        </Box>
      <br></br><br></br>
      <Box>
        <FormLabel id="allowsReplies">Allow Replies?</FormLabel>
          <RadioGroup
          name="allowsReplies"
          value={allowsReplies}
          onChange={handleCheck}
          row
        >
          <FormControlLabel control={<Radio id="allowsReplies" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="allowsReplies" value={'false'} />} label="No" />
      </RadioGroup>
      </Box>

        </Box>
      <input type="submit" />
      </Box>
    )
}

export default CreateBlogForm;
