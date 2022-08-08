import React, { useEffect } from 'react'
import { Container, Grid, Typography, Stack, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const style = {
    formWrap: {
        position: "absolute",
        top: "38%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: "2rem 0"
    }
}

const LoginScreen = () => {

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.value)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            navigate("/student");
        }
    }, [userInfo, navigate]);

    return (
        <Container fluid>
            <Grid item sm={12} sx={{ ...style.formWrap }}>
                <Box component='div'>
                    <Typography sx={{ textAlign: "center", margin: "2rem 0 3.5rem 0" }} variant='h4'>APTITUDE TEST</Typography>
                    <LoginForm />
                </Box>
            </Grid>
        </Container>
    )
}

export default LoginScreen