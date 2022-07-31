import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import TestForm from '../components/TestForm'

const TestScreen = () => {

    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user.value);

    const [testQuestions, setTestQuestions] = useState(null)

    useEffect(() => {

        if (userInfo === null) {
            navigate('/');
        }

        getTestQuestions();


    }, [userInfo, navigate])


    const getTestQuestions = async () => {

        const { data } = await axios.get("/api/question/", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        });

        setTestQuestions(data);

    }

    return (
        <Container>
            <Grid item>
                {
                    testQuestions ? <TestForm questions={testQuestions} /> : <Typography variant="h4" >Loading</Typography>
                }

            </Grid>
        </Container>
    )
}

export default TestScreen