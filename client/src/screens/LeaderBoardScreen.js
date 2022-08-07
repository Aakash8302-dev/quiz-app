import React, { useEffect, useState } from 'react'
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
import { getLeaderBoard } from '../features/user'
import axios from 'axios'
import { allBranches } from '../data'

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
    }
}


const LeaderBoardScreen = () => {

    const dispatch = useDispatch();

    const [department, setDepartment] = useState("")

    const leaderboardInfo = useSelector((state) => state.user.leaderboard)
    var filteredLeaderboard

    useEffect(() => {
        dispatch(getLeaderBoard());
    }, [])

    if (department === 'All') {
        filteredLeaderboard = leaderboardInfo;
    } else {
        filteredLeaderboard = leaderboardInfo && leaderboardInfo.filter((q) => q.dept === department);
    }

    return (
        <Container>
            <Box sx={{ ...style.header }}>
                <Typography variant='h5' sx={{ ...style.title }}>LeaderBoard</Typography>
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
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{ele.name}</TableCell>
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

export default LeaderBoardScreen