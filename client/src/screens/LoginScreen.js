import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const style = {
    formWrap: {
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        margin: "2rem 0"
    }
}

const LoginScreen = () => {

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.value)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            navigate("/test");
        }
    }, [userInfo, navigate]);

    return (
        <Container fluid>
            <Grid item sm={12} sx={{ ...style.formWrap }}>
                <LoginForm />
            </Grid>
        </Container>
    )
}

export default LoginScreen