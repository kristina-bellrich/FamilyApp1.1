import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, deleteTodo, editTodo, getAllTodo } from '../todo/FetchTodo';


const initialState = {
    todos: [],
    status: 'idle',
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await getAllTodo();
    return response;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (title) => {
    const response = await addTodo(title);
    return response;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title }) => {
    const response = await editTodo(id, title);
    return { id, title };
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
    await deleteTodo(id);
    return id;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const { id, title } = action.payload;
                const existingTodo = state.todos.find((todo) => todo._id === id);
                if (existingTodo) {
                    existingTodo.title = title;
                }
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo._id !== action.payload);
            });
    },
});

export default todosSlice.reducer;
