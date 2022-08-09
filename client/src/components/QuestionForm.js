import React from 'react'
import { TextField, Paper, MenuItem, RadioGroup, FormControlLabel, Button, IconButton, Radio, Box } from '@mui/material'
import { Delete, Cancel } from '@mui/icons-material';
import { Form, useForm } from './useForm'
import { commonCategory, specificCategory, allBranches, qSetValue } from '../data';


const style = {
    root: {
        margin: '2rem',
        width: '80vw',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    question: {
        margin: '0.5rem 0',
        width: '93%',
    },
    questionWrap: {
        display: 'flex',
        alignItems: 'center',
    },
    option: {
        display: 'flex',
        margin: '0.8rem 0',
        alignItems: 'center',
    },
    btn: {
        fontFamily: "'Andada Pro', serif",
        fontWeight: '500',
        width: '8rem',
    },
    imageBtn: {
        padding: '0.95rem 0',
        margin: '0 0 0 0.5rem',
    },
    previewImage: {
        width: '80px',
        height: '56.4px',
        borderRadius: '6px',
        margin: '0 0 0 8px',
    },
    trashBtn: {
        float: 'right',
    },
    fieldBranch: {
        margin: '0.5rem 0',
    },
    formWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtn: {
        textAlign: "center",
        backgroundColor: "#000",
        padding: "0.7rem 2rem"
    }
};

const initialValues = {
    qDept: '',
    qCategory: '',
    question: '',
    optionValue: ''
}

const QuestionForm = ({
    changeDeptValue,
    changeQuestionCategoryValue,
    changeQuestion,
    changeQuestionSetValue,
    changeOptionValue,
    removeOption,
    addOption,
    handleSubmit,
    questions,
    deleteQuestion,
    handleCorrectAnswer,
    changeImageUrl, }) => {


    return questions.map((ques, i) => (
        <Form onSubmit={handleSubmit} sx={{ ...style.formWrap }} >
            <Paper
                sx={{ ...style.root }}
                elevation={2}>
                <TextField
                    select
                    name="qDept"
                    variant='outlined'
                    sx={{ ...style.fieldBranch }}
                    label='Select Question Branch'
                    value={ques.questionDept}
                    onChange={(e) => changeDeptValue(e.target.value, i)}
                >
                    {allBranches.map((e) => (
                        <MenuItem key={e.id} value={e.value}>
                            {e.value}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    name="qCategory"
                    variant='outlined'
                    required={true}
                    sx={{ ...style.fieldBranch }}
                    label='Question Category'
                    value={ques.questionCategory}
                    onChange={(e) => changeQuestionCategoryValue(e.target.value, i)}
                >
                    {ques.questionDept === 'All'
                        ? commonCategory.map((e) => (
                            <MenuItem key={e.id} value={e.value} disabled={e.disabled}>
                                {e.value}
                            </MenuItem>
                        ))
                        : specificCategory.map((e) => (
                            <MenuItem key={e.id} value={e.value} disabled={e.disabled}>
                                {e.value}
                            </MenuItem>
                        ))}
                </TextField>
                <TextField
                    select
                    name="questionSet"
                    variant="outlined"
                    label="Question Set"
                    value={ques.questionSet}
                    onChange={(e) => changeQuestionSetValue(e.target.value, i)}
                >
                    {qSetValue.map((e) => (
                        <MenuItem key={e.id} value={e.value}>
                            {e.value}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{ ...style.questionWrap }} >
                    <TextField
                        name="question"
                        sx={{ ...style.question }}
                        id='outlined-with-placeholder'
                        value={ques.questionText}
                        variant='outlined'
                        required={true}
                        label='Question'
                        placeholder='Enter your Question'
                        onChange={(e) => changeQuestion(e.target.value, i)}
                    />
                    <TextField
                        name="imgUrl"
                        sx={{ ...style.previewImage }}
                        variant='outlined'
                        label='URL'
                        value={ques.imageUrl}
                        onChange={(e) => changeImageUrl(e.target.value, i)}
                    />
                </Box>

                {ques.options.map((op, j) => (
                    <Box key={j} sx={{ ...style.option }}>
                        <RadioGroup
                            value={ques.correctAnswer}
                            onChange={(e) => handleCorrectAnswer(e, i)}
                        >
                            <FormControlLabel
                                value={op.uid}
                                control={<Radio color='primary' value={op.uid} />}
                            />
                        </RadioGroup>
                        <TextField
                            name="optionValue"
                            label={`Option ${j + 1}`}
                            variant='outlined'
                            required={true}
                            value={ques.options[j].optionText.text}
                            onChange={(e) => changeOptionValue(e.target.value, i, j)}
                        />
                        <IconButton onClick={() => removeOption(i, j)}>
                            <Cancel style={{ color: '#F05454' }} />
                        </IconButton>
                    </Box>
                ))}

                <Box>
                    {ques.options.length < 5 ? (
                        <Button
                            sx={{ bgcolor: '#000' }}
                            variant='contained'
                            onClick={() => addOption(i)}
                        >
                            Add Option
                        </Button>
                    ) : (
                        ''
                    )}

                    {questions.length > 1 ? (
                        <IconButton sx={{ ...style.trashBtn }} onClick={deleteQuestion}>
                            <Delete />
                        </IconButton>
                    ) : (
                        ''
                    )}
                </Box>
            </Paper>
            <Box sx={{ textAlign: "center" }}>
                <Button sx={{ ...style.submitBtn }} variant="contained" type="submit">Submit</Button>
            </Box>
        </Form>
    ))
}

export default QuestionForm