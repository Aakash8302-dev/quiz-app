import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminLoginForm from '../components/AdminLoginForm'


const AdminLoginScreen = () => {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.value)

    useEffect(() => {
        if (userInfo && userInfo.token) {
            navigate("/admin?screen=a1");
        }
    }, [userInfo, navigate]);

    return (
        <Container fluid>
            <Grid container>
                <Grid item sm={12}>
                    <AdminLoginForm />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminLoginScreen