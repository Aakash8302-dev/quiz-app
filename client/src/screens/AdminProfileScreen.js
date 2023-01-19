import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'


import { useDispatch, useSelector } from 'react-redux'
import { setTimer} from '../features/timer'
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
        textAlign: "center",
        margin: "2rem"
    }
}


const initialValues = {
    endTime: null
}


const AdminProfileScreen = () => {

    const dispatch = useDispatch();

    const initialStartTime = useSelector((state) => state.timer.startTime)
    const initialEndTime = useSelector((state) => state.timer.endTime)
    const timerGetStatus = useSelector((state) => state.timer.status)

    const [startTime, setStartTime] = useState(initialStartTime)
    const [endTime, setEndTime] = useState(initialEndTime)

    const handleSubmit = () => {
        
        const values = {
            startTime,
            endTime
        }

        dispatch(setTimer(values))
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                    {
                        timerGetStatus && timerGetStatus === "succeeded" ? <> <Grid container sx={{...style.root}}><Grid item md={6} sm={6} sx={{...style.dateGrid}}>
                            <MuiDateTime dateTime={startTime}  setDateTime={setStartTime} label={'Start Time'}/>
                        </Grid>
                        <Grid item md={6} sm={6} sx={{...style.dateGrid}}>
                            <MuiDateTime dateTime={endTime}  setDateTime={setEndTime} label={'End Time'}/>
                        </Grid>
                        </Grid>
                        <Box sx={{...style.btn}}>
                            <Button type='button' variant='contained' sx={{...style.btn}} onClick={handleSubmit}>Set Timer</Button>
                        </Box>
                        </>: (<Loader />)
                    } 
            </Container>
        </LocalizationProvider>
    )
}

export default AdminProfileScreen