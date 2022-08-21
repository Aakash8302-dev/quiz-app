import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    startTime: null,
    endTime: null,
    status: "idle",
    error: null,
}


export const setTimer = createAsyncThunk("/timer/set", async (values, thunkAPI) => {

    const { data } = await axios.post('/api/timer/', values)

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }

})
export const getTimer = createAsyncThunk("/timer/get", async () => {

    const { data } = await axios.get('/api/timer/');

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data;
    }

})

export const questionSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(setTimer.pending, (state, action) => {
            state.status = "loading"
        }).addCase(setTimer.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.startTime = action.payload.startTime
            state.endTime = action.payload.endTime
        }).addCase(setTimer.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error
        }).addCase(getTimer.pending, (state, action) => {
            state.status = "loading"
        }).addCase(getTimer.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.endTime = action.payload[0].endTime
            state.startTime = action.payload[0].startTime
        }).addCase(getTimer.rejected, (state, action) => {
            state.state = "failed"
            state.error = action.error
        })
    }

})

export default questionSlice.reducer