import { getStepLabelUtilityClass } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null,
    status: 'idle',
    error: null,
    userAnswer: null,
    leaderboard: null
}

export const userRegister = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { name, email, regNo, dept, role, password } = userData

        if ((password) && (role === "admin")) {
            const { data } = await axios.post('/api/user/alogin', { regNo, password }, config)
            return data
        } else {
            const { data } = await axios.post('/api/user/register', { name, email, regNo, dept, role }, config)
            return data
        }

    } catch (error) {
        return error.message
    }
})

export const checkSubmission = createAsyncThunk('/user/checkSubmission', async (answers, thunkAPI) => {
    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const { data } = await axios.get('/api/user/checkSubmission', {
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

export const getLeaderBoard = createAsyncThunk('/user/leaderBoard', async (answers, thunkAPI) => {
    var { user: { value } } = thunkAPI.getState()
    var userInfo = value.token

    const { data } = await axios.get('/api/user/leaderboard', {
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("userInfo");
            state.value = null
            state.status = "idle"
        }
    },
    extraReducers(builder) {
        builder.addCase(userRegister.pending, (state, action) => {
            state.status = "loading"
        }).addCase(userRegister.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.value = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }).addCase(userRegister.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }).addCase(checkSubmission.pending, (state, action) => {
            state.status = "loading"
        }).addCase(checkSubmission.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.userAnswer = action.payload
        }).addCase(checkSubmission.rejected, (state, action) => {
            state.status = "failed"
        }).addCase(getLeaderBoard.pending, (state, action) => {
            state.status = "loading"
        }).addCase(getLeaderBoard.fulfilled, (state, action) => {
            state.status = "fullfilled"
            state.leaderboard = action.payload
        }).addCase(getLeaderBoard.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const userRegisterError = (state) => state.user.error;

export const userAnswer = ((state) => state.user.userAnswer)
export const userInfo = ((state) => state.user.value)

export const { register, logout } = userSlice.actions


export default userSlice.reducer