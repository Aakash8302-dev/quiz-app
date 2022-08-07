import React from 'react';
import { Paper, Typography, Box } from "@mui/material"
import { CheckCircle, Cancel, Error } from '@mui/icons-material';

const classes = {
    root: {
        margin: ' 3rem 0',
        padding: '1.5rem',
    },
    options: {
        margin: '0.8rem 0',
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
        backgroundColor: '#ededed',
    },

    wrongOption: {
        backgroundColor: 'rgb(211,47,47, 0.7)',
        margin: '0.8rem 0',
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
    },

    correctOption: {
        backgroundColor: 'rgb(56, 142, 60, 0.6)',
        margin: '0.8rem 0',
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
    },

    icon: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        margin: '1rem 0 0 0',
    },

    correctColor: {
        color: 'rgb(56, 142, 60)',
    },

    incorrectColor: {
        color: 'rgb(211,47,47)',
    },
    unattemptedColor: {
        color: 'rgb(245, 124, 0)',
    },
};

const AnswerKeyCard = ({
    answers: { questionTitle, options, correctAnswer, userAnswer },
}) => {

    const correctIcon = (
        <Box sx={{ ...classes.icon }}>
            <CheckCircle sx={{ ...classes.correctColor }} />
            <Typography sx={{ ...classes.correctColor }} variant='subtitle1'>
                {' '}
                Correct
            </Typography>
        </Box>
    );

    const wrongIcon = (
        <Box sx={{ ...classes.icon }}>
            <Cancel sx={{ ...classes.incorrectColor }} />
            <Typography sx={{ ...classes.incorrectColor }} variant='subtitle1'>
                {' '}
                Incorrect
            </Typography>
        </Box>
    );

    const unattemptedIcon = (
        <Box sx={{ ...classes.icon }}>
            <Error sx={{ ...classes.unattemptedColor }} />
            <Typography sx={{ ...classes.unattemptedColor }} variant='subtitle1'>
                Unattempted
            </Typography>
        </Box>
    );

    return (
        <div>
            <Paper sx={{ ...classes.root }} elevation={5}>
                <Typography variant='h6'>{questionTitle}</Typography>
                {options.map((e) => (
                    <Box
                        // sx={
                        //     correctAnswer === e.uid
                        //         ? `${classes.correctOption}`
                        //         : userAnswer !== correctAnswer && userAnswer === e.uid
                        //             ? `${classes.wrongOption}`
                        //             : `${classes.options}`
                        // }

                        sx={correctAnswer === e.uid ? { ...classes.correctOption } : (userAnswer !== correctAnswer && userAnswer === e.uid) ? { ...classes.wrongOption } : { ...classes.options }}
                    >
                        <Typography variant='caption'>{e.optionText}</Typography>
                    </Box>
                ))}
                {userAnswer === null
                    ? unattemptedIcon
                    : userAnswer === correctAnswer
                        ? correctIcon
                        : wrongIcon}
            </Paper>
        </div>
    );
};

export default AnswerKeyCard;
