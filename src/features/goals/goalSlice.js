import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.token;
        return await goalService.create(goalData, token);
    } catch (err) {
        const errMsg = (err?.response?.data?.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(errMsg);
    };
});

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.get(token);
    } catch (err) {
        const errMsg = (err?.response?.data?.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(errMsg);
    };
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: state => state = initialState
    },
    extraReducers: builder => {
        builder.addCase(createGoal.pending, state => state.isLoading = true)
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, state => state.isLoading = true)
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload;
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;