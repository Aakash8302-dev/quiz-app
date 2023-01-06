import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Container,
    Button,
    Box,
    Fab,
    Modal
} from '@mui/material';
import { submitAnswers } from '../features/question';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Timer from './Timer'

const style = {
    questionNo: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '300',
        margin: '5px 0',
    },
    questionSpan: {
        fontSize: '1rem',
    },
    questionContent: {
        margin: '2rem 0',
        minHeight: '55vh',
    },
    questionText: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        margin: "0 0 1rem"
    },
    questionOptionsWrap: {
        margin: '1rem 0',
    },
    questionOption: {
        margin: '0.7rem 0',
    },
    questionFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 0 4rem 0',
    },
    stepper: {
        width: '400',
    },
    MuiMobileStepperProgress: {
        width: '100%',
    },
    PageRoot: {
        padding: "1rem 0",
        width: "100%"
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        display: 'block',
        margin: '1rem 0',
        width: '75vw',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFFF',
        border: '2px solid #FFFFF',
        borderRadius: '0.6rem',
        boxShadow: 24,
        p: 4,
        title: {
            color: '#000'
        },
        footer: {
            float: 'right',
            margin: "1.5rem 0 0"
        }
    },
    qImg: {
        width: "100px",
        height: "100px"
    },
    optionImg:{
        width: "50%",
        border: "solid 1px #000",
        marginLeft: "2rem"
    },
    section:{
        display: "flex",
        alignItems: "flex-end"
    }
};

const TestForm = ({ history, questions }) => {

    const dispatch = useDispatch();

    const endTime = useSelector((state) => state.timer.endTime)

    const [counter, setCounter] = useState(0);
    const [answers, setAnswers] = useState(questions);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [trigTimer, setTrigTimer] = useState(false)

    useEffect(() => {

        if(trigTimer){
            handleFormSubmit();
        }

    },[trigTimer])

    const handleModalkOpen = () => setOpen(true);

    const handleModalClose = () => setOpen(false);

    const handleAnswerChange = (e, i) => {
        var optionAnswer = [...answers];
        optionAnswer[i].userAnswer = e.target.value;
        setAnswers(optionAnswer);
    };

    const handleFormSubmit = async () => {
        setOpen(false);
        dispatch(submitAnswers(answers))
    };

    return (
        <Container sx={{ ...style.PageRoot }}>
            <Timer endTime={Date.parse(endTime) - Date.parse(new Date())} setTrigTimer={setTrigTimer} />
            <Modal
                open={open}
                onClose={handleModalClose}
            >
                <Box
                    sx={{ ...style.modal }}
                >
                    <Typography variant='h6' sx={{ ...style.modal.title }} >
                        Do you want to submit ?
                    </Typography>
                    <Box sx={{ ...style.modal.footer }} >
                        <Button onClick={handleModalClose}>No</Button>
                        <Button variant="contained" onClick={handleFormSubmit}>Yes</Button>
                    </Box>
                </Box>
            </Modal>
            {answers ? (
                <>
                    {answers.map((ques, i) =>
                        i === counter ? (
                            <Box>
                                <Box sx={{ ...style.header }}>
                                    <Typography sx={{ ...style.questionNo }} variant='h6'>
                                        Question {i + 1}
                                        <span sx={{ ...style.questionSpan }}>
                                            {' '}
                                            /{answers.length}
                                        </span>
                                    </Typography>
                                    <Box component='div' sx={{...style.section}}>
                                        <Typography variant='subtitle1'>{`SECTION`}</Typography>
                                        <Typography sx={{margin: '0 0 0 10px'}} variant='h6'>{ques.questionCategory.toUpperCase()}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ ...style.questionContent }}>
                                    <Typography sx={{ ...style.questionText }} variant='h5'>
                                        <pre>{ques.questionTitle}</pre>
                                    </Typography>
                                    {ques.imageUrl && (
                                        <img
                                            src={ques.imageUrl}
                                            alt={ques.imageUrl}
                                            width={"100%"}
                                        />
                                    )}
                                    <FormControl sx={{ ...style.questionOptionsWrap }}>
                                        <RadioGroup
                                            value={ques.userAnswer}
                                            onChange={(e) => handleAnswerChange(e, i)}
                                            sx={{ ...style.questionOption }}
                                        >
                                            {ques.options.map((op, j) => (
                                                <>
                                                    <FormControlLabel
                                                    value={op.uid}
                                                    control={<Radio color='primary' />}
                                                    label={op.optionText}
                                                    sx={{ ...style.questionOption }}
                                                    />
                                                    {
                                                        (op.optionImage) ? <Box>
                                                        <img src={op.optionImage} alt={op.optionImage} style={{...style.optionImg}} />
                                                        </Box> :  <Box></Box>
                                                    }
                                    
                                                </>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Box>
                        ) : (
                            ''
                        )
                    )}

                    <Box sx={{ ...style.questionFooter }}>
                        <Fab
                            disabled={counter <= 0}
                            onClick={() => {
                                setCounter(counter - 1);
                                setActiveStep(activeStep - 1);
                            }}
                        >
                            <ArrowBack />
                        </Fab>
                        {answers.length === counter + 1 ? (
                            <Button variant='contained' onClick={handleModalkOpen}>
                                Submit
                            </Button>
                        ) : null}

                        <Fab
                            disabled={counter >= answers.length - 1}
                            onClick={() => {
                                setCounter(counter + 1);
                                setActiveStep(activeStep + 1);
                            }}
                        >
                            <ArrowForward />
                        </Fab>
                    </Box>
                </>
            ) : (
                ''
            )}
        </Container>
    );
};

export default TestForm;
