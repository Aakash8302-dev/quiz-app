import React, { useEffect, useState } from 'react'
import { Grid, TextField, Box, styled, MenuItem, Button, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../features/user'
import { useForm, Form } from './useForm'
import { branches } from '../data'
import RatingStar from './RatingStar'
import { userFeedback } from '../features/user'
import Alert from '../components/Alert'


const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))


const initialValues = {
    review: '',
}


const FeedbackForm = () => {

    const dispatch = useDispatch()

    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: null
    })

    const feedbackStatus = useSelector((state) => state.user.feedbackStatus)

    useEffect(() => {

        if(feedbackStatus === "succeeded"){
            setNotify({
                isOpen: true,
                message: "Feedback submitted successfully",
                type: "success"
            })

        }else if(feedbackStatus === "failed"){
            setNotify({
                isOpen: true,
                message: "Unable to submit feedback",
                type: "error"
            })
        }
       
    },[feedbackStatus])

    const validate = () => {
        let temp = {}
        temp.review = values.review ? "" : "This field is required"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault();

        values.rating = rating;
        values.difficulty = difficulty;

        if (validate()) {
            dispatch(userFeedback(values))
        }
    }

    return (
        <Box>
            {
                feedbackStatus === "succeeded" ? <Box>
                <Typography variant='h4'>Thanks for your feedback</Typography>
            </Box> : <Form onSubmit={handleSubmit}>
                <Alert notify={notify} setNotify={setNotify} />
                <Grid container>
                    <Grid item>
                        <Item>
                            <Stack spacing={3}>
                                <Typography variant='h5' sx={{ textAlign: "center", }}>Give us your Feedback</Typography>
                                <Box component='div'>
                                    <Typography variant='h6'>How would you rate your experience with software ?</Typography>
                                    <RatingStar
                                        rating={rating}
                                        setRating={setRating}
                                        hover={hover}
                                        setHover={setHover}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant='h6'>How would you rate the difficulty of the questions ?</Typography>
                                    <RatingStar
                                        rating={difficulty}
                                        setRating={setDifficulty}
                                        hover={hover}
                                        setHover={setHover}
                                    />
                                </Box>
                                <Box component='div'>
                                    <Typography variant='h6'>Do you have any suggestions ?</Typography>
                                    <TextField
                                        multiline
                                        minRows={5}
                                        label='Suggestions'
                                        name="review"
                                        sx={{ '& .MuiOutlinedInput-root': { width: '100%' } }}
                                        value={values.review}
                                        onChange={handleInputChange}
                                        {...(errors ? { error: (errors.review ? true : false), helperText: errors.review } : false)}
                                    />
                                </Box>
                            </Stack>
                            <Button sx={{ margin: "1rem 0" }} type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Form>
            }
        </Box>
        
    )
}

export default FeedbackForm