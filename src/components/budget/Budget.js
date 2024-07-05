import React, {useEffect, useState} from 'react';
import {
    addExpenses,
    deleteExpenses,
    editExpenses,
    getAllExpense,
} from './FetchBudget';
import {EachBudget} from './EachBudget';
import Swal from 'sweetalert2';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';

const Budget = () => {
    // const [myExpenses, setMyExpenses] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [amount, setAmount] = useState('');
    const [idExpenses, setIdExpenses] = useState('');
    const [editing1, setEditing1] = useState(false);

    const {isAuthenticated} = useAuth0();

    const expenseTypes = [
        'All',
        'Food',
        'Housing',
        'Transport',
        'Free time',
        'Health',
        'Clothing',
        'Other',
    ];

    useEffect(() => {
        getAllExpense(setExpenses);
    }, []);



    useEffect(() => {
        const handleAuthentication = async () => {
            try {
                if (isAuthenticated) {
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        handleAuthentication();
    }, [isAuthenticated]);

    const updatingInInput = (_id, selectedDate, selectedType, amount) => {
        setSelectedDate(selectedDate);
        setSelectedType(selectedType);
        setAmount(amount);
        setIdExpenses(_id);
        setEditing1(true);
    };

    const addExpense = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `New expense added`,
            showConfirmButton: false,
            timer: 1500,
        });
        addExpenses(
            setExpenses,
            selectedDate,
            setSelectedDate,
            selectedType,
            setSelectedType,
            amount,
            setAmount,
        );
        const newExpense = {
            date: selectedDate,
            selectedType: selectedType,
            amount: parseFloat(amount),
        };
        setExpenses([...expenses, newExpense]);
        filterExpensesByType(...expenses, newExpense);
    };

    const editMyDate = () => {
        editExpenses(
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
        );
    };

    const filterExpensesByType = () => {
        return expenses
            .filter(
                (expense) =>
                    selectedType === 'All' ||
                    expense.selectedType === selectedType,
            )
            .sort(
                (a, b) => new Date(a.selectedDate) - new Date(b.selectedDate),
            );
    };

    const getTotalAmount = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const changeDate = (e) => {
        let value = e.target.value;
        let newValue = value.split(' ')[0];
        setSelectedDate(newValue);
    };

    const getTotalAmountByType = (expenseType) => {
        const filteredExpenses = expenses.filter(
            (expense) =>
                expenseType === 'All' || expense.selectedType === expenseType,
        );
        return filteredExpenses.reduce(
            (total, expense) => total + expense.amount,
            0,
        );
    };
    const totalAmountForFilteredType = getTotalAmountByType(selectedType);


    return (
        <div className='expensesContainer'>
            {isAuthenticated ? (
            <div className='budgetContainer'>
                <h1 className='headerExpenses'>Expense Tracker</h1>
                <input
                    className='inputExpenses'
                    type='date'
                    placeholderText='Enter A Date'
                    value={selectedDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={changeDate}
                />
                <select
                    className='inputExpenses'
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {expenseTypes.map((selectedType, index) => (
                        <option key={index} value={selectedType}>
                            {selectedType}
                        </option>
                    ))}
                </select>
                <input
                    className='inputExpenses'
                    type='number'
                    placeholder='Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className='addDate'
                    disabled={!amount}
                    onClick={editing1 ? () => editMyDate() : () => addExpense()}
                >
                    {editing1 ? 'EDIT' : 'ADD'}
                </button>

                <div>
                    {expenseTypes.map((type, index) => (
                        <button
                            className='btnFilter'
                            key={index}
                            onClick={() => setSelectedType(type)}
                            style={{margin: '5px'}}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className='containerWithExpenses'>
                    {filterExpensesByType().length > 0 &&

                        filterExpensesByType().map((expense, index) => (
                            <EachBudget
                                key={index}
                                selectedDate={expense.selectedDate}
                                selectedType={expense.selectedType}
                                amount={expense.amount}
                                deleteExpenses={() =>
                                    deleteExpenses(expense._id, setExpenses)
                                }
                                updatingInInput={() =>
                                    updatingInInput(
                                        expense._id,
                                        expense.selectedDate,
                                        expense.selectedType,
                                        expense.amount,
                                    )
                                }
                            />
                        ))
                   }
                </div>

                <p className='total'>
                    {selectedType !== 'All' &&
                        `Sum for "${selectedType}": ${totalAmountForFilteredType} €`}
                </p>

                <p className='total'>Total: ${getTotalAmount()}</p>
            </div>
            ) : (
            <div className='loginExpenses'>
                <p className='appDescription'>
                    Hier you can track your family expenses
                </p>
                <div className='mr-top'>
                    <LoginButton />
                </div>
            </div>
            )}
        </div>
    );
};

export default Budget;
