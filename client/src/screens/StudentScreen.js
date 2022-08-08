import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TestScreen from './TestScreen';
import { Box } from '@mui/system';
import axios from 'axios';
import PostSubmitScreen from './PostSubmitScreen';
import { checkSubmission } from '../features/user';


const StudentScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAnswer = useSelector((state) => state.user.userAnswer)
    const userInfo = useSelector((state) => state.user.value)

    useEffect(() => {
        if (userInfo === null) {
            navigate('/');
        } else {
            if (userInfo.role === "admin")
                navigate('/alogin')
        }

        dispatch(checkSubmission())

    }, [userInfo])

    return (
        <Box>
            {
                userAnswer && userAnswer.exists === "submitted" ? (<PostSubmitScreen />) : (<TestScreen />)
            }
        </Box>
    )
}

export default StudentScreen