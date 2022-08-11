import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Grid, Snackbar, Typography } from '@mui/material'
import axios from 'axios'
import TestForm from '../components/TestForm'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import Timer from '../components/Timer'
import { getTimer } from '../features/timer'

const TestScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.value);
    const submitStatus = useSelector((state) => state.question.submitStatus);
    const endTime = useSelector((state) => state.timer.timerEnd)

    const [testQuestions, setTestQuestions] = useState(null)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: null
    })

    useEffect(() => {
        if (userInfo === null) {
            navigate('/');
        }
        getTestQuestions();

    }, [userInfo, navigate])

    useEffect(() => {

        if (submitStatus === "succeeded") {
            setNotify({
                isOpen: true,
                message: "Test Submitted Successfully",
                type: "success"
            })

            setTimeout(() => {
                window.location.reload(true)
            }, 1500)

        } else if (submitStatus === "failed") {
            setNotify({
                isOpen: true,
                message: "Something went wrong",
                type: "error"
            })
        }

    }, [submitStatus])


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
            <Alert notify={notify} setNotify={setNotify} />

            <Grid item>
                {
                    testQuestions ? <TestForm questions={testQuestions} /> : <Loader />
                }

            </Grid>
        </Container>
    )
}

export default TestScreen