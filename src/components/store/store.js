
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';
import expensesReducer from './budgetSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer
    },
});
