import React from 'react'
import { Button, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import AnswerKeyCard from './AnswerKeyCard';

const UserAnswer = ({ setComponent }) => {

    const userAnswer = useSelector((state) => state.user.userAnswer);
    const answers = userAnswer.answer[0].answers

    return (
        <Container sx={{ padding: "1rem 0" }}>
            {answers && answers.map((e) => <AnswerKeyCard answers={e} />)}
            {console.log(answers)}
            <Button type='button' sx={{ backgroundColor: "#000" }} variant='contained' onClick={() => setComponent('resultFeedback')}>Back</Button>
        </Container>
    )
}

export default UserAnswer