import React, { useState, useEffect } from 'react'
import { TextField, Divider, Radio, FormLabel, RadioGroup, FormControlLabel} from '@mui/material'
import { ethers } from 'ethers';
import { connectBlog } from '../hooks/inPrintHooks'

const CreateBlogForm = (props) => {

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

    // const [blogDescription, setBlogDescription] = useState('')
    // const [blogName, setBlogName] = useState('')
    // const [multiUser, setMultiUser] = useState(false)
    // const [publicBlog, setPublic] = useState(false)
    // const [deletable, setDeletable] = useState(false)
    // const [modifiable, setModifiable] = useState(false)
    // const [allowsReplies, setAllowReplies] = useState(false)

    const handleChange = (e) => {
      setIntake({
        ...intake,
        [e.target.id] : e.target.value
      })
    }

    const handleCheck = (e) => {
      console.log('value', e.target.value)
      console.log('checked', e.target.checked)
      // const [id, value] = e.target
      // console.log('id', id)
      // console.log('value', value)

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
        multiUser: intake.multiUser,
        publicBlog: intake.publicBlog,
        deletable: intake.deletable,
        modifiable: intake.modifiable,
        allowsReplies: intake.allowsReplies,
        blogMetaData: '' };
      try {
        await contract.deployNewBlog(blogObj)
      } catch (error) {
        alert('error', error)
      }
    }

    const { blogName, blogDescription, multiUser, publicBlog, deletable, modifiable, allowsReplies } = intake
    console.log('intake', intake)
    return (
      <form onSubmit={handleSubmit}>
        <TextField disabled id="Address" defaultValue={creator} label="disabled" />
        <br></br><br></br>
        <TextField required id="blogName" label="Blog Name" value={blogName} onChange={handleChange} />
        <br></br><br></br>
        <TextField required id="blogDescription" label="Description" value={blogDescription} onChange={handleChange} />
        <br></br><br></br>
        <FormLabel id="multiUser">Multi User?</FormLabel>
          <RadioGroup
          name="multiUser"
          value={multiUser}
          onChange={handleCheck}
        >
          <FormControlLabel control={<Radio id="multiUser" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="multiUser" value={'false'} />} label="No" />
      </RadioGroup>
        <br></br><br></br>
        <FormLabel id="publicBlog">Public?</FormLabel>
          <RadioGroup
          name="Public"
          value={publicBlog}
          onChange={handleCheck}
        >
          <FormControlLabel control={<Radio id="publicBlog" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="publicBlog" value={'false'} />} label="No" />
      </RadioGroup>
        <br></br><br></br>
        <FormLabel id="deletable">Deletable?</FormLabel>
          <RadioGroup
          name="deletable"
          value={deletable}
          onChange={handleCheck}
        >
          <FormControlLabel control={<Radio id="deletable" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="deletable" value={'false'} />} label="No" />
      </RadioGroup>
        <br></br><br></br>
        <FormLabel id="modifiable">Modifiable?</FormLabel>
          <RadioGroup
          name="modifiable"
          value={modifiable}
          onChange={handleCheck}
        >
          <FormControlLabel control={<Radio id="modifiable" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="modifiable" value={'false'} />} label="No" />
      </RadioGroup>
      <br></br><br></br>
        <FormLabel id="allowsReplies">Allow Replies?</FormLabel>
          <RadioGroup
          name="allowsReplies"
          value={allowsReplies}
          onChange={handleCheck}
        >
          <FormControlLabel control={<Radio id="allowsReplies" value={'true'} />} label="Yes" />
          <FormControlLabel control={<Radio id="allowsReplies" value={'false'} />} label="No" />
      </RadioGroup>
      </form>
    )
}

export default CreateBlogForm;
