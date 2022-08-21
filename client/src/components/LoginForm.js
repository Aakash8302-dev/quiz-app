import React, { useEffect } from 'react'
import { Grid, TextField, Box, styled, MenuItem, Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../features/user'
import { useForm, Form } from './useForm'
import { branches } from '../data'


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


const LoginForm = () => {

    const dispatch = useDispatch()

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "This field is required"
        temp.email = (/@/).test(values.email) ? "" : "Enter valid email "
        temp.regNo = (/^[0-9]+$/.test(values.regNo) && values.regNo.length === 13 && values.regNo.startsWith("2127")) ? "" : "Enter valid number"
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
                        <TextField
                            variant="outlined"
                            label='Name'
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.name ? true : false), helperText: errors.name } : false)}
                        />
                        <TextField
                            variant="outlined"
                            label='Email'
                            name="email"
                            email='true'
                            value={values.email}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.email ? true : false), helperText: errors.email } : false)}
                        />
                        <TextField
                            variant="outlined"
                            label='Register Number'
                            name="regNo"
                            value={values.regNo}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.regNo ? true : false), helperText: errors.regNo } : false)}
                        />
                        <TextField
                            variant="outlined"
                            select
                            label='Branch'
                            name='dept'
                            value={values.dept}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.dept ? true : false), helperText: errors.dept } : false)}
                        >
                            {branches.map((e) => (
                                <MenuItem key={e.id} value={e.value}>
                                    {e.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button sx={{ margin: "1rem 0" }} type="submit" variant="contained">BEGIN TEST</Button>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    )
}

export default LoginForm