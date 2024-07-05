
import axios from 'axios';

const API_URL = 'https://expense-tracker-yuh3.onrender.com/';

const getAllExpense = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addExpenses = async (selectedDate, selectedType, amount) => {
    const response = await axios.post(`${API_URL}/save`, {
        selectedDate,
        selectedType,
        amount,
    });
    return response.data;
};

const editExpenses = async (idExpenses, selectedDate, selectedType, amount) => {
    const response = await axios.post(`${API_URL}/edit`, {
        _id: idExpenses,
        selectedDate,
        selectedType,
        amount,
    });
    return response.data;
};

const deleteExpenses = async (idExpenses) => {
    const response = await axios.post(`${API_URL}/delete`, {_id: idExpenses});
    return response.data;
};

export {getAllExpense, addExpenses, editExpenses, deleteExpenses};
