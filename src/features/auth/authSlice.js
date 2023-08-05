import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get User Details if exists, from Local Storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const registerUser = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        return await authService.register(user);
    } catch(err) {
        const errMsg = (err?.res?.data?.message || err.message || err.toString());
        return thunkApi.rejectWithValue(errMsg); 
    }
});

export const loginUser = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        return await authService.login(user);
    } catch(err) {
        const errMsg = (err?.res?.data?.message || err.message || err.toString());
        return thunkApi.rejectWithValue(errMsg); 
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => state = initialState
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, state => { state.isLoading = true })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(loginUser.pending, state => { state.isLoading = true })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(logoutUser.fulfilled, state => { state.user = null})
        .addCase(logoutUser.rejected, action => console.log(action.payload))
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;