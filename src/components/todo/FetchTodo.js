import axios from 'axios';

const API_URL = 'https://todobackend-ekl7.onrender.com';

// get all todos from API
const getAllTodo = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// add a new todo
const addTodo = async (title) => {
    const response = await axios.post(`${API_URL}/saveTodo`, { title });
    return response.data;
};

// edit an existing todo
const editTodo = async (todoId, title) => {
    const response = await axios.post(`${API_URL}/editTodo`, { _id: todoId, title });
    return response.data;
};

// delete a todo
const deleteTodo = async (id) => {
    const response = await axios.post(`${API_URL}/deleteTodo`, { _id: id });
    return response.data;
};

export { getAllTodo, addTodo, editTodo, deleteTodo };
