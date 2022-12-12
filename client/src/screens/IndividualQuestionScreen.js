import React, { useState, useEffect } from 'react';
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
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../features/question'

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
        display: "flex"
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
        width: "100%",
        border: "solid 1px #000",
        marginLeft: "3rem",
        marginBottom: "2rem"
    },
    section:{
        display: "flex",
        alignItems: "flex-end"
    }
};

const IndividualQuestionScreen = () => {

    const dispatch = useDispatch();

    const currpath = window.location.search;
    const value = currpath.split("&");
    const values = []
    value.map(val => values.push(val.split("=")[1] ))

    var id = values[1] && values[1];

    const allQuestions = useSelector((state) => state.question.allQuestions);
    const answer = allQuestions && allQuestions.filter((e) => e._id === id)

    useEffect(() => {
        dispatch(getAllQuestions());
    },[])

    const [counter, setCounter] = useState(0);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);


    const handleFormSubmit = async () => {
        setOpen(false);
    };

    return (
        <Container sx={{ ...style.PageRoot }}>
            {answer ? (
                <>
                    {answer.map((ques, i) =>
                        i === counter ? (
                            <Box>
                                <Box sx={{ ...style.header }}>
                                    <Typography sx={{ ...style.questionNo }} variant='h6'>
                                        Question {i + 1}
                                        <span sx={{ ...style.questionSpan }}>
                                            {' '}
                                            /{answer.length}
                                        </span>
                                    </Typography>
                                    <Box component='div' sx={{...style.section}}>
                                        <Typography variant='subtitle1'>{`SECTION`}</Typography>
                                        <Typography sx={{margin: '0 0 0 10px'}} variant='h6'>{ques.questionCategory.toUpperCase()}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ ...style.questionContent }}>
                                    <Typography sx={{ ...style.questionText }} variant='h5'>
                                        {ques.questionTitle}
                                    </Typography>
                                    {ques.imageUrl && (
                                        <img
                                            src={ques.imageUrl}
                                            alt={ques.imageUrl}
                                            style={{display: "block"}}
                                        />
                                    )}
                                    <FormControl sx={{ ...style.questionOptionsWrap }}>
                                        <RadioGroup
                                            value={ques.correctAnswer}
                                            sx={{ ...style.questionOption }}
                                        >
                                            {ques.options.map((op, j) => (
                                                <>
                                                    <div>
                                                    <FormControlLabel
                                                    value={op.uid}
                                                    control={<Radio color='primary' />}
                                                    label={op.optionText}
                                                    sx={{ ...style.questionOption }}
                                                    />
                                                    </div>
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
                        {answer.length === counter + 1 ? (
                            <Button variant='contained'>
                                Submit
                            </Button>
                        ) : null}

                        <Fab
                            disabled={counter >= answer.length - 1}
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

export default IndividualQuestionScreen;
