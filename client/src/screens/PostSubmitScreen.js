import React, { useState, useEffect } from 'react'
import { Container as Box, Grid, Typography } from '@mui/material'
import { getSetting } from '../features/setting';
import { useDispatch, useSelector } from 'react-redux';
import FeedbackForm from '../components/FeedbackForm'
import UserResult from '../components/UserResult';
import UserAnswer from '../components/UserAnswer';

const style = {
    root: {
        height: "80vh"
    },
    sectionWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    thankYou:{
        textAlign: "center",
        justifyContent: "center"
    }
}


const PostSubmitScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSetting());
    })

    const [component, setComponent] = useState("resultFeedback")
    const userAnswer = useSelector(state => state.user.userAnswer)
    const feedbackStatus = userAnswer.feedbackStatus


    const resultFeedback =
        <Grid container sx={{ ...style.root }}>
            <Grid item md={6} xs={12} sx={{ ...style.sectionWrap }}>
                <UserResult setComponent={setComponent} />
            </Grid>
            <Grid item md={6} xs={12} sx={{ ...style.sectionWrap }}>
                {feedbackStatus==="submitted" ? <Box style={{...style.thankYou}}>
                    <Typography variant='h4'>Thanks for your feedback</Typography>
                </Box> : <FeedbackForm />  }
            </Grid>
        </Grid>

    const renderSwitch = (param) => {
        switch (param) {
            case 'resultFeedback':
                return resultFeedback
            case 'userAnswer':
                return <UserAnswer setComponent={setComponent} />
            default:
                return <div>Not Found</div>
        }
    }

    return (
        <Box>
            {
                renderSwitch(component)
            }
        </Box>
    )
}

export default PostSubmitScreen