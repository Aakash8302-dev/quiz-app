import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Grid, Typography } from '@mui/material';

const style = {
  root:{
      padding: "1rem"
  },
  li:{
      margin: "1.5rem"
  }
}

const RulesScreen = ({setRead}) => {

  const handleFinishRules = () => {
    setRead(true)
  }

  return (
    <Container>
    <Grid container>
    <Grid item>
        <Typography variant='h5'>Rules and Regulations</Typography>
        <Typography variant='subtitle1'>
            <ol>
                <li style={{...style.li}}>There are 50 questions on the test, each consiting of 4 options, out of which only one is correct.
                    Questions 1-10 will test your quantitative ability.
                    Questions 11-20 will test your verbal reasoning.
                    Questions 21-30 will test your programming skills.
                    Questions 31-50 will test your core knowledge.
                </li>
                <li  style={{...style.li}}>1 point is granted for every correct answer. There is no negative marking.</li>
                <li  style={{...style.li}}>All questions are compulsory.</li>
                <li  style={{...style.li}}>The Test will auto-submit when the timer ends</li>
                <li  style={{...style.li}}>You will be able to view your total score as well as the correct answers once the test ends</li>
            </ol>
        </Typography>
       
    </Grid>
    <Button variant='contained' onClick={handleFinishRules}>Start Test</Button>
</Grid>
</Container>   
  )
}

export default RulesScreen