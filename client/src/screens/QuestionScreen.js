import React, { useEffect } from 'react'
import { Container } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../features/question'


const QuestionScreen = () => {

    const dispatch = useDispatch();

    const allQuestions = useSelector((state) => state.question.allQuestions)

    useEffect(() => {
        dispatch(getAllQuestions());
    }, [])

    return (
        <Container>
            QuestionScreen
        </Container>
    )
}

export default QuestionScreen