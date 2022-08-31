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
import RulesScreen from './RulesScreen';


const StudentScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [timerStarted, setTimerStarted] = useState("idle")
    const [whenRefresh, setWhenRefresh] = useState("idle")
    const [read, setRead] = useState(false)

    const userAnswer = useSelector((state) => state.user.userAnswer)
    const userInfo = useSelector((state) => state.user.value)
    const endTime = useSelector((state) => state.timer.endTime)
    const startTime = useSelector((state) => state.timer.startTime)
    const submitStatus = useSelector((state) => state.question.submitStatus);

    useEffect(() => {
        if (userInfo === null) {
            navigate('/');
        } else {

            if(userInfo.role === "admin")
                navigate('/alogin')
        }

        dispatch(getTimer())
        dispatch(checkSubmission())

    }, [userInfo, submitStatus])

    useEffect(() => {
        checkTimerStatus();
        if(whenRefresh !== "idle"){
            setTimeout(()=>{
                setTimerStarted("running")
            }, whenRefresh)
        }
    })

    const checkTimerStatus = () => {
        
        const time = Date.parse(new Date()) - Date.parse(startTime)
        const totalTime = Date.parse(endTime) - Date.parse(startTime)

        if(time < 0){
            setTimerStarted("waiting")
            setWhenRefresh(time*-1);
        }
        else if(time>0 && time<totalTime )
            setTimerStarted("running")
        else if(time>0 && time>totalTime )
            setTimerStarted("completed")
        
    }

    return (
        <Box>
            {   
                endTime && timerStarted === "running" ? (
                    userAnswer && userAnswer.exists === "submitted" ? (<PostSubmitScreen />) : endTime && endTime ? ( read ? (<TestScreen />) : (<RulesScreen setRead={setRead} />) ): <Loader />
                
                ) : (timerStarted === "waiting") ? ( read ? <TestUnavailableScreen title={"Test has not yet started..."} /> : <RulesScreen setRead={setRead} /> ): (timerStarted === "completed") ? ( userAnswer && userAnswer.exists === "submitted" ? <PostSubmitScreen /> : <TestUnavailableScreen title={"Whoops..."} subTitle={"seems like test has completed"} />) : <Loader />
            }

            
        </Box>
    )
}

export default StudentScreen