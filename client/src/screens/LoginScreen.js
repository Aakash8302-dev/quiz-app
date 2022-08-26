import React, { useEffect,useState } from 'react'
import { Container, Grid, Typography, Stack, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { Height } from '@mui/icons-material'
import Alert from '../components/Alert'

const style = {
    formWrap: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }
}

const LoginScreen = () => {

    const navigate = useNavigate();

    const [notify, setNotify] = useState("");

    const userInfo = useSelector((state) => state.user.value)
    const userRegisterStatus = useSelector((state) => state.user.userRegisterStatus)

    useEffect(() => {

        if(userRegisterStatus){
            setNotify({
                isOpen: true,
                message: userRegisterStatus,
                type: "error"
            })
        }else if(userInfo && userInfo.token){
            navigate("/student");
        }
    }, [userInfo, navigate, userRegisterStatus]);

    return (
        <Container fluid>
            <Alert notify={notify} setNotify={setNotify} />
            <Grid item sm={12} sx={{ ...style.formWrap }}>
                <Box component='div'>
                    <Typography sx={{ textAlign: "center", margin: "2rem 0 3.5rem 0" }} variant='h4'>TEST</Typography>
                    <LoginForm />
                </Box>
            </Grid>
        </Container>
    )
}

export default LoginScreen