import React from 'react'
import { Container, Typography, Box } from "@mui/material"
import Countdown from 'react-countdown'

const styles = {
    timer: {
        textAlign: 'center',
    },
    timerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ebfaff',
        color: '#00b3ff',
        margin: '0.7rem 0',
        padding: '0.4rem',
        borderRadius: '0.6rem',
    },
    timerText: {
        display: 'flex',
        alignItems: 'center',
    },
};

const Timer = ({ endTime }) => {



    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            window.alert("Timer Done")
        } else {
            return <span>{minutes} : {seconds}</span>
        }
    }

    return (
        <Container>
            <Box sx={{ ...styles.timerHeader }}>
                <Box sx={{ ...styles.timerText }}>
                    <Typography variant='h6'>Time Remaining</Typography>
                </Box>
                <Typography variant='h6'>
                    <Countdown
                        date={Date.now() + endTime}
                        renderer={renderer}
                    />
                </Typography>
            </Box>
            <Typography variant='h5'>

            </Typography>

        </Container>
    )
}

export default Timer