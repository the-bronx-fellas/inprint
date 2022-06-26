import { useEffect, useState } from 'react'
import { PrivyClient, SiweSession } from '@privy-io/privy-browser'
import {Box, TextField, Button } from '@mui/material'

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(process.env.NEXT_PUBLIC_PRIVY_API_KEY, provider)
const client = new PrivyClient({
  session: session,
});
console.log('provider', provider)

export default function PrivyCheck(props){


  const [state, setState] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [s2Input, setS2Input] = useState("");


  const fetchData = async () => {
    try {
      const address = props.account
      console.log(address)
      if(!address) return
      const [firstName] = await client.get(address, ['first-name'])

      setState({
        ...state,
        userId: address,
        firstName: firstName?.text()
      })
      setNameInput(firstName?.text())

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchData()
  }, [])


  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      await session.authenticate();
      const userId = await session.address();
      setState({
        ...state,
        userId: userId
      });

      // After the wallet has been detected, we try to grab data from Privy if
      // it exists
      fetchData()
    } catch (error) {
      console.error(error);
    }
  }

  const submitDataToPrivy = async () => {
    const [firstName] = await client.put(state?.userId, [
      {
        field: 'first-name',
        value: nameInput
      }
    ]);
    setState({
      ...state,
      firstName: firstName.text()
    })
  }

  const handleChange = (e) => {
    setNameInput(
      e.target.value
    )
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    submitDataToPrivy()
  }
  console.log(state)
  return(
    <>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField value={nameInput} id="nameInput" label="First Name" onChange={handleChange} />

      <input type='submit' />
    </Box>
    <Button onClick={()=>connectToWallet()}>Connect</Button>

    </>
  )
}
