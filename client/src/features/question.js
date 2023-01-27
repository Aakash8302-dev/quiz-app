import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    question: null,
    status: "idle",
    error: null,
    testQuestions: null,
    answer: null,
    allQuestions: null,
    submitStatus: null,
    createStatus: "idle"
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

    console.log(imageUrl);


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

export const submitAnswers = createAsyncThunk('/question/submit', async ({answers,count}, thunkAPI) => {

    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const { data } = await axios.post('/api/question/submit', { answers,count }, {
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

export const getAllQuestions = createAsyncThunk("/question/allQuestions", async (answers, thunkAPI) => {
    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const { data } = await axios.get('/api/question/all', {
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
            state.createStatus = "succeeded"
            state.question = action.payload
        }).addCase(createQuestion.rejected, (state, action) => {
            state.status = "failed"
            state.createStatus = "failed"
            state.error = action.error.message
        }).addCase(submitAnswers.pending, (state, action) => {
            state.status = "loading"
            state.submitStatus = null
            state.error = null
        }).addCase(submitAnswers.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.submitStatus = "succeeded"
            state.answer = action.payload
        }).addCase(submitAnswers.rejected, (state, action) => {
            state.status = "succeeded"
            state.submitStatus = "failed"
            state.error = action.error.message
        }).addCase(getAllQuestions.pending, (state, action) => {
            state.status = "loading"
        }).addCase(getAllQuestions.fulfilled, (state, action) => {
            state.allQuestions = action.payload
            state.status = "succeeded"
        }).addCase(getAllQuestions.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }


})

export default questionSlice.reducer