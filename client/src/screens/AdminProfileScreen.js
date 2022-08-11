import React, { useState, useEffect } from 'react'
import { Typography, Container, Stack, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Form } from '../components/useForm'
import { setTimer, getTimer } from '../features/timer'



const style = {
    formWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
}


const initialValues = {
    endTime: null
}


const AdminProfileScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTimer())
    }, [])

    // const endTime = useSelector((state) => state.timer.timerEnd)

    const validate = () => {
        let temp = {}

        temp.endTime = (/^[0-9]+$/.test(values.endTime)) ? "" : "Enter valid number"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)


    const handleSubmit = (e) => {

        e.preventDefault();

        if (validate()) {
            const time = values.endTime * 60 * 1000
            dispatch(setTimer(time))
        }
    }

    return (
        <Container>
            <Typography variant="h4" sx={{ textAlign: "center", margin: "1rem 0" }}>Timer</Typography>
            <Form onSubmit={handleSubmit} >
                <Stack sx={{ ...style.formWrap }} spacing={2}>
                    <TextField
                        variant="outlined"
                        name="endTime"
                        value={values.endTime}
                        onChange={handleInputChange}
                        {...(errors ? { error: (errors.endTime ? true : false), helperText: errors.endTime } : false)}
                        label="Test Time in minutes"
                    />
                    <Button variant="contained" type="submit">Submit</Button>
                </Stack>
            </Form>
        </Container>
    )
}

export default AdminProfileScreen