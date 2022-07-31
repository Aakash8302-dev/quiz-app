import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    question: null,
    status: "idle",
    error: null,
    testQuestions: null,
    answer: null
}

export const createQuestion = createAsyncThunk('/question/create', async (question, thunkAPI) => {


    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const {
        questionDept,
        questionSet,
        questionTitle,
        questionCategory,
        options,
        correctAnswer,
        imageUrl
    } = question

    const { data } = await axios.post('/api/question/create', { questionDept, questionSet, questionTitle, questionCategory, options, correctAnswer, imageUrl }, {
        headers: {
            Authorization: `Bearer ${userInfo}`,
        },
    })

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }
})

export const submitAnswers = createAsyncThunk('/question/submit', async (answers, thunkAPI) => {


    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const { data } = await axios.post('/api/question/submit', { answers }, {
        headers: {
            Authorization: `Bearer ${userInfo}`,
        },
    })

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }

})



export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createQuestion.pending, (state, action) => {
            state.status = "loading"
        }).addCase(createQuestion.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.question = action.payload
        }).addCase(createQuestion.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }).addCase(submitAnswers.pending, (state, action) => {
            state.status = "loading"
        }).addCase(submitAnswers.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.answer = action.payload
        }).addCase(submitAnswers.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }


})

export default questionSlice.reducer