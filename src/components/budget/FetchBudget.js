import axios from 'axios';

const getAllExpense = (setMyExpenses) => {
    axios.get('https://expense-tracker-yuh3.onrender.com/').then(({data}) => {
        setMyExpenses(data);
    });
};

const addExpenses = (
    setExpenses,
    selectedDate,
    setSelectedDate,
    selectedType,
    setSelectedType,
    amount,
    setAmount,
) => {
    axios
        .post(`https://expense-tracker-yuh3.onrender.com/save`, {
            selectedDate,
            selectedType,
            amount,
        })
        .then(() => {
            setSelectedDate('');
            setSelectedType('');
            setAmount('');
            getAllExpense(setExpenses);
        });
};

const deleteExpenses = (_id, setExpenses) => {
    axios
        .post(`https://expense-tracker-yuh3.onrender.com/deleted`, {_id})
        .then(() => {
            getAllExpense(setExpenses);
        });
};

const editExpenses = (
    setExpenses,
    idExpenses,
    setIdExpenses,
    selectedDate,
    setSelectedDate,
    selectedType,
    setSelectedType,
    amount,
    setAmount,
    setEditing1,
) => {
    axios
        .post(`https://expense-tracker-yuh3.onrender.com/edit`, {
            _id: idExpenses,
            selectedDate,
            selectedType,
            amount,
        })
        .then(() => {
            setIdExpenses('');
            setSelectedType('');
            setAmount('');
            setSelectedDate();
            getAllExpense(setExpenses);
            setEditing1(false);
        });
};

export {getAllExpense, addExpenses, deleteExpenses, editExpenses};
