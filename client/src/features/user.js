import { getStepLabelUtilityClass } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null,
    status: 'idle',
    error: null
}

export const userRegister = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { name, email, regNo, dept, role } = userData

        const { data } = await axios.post('/api/user/register', { name, email, regNo, dept, role }, config)

        return data

    } catch (error) {
        return error.message
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
        })
    }
})

export const userRegisterStatus = (state) => state.user.value;
export const userRegisterError = (state) => state.user.error;

export const { register, logout } = userSlice.actions


export default userSlice.reducer