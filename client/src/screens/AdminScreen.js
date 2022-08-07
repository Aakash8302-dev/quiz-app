import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Box, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import LeaderBoardScreen from './LeaderBoardScreen'
import CreateScreen from './CreateScreen'
import QuestionScreen from './QuestionScreen'

const AdminScreen = () => {
    const currpath = window.location.href;

    var screen = currpath.split('=')[1];

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.value);

    const [component, setComponent] = useState("")


    useEffect(() => {

        if (userInfo === null) {
            navigate('/');
        }

    }, [userInfo, navigate])

    const renderSwitch = (param) => {
        switch (param) {
            case 'a2':
                return <CreateScreen />
            case 'a4':
                return <LeaderBoardScreen />
            case 'a3':
                return <QuestionScreen />
            default:
                return <div>Not Found</div>
        }
    }

    return (
        <>
            {
                renderSwitch(screen)
            }
        </>
    )
}

export default AdminScreen