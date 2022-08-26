import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
        status : "idle",
        error: null,
}


export const createSetting = createAsyncThunk("/setting/create", async (values, thunkAPI) => {

    const { data } = await axios.post('/api/setting/', values)

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }

})
export const getSetting = createAsyncThunk("/setting/get", async () => {

    const { data } = await axios.get('/api/setting/');

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data;
    }

})

export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createSetting.pending, (state, action) => {
            state.status = "loading"
        }).addCase(createSetting.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.showAnswer = action.payload.showAnswer
            state.instituteName = action.payload.instituteName
        }).addCase(createSetting.rejected, (state, action) => {
            state.status = "failed"
            state.error  = action.error
        }).addCase(getSetting.pending, (state,action) => {
            state.status = "loading"
        }).addCase(getSetting.fulfilled, (state,action) => {
            state.status = "succeeded"
            state.showAnswer = action.payload.showAnswer
            state.instituteName = action.payload.instituteName
        }).addCase(getSetting.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error
        })
    }

})

export default settingSlice.reducer