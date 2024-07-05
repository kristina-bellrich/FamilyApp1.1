import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    selectedDate: '',
    selectedType: '',
    amount: '',
    expenseTypes: ['Food', 'Transport', 'Utilities', 'Other'],
    expenses: [],
    editing1: false,
    idExpenses: '',
    status: 'idle',
    error: null,
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await axios.get('https://expense-tracker-yuh3.onrender.com/');
    return response.data;
});

export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async ({ selectedDate, selectedType, amount }) => {
        await axios.post('https://expense-tracker-yuh3.onrender.com/save', {
            selectedDate,
            selectedType,
            amount,
        });
        const response = await axios.get('https://expense-tracker-yuh3.onrender.com/');
        return response.data;
    }
);

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (_id) => {
    await axios.post('https://expense-tracker-yuh3.onrender.com/deleted', { _id });
    const response = await axios.get('https://expense-tracker-yuh3.onrender.com/');
    return response.data;
});

export const editExpense = createAsyncThunk(
    'expenses/editExpense',
    async ({ idExpenses, selectedDate, selectedType, amount }) => {
        await axios.post('https://expense-tracker-yuh3.onrender.com/edit', {
            _id: idExpenses,
            selectedDate,
            selectedType,
            amount,
        });
        const response = await axios.get('https://expense-tracker-yuh3.onrender.com/');
        return response.data;
    }
);

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setEditing1: (state, action) => {
            state.editing1 = action.payload;
        },
        setIdExpenses: (state, action) => {
            state.idExpenses = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses = action.payload;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = action.payload;
            })
            .addCase(editExpense.fulfilled, (state, action) => {
                state.expenses = action.payload;
            });
    },
});

export const {
    setAuthenticated,
    setSelectedDate,
    setSelectedType,
    setAmount,
    setEditing1,
    setIdExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;
