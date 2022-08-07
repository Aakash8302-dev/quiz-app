import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Button,
    Typography,
    IconButton,
    Toolbar,
    List,
    ListItem,
    ListItemText,
    Drawer,
    Menu,
    MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { logout } from '../features/user';
import logo from '../images/forese-white.png';

const classes = {
    root: {
        flexGrow: 1,
    },
    headerTitle: {
        flexGrow: 1,
    },
    userTitle: {
        marginLeft: "auto"
    },
    listItem: {
        fontWeight: '900',
    },
    appBar: {
        backgroundColor: '#000000',
    },
    menuButton: {
        marginLeft: 0,
        marginRight: 20,
    },
    fullList: {
        width: 'auto',
    },
    logo: {
        width: '80px',
        padding: '8px 0',
    },
};

const Header = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.value)


    const [state, setState] = useState({ bottom: false });
    const [anchorEl, setAnchorE1] = useState(null);

    const adminInfo = null

    const isMenuOpen = Boolean(anchorEl);

    const toggleDrawer = (side, open) => () => {
        setState({
            [side]: open,
        });
    };

    const handleMenuClose = () => {
        setAnchorE1(null);
    };

    const handleProfileMenuOpen = (e) => {
        setAnchorE1(e.currentTarget);
    };

    const handleProfileLogout = () => {
        dispatch(logout())
        setAnchorE1(null);
    };

    const sideVolunteerList = (
        <Box>
            <List>
                <ListItem button onClick={() => navigate('/volunteer/create')}>
                    <ListItemText>Create</ListItemText>
                </ListItem>
                <ListItem button onClick={() => navigate('/volunteer/profile')}>
                    <ListItemText>Profile</ListItemText>
                </ListItem>
            </List>
        </Box>
    );

    const sideAdminList = (
        <div>
            <List>
                <ListItem button onClick={() => navigate('/admin?screen=a1')}>
                    <ListItemText>Profile</ListItemText>
                </ListItem>
                <ListItem button onClick={() => navigate('/admin?screen=a2')}>
                    <ListItemText>Create</ListItemText>
                </ListItem>
                <ListItem button onClick={() => navigate('/admin?screen=a3')}>
                    <ListItemText>Questions</ListItemText>
                </ListItem>
                <ListItem button onClick={() => navigate('/admin?screen=a4')}>
                    <ListItemText>LeaderBoard</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            style={{ top: '2.1rem' }}
        >
            <MenuItem onClick={handleMenuClose}>
                {userInfo && userInfo.regNo}
            </MenuItem>
            <MenuItem onClick={handleProfileLogout}>Logout</MenuItem>
        </Menu>
    );

    const renderAdminMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            style={{ top: '2.1rem' }}
        >
            <MenuItem onClick={handleMenuClose}>
                {adminInfo && adminInfo.email}
            </MenuItem>
            <MenuItem onClick={handleProfileLogout}>Logout</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ ...classes.root }}>
            <AppBar position='static' sx={{ ...classes.appBar }}>
                <Toolbar>
                    {(userInfo && userInfo.role === "admin") ? (
                        <IconButton
                            sx={{ ...classes.menuButton }}
                            color='inherit'
                            aria-label='Menu'
                            onClick={toggleDrawer('bottom', true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Typography
                            sx={{ ...classes.headerTitle }}
                            variant='h6'
                            color='inherit'
                        >
                            <Box component="img" sx={{ width: "80px", padding: "5px 0", }} src={logo} alt='logo' />

                        </Typography>
                    )}
                    {userInfo && userInfo.token ? (
                        <Box sx={{ ...classes.userTitle }}>
                            <Button color='inherit'>
                                {(userInfo && userInfo.name)}
                            </Button>
                            <IconButton color='inherit' onClick={handleProfileMenuOpen}>
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    ) : (
                        ''
                    )}
                </Toolbar>
                {userInfo ? renderMenu : adminInfo ? renderAdminMenu : null}
            </AppBar>
            <Drawer
                anchor='bottom'
                open={state.bottom}
                onClose={toggleDrawer('bottom', false)}
            >
                <div
                    tabIndex={0}
                    role='button'
                    onClick={toggleDrawer('bottom', false)}
                    onKeyDown={toggleDrawer('bottom', false)}
                >
                    {userInfo ? sideAdminList : null}
                </div>
            </Drawer>
        </Box>
    );
};

export default Header;
