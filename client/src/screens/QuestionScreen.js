import React, { useEffect, useState } from 'react'
import { Container, Paper, Box, Typography, TextField, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../features/question'
import { fontWeight } from '@mui/system'
import { commonCategory } from '../data'
import Loader from '../components/Loader'

const styles = {
    questionBox: {
        padding: "1rem"
    },
    category: {
        fontSize: "0.9rem",
        fontWeight: "bold"
    },
    footer: {
        textAlign: "right"
    },
    department: {
        fontSize: "0.9rem",
    },
    header: {
        margin: "1rem 0 2rem 0"
    }
}


const QuestionScreen = () => {

    const dispatch = useDispatch();

    const [filteredQuestion, setFilteredQuestions] = useState([]);
    const [qCategory, setQCatergory] = useState("Core")

    const allQuestions = useSelector((state) => state.question.allQuestions)
    const allQuestionStatus = useSelector((state) => state.question.status)

    useEffect(() => {
        dispatch(getAllQuestions());
    }, [])

    useEffect(() => {
        if (allQuestions && allQuestions.length > 0) {
            let result = allQuestions.filter((q) => q.questionCategory === qCategory)
            setFilteredQuestions(result)
        }
    }, [qCategory])

    return (
        <Container>
            <Box sx={{ ...styles.header }}>
                <TextField
                    select
                    variant="outlined"
                    size="small"
                    label="Category"
                    value={qCategory}
                    onChange={(e) => setQCatergory(e.target.value)}
                    sx={{ width: "8rem" }}
                >
                    {commonCategory.map((e) => (
                        <MenuItem key={e.id} value={e.value} sx={{ minWidth: 10 }} >
                            {e.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            {allQuestionStatus === "loading" ? (<Loader />) : (
                filteredQuestion.map((e, index) => (
                    <Paper elevation={3} key={index} sx={{ margin: "0.5rem 0" }}>
                        <Box sx={{ ...styles.questionBox }}>
                            <Typography variant='h6'>{e.questionTitle}</Typography>
                            <Box sx={{ ...styles.footer }}>
                                {
                                    e.questionCategory === "Core" ? (
                                        <>
                                            <Typography sx={{ ...styles.department }}>{e.questionDept}</Typography>
                                            <Typography sx={{ ...styles.category }}>{e.questionCategory}</Typography>
                                        </>
                                    ) : (
                                        <Typography sx={{ ...styles.category }}>{e.questionCategory.toUpperCase()}</Typography>
                                    )
                                }
                            </Box>
                        </Box>
                    </Paper>
                ))
            )
            }
        </Container>
    )
}

export default QuestionScreen