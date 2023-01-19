import React, { useEffect,useState } from 'react'
import { Grid, TextField, Box, styled, MenuItem, Button, Modal, Typography, Stack } from '@mui/material'
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
    firstName: '',
    lastName: '',
    email: '',
    regNo: '',
    dept: ''
}

const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFFF',
        border: '2px solid #FFFFF',
        borderRadius: '0.6rem',
        boxShadow: 24,
        p: 4,
        title: {
            color: '#000'
        },
        footer: {
            float: 'right',
            margin: "1.5rem 0 0"
        },
        alert:{
            color: '#FF0000',
            margin: '2px 0'
        },
        bold:{
            fontWeight: "bolder"
        }
    },
}


const LoginForm = () => {

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const validate = () => {
        let temp = {}
        temp.firstName = values.firstName ? "" : "This field is required"
        temp.lastName = values.lastName ? "" : "This field is required"
        temp.email = (/@/).test(values.email) && (values.email.endsWith("@svce.ac.in")) ? "" : "Enter svce email id "
        temp.regNo = (/^[0-9]+$/.test(values.regNo) && values.regNo.length === 13 && values.regNo.startsWith("2127")) ? "" : "Enter valid number"
        temp.dept = values.dept.length !== 0 ? "" : "This field is required"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }


    const handleModalOpen = () => {
        if(validate()){
            setOpen(true)
        }
    }

    const handleModalClose = () => setOpen(false);


    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()){
            values.role = "student"
            dispatch(userRegister(values))
           
            let myDoc = document.documentElement;
            
            if(myDoc.requestFullscreen){
                myDoc.requestFullscreen();
            }
        }
    }

    return (
        <Form>
            <Modal
                open={open}
                onClose={handleModalClose}
            >
                <Box sx={{...style.modal}}>
                    <Stack spacing={1}>
                        <Typography variant='h5' sx={{margin: "0 0 0.7rem"}}>Check your credentials</Typography>
                        <Typography variant='subtitle1'>Name : <span style={{...style.modal.bold}}>{values.firstName.toUpperCase()} {values.lastName.toUpperCase()}</span> </Typography>
                        <Typography variant='subtitle1'>Email : <span style={{...style.modal.bold}}>{values.email}</span></Typography>
                        <Typography variant='subtitle1'>Register No : <span style={{...style.modal.bold}}>{values.regNo}</span></Typography>
                        <Typography variant='subtitle1'>Branch : <span style={{...style.modal.bold}}>{values.dept}</span></Typography>
                        <Typography sx={{...style.modal.alert}} >Please make sure that you have entered valid credentials. You won't be able to make any further changes.</Typography>
                        <Button type='button' variant='outlined' onClick={handleSubmit} sx={{...style.modal.button}} >Start Test</Button>
                    </Stack>
                </Box>
            </Modal>
            <Grid container>
                <Grid item>
                    <Item>
                        <TextField
                            variant="outlined"
                            label='First Name'
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.firstName ? true : false), helperText: errors.firstName } : false)}
                        />
                        <TextField
                            variant="outlined"
                            label='Last Name'
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.lastName ? true : false), helperText: errors.lastName } : false)}
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
                        <Button sx={{ margin: "1rem 0" }} type="button" variant="contained" onClick={handleModalOpen}>BEGIN TEST</Button>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    )
}

export default LoginForm