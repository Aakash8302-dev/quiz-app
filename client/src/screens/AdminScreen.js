import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Box, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import LeaderBoardScreen from './LeaderBoardScreen'
import CreateScreen from './CreateScreen'
import QuestionScreen from './QuestionScreen'
import AdminProfileScreen from './AdminProfileScreen'
import SettingScreen from './SettingScreen'
import Loader from '../components/Loader'
import { getSetting } from '../features/setting'
import {getTimer} from '../features/timer'

const AdminScreen = () => {

    const dispatch = useDispatch();

    const currpath = window.location.href;

    var screen = currpath.split('=')[1];

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.value);

    const setting = useSelector((state) => state.setting.status);
    const timer = useSelector((state) => state.timer.status);
    const initialStartTime = useSelector((state) => state.timer.startTime)
    const initialEndTime = useSelector((state) => state.timer.endTime)


    useEffect(() => {

        if (userInfo === null || userInfo.role === "student") {
            navigate('/');
        }

        dispatch(getSetting())
        dispatch(getTimer())

    }, [userInfo, navigate,initialStartTime, initialEndTime])
    

    const renderSwitch = (param) => {
        switch (param) {
            case 'a1':
                return <AdminProfileScreen />
            case 'a2':
                return <CreateScreen />
            case 'a4':
                return <LeaderBoardScreen />
            case 'a3':
                return <QuestionScreen />
            case 'a5':
                return <SettingScreen />
            default:
                return <div>Not Found</div>
        }
    }

    return (
        <>
            {
                (setting && setting === "succeeded" ) && (timer && timer === "succeeded") ? 
                renderSwitch(screen) : <Loader />
            }
        </>
    )
}

export default AdminScreen