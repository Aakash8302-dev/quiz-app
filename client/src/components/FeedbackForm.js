import React, { useEffect, useState } from 'react'
import { Grid, TextField, Box, styled, MenuItem, Button, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../features/user'
import { useForm, Form } from './useForm'
import { branches } from '../data'
import RatingStar from './RatingStar'


const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))


const initialValues = {
    name: '',
    email: '',
    regNo: '',
    dept: ''
}


const FeedbackForm = () => {

    const dispatch = useDispatch()

    const [hover, setHover] = useState(null);

    const [rating, setRating] = useState(3);
    const [difficulty, setDifficulty] = useState(1);

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "This field is required"
        temp.email = (/@/).test(values.email) ? "" : "Enter valid email "
        temp.regNo = (/^[0-9]+$/.test(values.regNo) && values.regNo.length === 13) ? "" : "Enter valid number"
        temp.dept = values.dept.length !== 0 ? "" : "This field is required"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            values.role = "student"
            dispatch(userRegister(values))
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item>
                    <Item>
                        <Stack spacing={3}>
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
                                    name="suggestions"
                                    sx={{ '& .MuiOutlinedInput-root': { width: '100%' } }}
                                    value={values.suggestions}
                                    onChange={handleInputChange}
                                    {...(errors ? { error: (errors.suggestions ? true : false), helperText: errors.suggestions } : false)}
                                />
                            </Box>
                        </Stack>
                        <Button sx={{ margin: "1rem 0" }} type="submit" variant="contained">Submit</Button>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    )
}

export default FeedbackForm