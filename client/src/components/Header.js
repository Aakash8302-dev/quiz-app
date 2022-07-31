import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../features/user'

const Header = () => {

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.value);

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#000" }} >
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FORESE
                    </Typography>
                    {
                        userInfo ? <Button color="inherit" onClick={handleLogout} >logout</Button> : <Button color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header