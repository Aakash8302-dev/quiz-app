import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    makeStyles,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
    MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getLeaderBoard } from '../actions/adminActions';
import Loader from '../components/Loader';
import { allBranches } from '../data';

const useStyles = makeStyles({
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
});

const LeaderBoard = () => {
    const [department, setDepartment] = useState("All");

    const leaderboard = useSelector((state) => state.user.leaderboard);
    const loading = useSelector((state) => state.user.status)

    var filteredLeaderboard;

    const dispatch = useDispatch();

    useEffect(() => {
        alert();
        dispatch(getLeaderBoard());
        setDepartment("All")
    }, []);


    useEffect(() => {

        console.log(department)

        if (department === 'All') {
            filteredLeaderboard = leaderboard;
        } else {
            filteredLeaderboard =
                leaderboard && leaderboard.filter((q) => q.dept === department);
        }
    }, [department, leaderboard])





    const classes = useStyles();

    return (
        <Container>
            {loading && <Loader />}
            <div className={classes.header}>
                <Typography variant='h5' className={classes.title}>
                    LeaderBoardssss
                </Typography>
                <TextField
                    select
                    variant='filled'
                    size='small'
                    className={classes.textField}
                    label='Department'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {allBranches.map((e) => (
                        <MenuItem key={e.id} value={e.value}>
                            {e.value}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Grid container>
                <Paper className={classes.root}>
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
    );
};

export default LeaderBoard;
