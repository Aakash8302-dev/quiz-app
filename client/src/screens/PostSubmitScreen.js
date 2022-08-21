import React, { useState } from 'react'
import { Container as Box, Grid } from '@mui/material'
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
    }
}


const PostSubmitScreen = () => {
    const [component, setComponent] = useState("resultFeedback")


    const resultFeedback =
        <Grid container sx={{ ...style.root }}>
            <Grid item md={6} xs={12} sx={{ ...style.sectionWrap }}>
                <UserResult setComponent={setComponent} />
            </Grid>
            <Grid item md={6} xs={12} sx={{ ...style.sectionWrap }}>
                <FeedbackForm />
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