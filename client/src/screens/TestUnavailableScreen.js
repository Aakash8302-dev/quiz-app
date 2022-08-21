import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import hourglass from '../images/hourglass.gif'

const style = {
  root:{
    textAlign: "center",
  },
  hourglass:{
    height: "200px"
  },
  imageCenter:{
    margin: 0,
    position:" absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  message:{
    margin: "2rem 0",
    fontWeight: "bold"
  }
}

const TestUnavailableScreen = ({message}) => {
  return (
    <Container sx={{...style.root}}>
      <Typography variant='h4'  sx={{...style.message}} >{message}</Typography>
      <Box component='div' sx={{...style.imageCenter}}>
        <img src={hourglass} alt="hourglass" style={{...style.hourglass}}/>
      </Box>
    </Container>
  )
}

export default TestUnavailableScreen