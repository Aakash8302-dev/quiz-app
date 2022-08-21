import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TestScreen from './TestScreen';
import { Box } from '@mui/system';
import axios from 'axios';
import PostSubmitScreen from './PostSubmitScreen';
import { checkSubmission } from '../features/user';
import { getTimer, setTimer } from '../features/timer'
import Loader from '../components/Loader';
import TestUnavailableScreen from './TestUnavailableScreen';


const StudentScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [timerStarted, setTimerStarted] = useState("idle")

    const userAnswer = useSelector((state) => state.user.userAnswer)
    const userInfo = useSelector((state) => state.user.value)
    const endTime = useSelector((state) => state.timer.endTime)
    const startTime = useSelector((state) => state.timer.startTime)
    const submitStatus = useSelector((state) => state.question.submitStatus);

    useEffect(() => {
        if (userInfo === null) {
            navigate('/');
        } else {
            if (userInfo.role === "admin")
                navigate('/alogin')
        }

        dispatch(getTimer())
        dispatch(checkSubmission())

    }, [userInfo, submitStatus])

    useEffect(() => {
        checkTimerStatus();
    })

    const checkTimerStatus = () => {
        
        const time = Date.parse(new Date()) - Date.parse(startTime)
        const totalTime = Date.parse(endTime) - Date.parse(startTime)

        if(time < 0)
            setTimerStarted("waiting")
        else if(time>0 && time<totalTime )
            setTimerStarted("running")
        else if(time>0 && time>totalTime )
            setTimerStarted("completed")
        
        
    }

    return (
        <Box>
            {   
                endTime && timerStarted === "running" ? (
                    userAnswer && userAnswer.exists === "submitted" ? (<PostSubmitScreen />) : endTime && endTime ?  (<TestScreen />) : <Loader />
                
                ) : (timerStarted === "waiting") ? <TestUnavailableScreen message={"Test is yet to start"} /> : (timerStarted === "completed") ? ( userAnswer && userAnswer.exists === "submitted" ? <PostSubmitScreen /> : <TestUnavailableScreen message={"Test Over"} />) : <Loader />
            }

            
        </Box>
    )
}

export default StudentScreen