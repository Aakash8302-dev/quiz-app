import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import QuestionForm from '../components/QuestionForm';
import axios from 'axios'
import { createQuestion } from '../features/question';
import Alert from '../components/Alert'


const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

const questionIntialState = {
    questionTitle: '',
    questionDept: '',
    questionSet: '',
    questionCategory: '',
    imageUrl: '',
    options: [
        {
            optionText: '',
            uid: uuidv4(),
        },
    ],
    userAnswer: null,
    correctAnswer: null,
    open: true,
    required: false,
}

const CreateScreen = () => {

    const dispatch = useDispatch();

    const createStatus = useSelector((state) => state.question.createStatus)

    const [questions, setQuestions] = useState([
        questionIntialState
    ]);
    const [notify, setNotify] = useState("");

    useEffect(() => {

        if (createStatus === "succeeded") {
            setNotify({
                isOpen: true,
                message: "Question created Successfully",
                type: "success"
            })

            setTimeout(() => {
                window.location.reload(true)
            }, 1500)

        } else if (createStatus === "failed") {
            setNotify({
                isOpen: true,
                message: "Something went wrong",
                type: "error"
            })
        }

    }, [createStatus])

    const changeQuestion = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].questionTitle = text;
        setQuestions(newQuestion);
    };

    const changeDeptValue = (text, i) => {
        var dept = [...questions];
        dept[i].questionDept = text;
        setQuestions(dept);
    };

    const changeQuestionSetValue = (text, i) => {
        var questionSet = [...questions]
        questionSet[i].questionSet = text;
        setQuestions(questionSet);
    }

    const changeQuestionCategoryValue = (text, i) => {
        var questionCat = [...questions];
        questionCat[i].questionCategory = text;
        setQuestions(questionCat);
    };

    const changeOptionValue = (text, i, j) => {
        var optionsQuestion = [...questions];
        optionsQuestion[i].options[j].optionText = text;
        setQuestions(optionsQuestion);
    };

    const changeImageUrl = (url, i) => {
        var image = [...questions];
        image[i].imageUrl = url;
        setQuestions(image);
    };

    const removeOption = (i, j) => {
        var removeOptionQuestion = [...questions];
        if (removeOptionQuestion[i].options.length > 1) {
            removeOptionQuestion[i].options.splice(j, 1);
            setQuestions(removeOptionQuestion);
        }
    };

    const addOption = (i) => {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({
                optionText: 'Option' + (optionsOfQuestion[i].options.length + 1),
                uid: uuidv4(),
            });
        } else {
            console.log('Max 5 Options');
        }

        setQuestions(optionsOfQuestion);
    };

    const addMoreQuestionField = () => {
        setQuestions([
            ...questions,
            {
                questionTitle: 'question',
                questionDept: '',
                questionType: 'radio',
                options: [
                    { optionText: { text: 'Option 1', asnswer: false }, uid: uuidv4() },
                ],
                correctAnswer: null,
                open: true,
                required: false,
            },
        ]);
    };

    const deleteQuestion = (i) => {
        let qs = [...questions];
        if (questions.length > 1) {
            qs.splice(i, 1);
        }
        setQuestions(qs);
    };

    const handleCorrectAnswer = (e, i) => {
        var optionCorrectAnswer = [...questions];
        optionCorrectAnswer[i].correctAnswer = e.target.value;
        setQuestions(optionCorrectAnswer);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const question = questions[0];

        dispatch(createQuestion(question))
    }

    return (
        <Box sx={{ ...style.root }} >
            <Alert notify={notify} setNotify={setNotify} />
            <QuestionForm
                changeQuestion={changeQuestion}
                changeDeptValue={changeDeptValue}
                changeQuestionCategoryValue={changeQuestionCategoryValue}
                changeQuestionSetValue={changeQuestionSetValue}
                changeOptionValue={changeOptionValue}
                removeOption={removeOption}
                addOption={addOption}
                handleSubmit={handleSubmit}
                questions={questions}
                setQuestions={setQuestions}
                deleteQuestion={deleteQuestion}
                handleCorrectAnswer={handleCorrectAnswer}
                changeImageUrl={changeImageUrl}
            />
        </Box>
    )
}

export default CreateScreen