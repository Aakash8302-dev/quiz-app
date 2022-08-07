import React, { useEffect, useState } from 'react'
import { Grid, TextField, Box, styled, MenuItem, FormHelperText, Button, Typography, Container, InputAdornment, InputLabel, FormControl, OutlinedInput, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { useForm, Form } from './useForm'
import { userRegister } from '../features/user'
import { branches } from '../data'

const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))

const initialValues = {
    regNo: '',
    password: '',
}

const style = {
    root: {
        textAlign: 'center',
        padding: '1rem 0',
    },
    formWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem 0'
    }
}

const AdminLoginForm = () => {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(true);

    const validate = () => {
        let temp = {}
        temp.regNo = (/^[0-9]+$/.test(values.regNo) && values.regNo.length === 13) ? "" : "Enter valid RegNo"
        temp.password = values.password ? "" : "Enter valid password"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            values.role = "admin"
            dispatch(userRegister(values))
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container sx={{ ...style.root }} >
                <Typography variant="h4">ADMIN</Typography>
                <Grid item sx={{ ...style.formWrap }}>
                    <Item>
                        <TextField
                            variant="outlined"
                            label='Register No'
                            name="regNo"
                            email={true}
                            value={values.regNo}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.regNo ? true : false), helperText: errors.regNo } : false)}
                        />
                        <FormControl variant='outlined'>
                            <TextField
                                id='outlined-adornment-password'
                                type={showPassword ? 'password' : 'text'}
                                value={values.password}
                                variant="outlined"
                                name="password"
                                onChange={handleInputChange}
                                {...(errors ? { error: (errors.password ? true : false), helperText: errors.password } : false)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Password'
                            />
                        </FormControl>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Item>
                </Grid>
            </Container>
        </Form>
    )
}

export default AdminLoginForm