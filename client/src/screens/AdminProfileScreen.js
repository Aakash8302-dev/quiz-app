import React, { useState, useEffect } from 'react'
import { Typography, Container, Stack, TextField, Button, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Form } from '../components/useForm'
import { setTimer, getTimer } from '../features/timer'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MuiDateTime from '../components/MuiDateTime'
import Loader from '../components/Loader'



const style = {
    root:{
        padding: "1rem"
    },
    dateGrid:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    btn:{
        textAlign: "center"
    }
}


const initialValues = {
    endTime: null
}


const AdminProfileScreen = () => {

    const dispatch = useDispatch();

    const initialStartTime = useSelector((state) => state.timer.startTime)
    const initialEndTime = useSelector((state) => state.timer.endTime)

    const [startTime, setStartTime] = useState(initialStartTime)
    const [endTime, setEndTime] = useState(initialEndTime)

    useEffect(() => {
        dispatch(getTimer())
    }, [])

    const handleSubmit = () => {
        
        const values = {
            startTime,
            endTime
        }  

        console.log(values)

        dispatch(setTimer(values))
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                <Grid container sx={style.root} >
                    {
                        initialStartTime && initialEndTime ? <><Grid item md={6} sm={6} sx={{...style.dateGrid}}>
                            <MuiDateTime dateTime={startTime}  setDateTime={setStartTime} label={'Start Time'}/>
                        </Grid>
                        <Grid item md={6} sm={6} sx={{...style.dateGrid}}>
                            <MuiDateTime dateTime={endTime}  setDateTime={setEndTime} label={'End Time'}/>
                        </Grid>
                        <Button type='button' variant='contained' sx={{...style.btn}} onClick={handleSubmit}>Set Timer</Button></>: (<Loader />)
                    }
                        
                </Grid>
            </Container>
        </LocalizationProvider>
    )
}

export default AdminProfileScreen