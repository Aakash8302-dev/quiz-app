import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import {
    Container,
    Box,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getLeaderBoard } from '../features/user'
import { allBranches, headers } from '../data'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import {CSVLink} from 'react-csv'


const style = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    title: {
        margin: '1rem 0',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5rem 0',
    },
    table: {
        width: '100vw',
    },
    th: {
        padding: '1rem 2rem',
        textAlign: 'center',
    },
    textField: {
        width: '15rem',
        margin: '0',
    },
    select: {
        marginTop: "10px",
        width: '15rem'
    },
    headerWrap:{
        display: "flex",
        alignItems: "center"
    },
    dwBtn:{
        margin: "0 1rem"
    }
}


const LeaderBoardScreen = () => {

    const dispatch = useDispatch();

    const [department, setDepartment] = useState("All")
    const [filteredLeaderboard, setFilteredLeaderboard] = useState([])

    const leaderboardInfo = useSelector((state) => state.user.leaderboard);
    const leaderBoardStatus = useSelector((state) => state.user.status)

    useEffect(() => {
        dispatch(getLeaderBoard());
        setDepartment("All");
    }, [])

    useEffect(() => {
        if (department === 'All') {
            if (leaderboardInfo != null)
                setFilteredLeaderboard([...leaderboardInfo]);
        } else {
            let result = leaderboardInfo && leaderboardInfo.filter((q) => q.dept === department);
            setFilteredLeaderboard(result);
        }
    }, [department, leaderboardInfo])


        const csvReport = {
            filename: 'AptitudeScore.csv',
            headers: headers,
            data: filteredLeaderboard
        }


    return (
        <>
            {
                leaderBoardStatus === "loading" ? (<Loader />) : (
                    <Container>
                        <Box sx={{ ...style.header }}>
                            <Typography variant='h5' sx={{ ...style.title }}>LeaderBoard</Typography>
                            <Box sx={{...style.headerWrap}}>
                                <TextField
                                    select
                                    variant="outlined"
                                    size="small"
                                    label="Department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    sx={{ ...style.select }}
                                >
                                    {allBranches.map((e) => (
                                        <MenuItem key={e.id} value={e.value} sx={{ minWidth: 10 }} >
                                            {e.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton sx={{...style.dwBtn}}>
                                    <CSVLink {...csvReport}>
                                        <CloudDownloadOutlinedIcon fontSize="small" />
                                    </CSVLink>
                                </IconButton>
                            </Box>
                        </Box>
                        <Grid item>
                            <Paper sx={{ ...style.root }} >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>s.no</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Register No</TableCell>
                                            <TableCell>Dept</TableCell>
                                            <TableCell>Total Score</TableCell>
                                            <TableCell>Aptitude</TableCell>
                                            <TableCell>Verbal</TableCell>
                                            <TableCell>Coding</TableCell>
                                            <TableCell>Core</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredLeaderboard &&
                                            filteredLeaderboard.map((ele, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{`${ele.firstName.toUpperCase()} ${ele.lastName.toUpperCase()}`}</TableCell>
                                                    <TableCell>{ele.regNo}</TableCell>
                                                    <TableCell>{ele.dept}</TableCell>
                                                    <TableCell>{ele.totalScore}</TableCell>
                                                    <TableCell>{ele.aptitudeScore}</TableCell>
                                                    <TableCell>{ele.verbalScore}</TableCell>
                                                    <TableCell>{ele.codingScore}</TableCell>
                                                    <TableCell>{ele.coreScore}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Container>
                )
            }
        </>
    )
}

export default LeaderBoardScreen