import axios from 'axios';

//get all todo from API and display it
const getAllTodo = (setTodo) => {
    axios.get('https://todobackend-ekl7.onrender.com').then(({data}) => {
    setTodo(data);
    });
};

//say to add new Todo and display what was before
const addTodo = (title, setTitle, setTodo) => {
    axios.post(`https://todobackend-ekl7.onrender.com/saveTodo`, {title}).then(() => {
        //after push ADD empty inputs and update all list
        setTitle('');
        getAllTodo(setTodo);
    });
};

const editTodo = (todoId, title, setTodo, setTitle, setEditing1) => {
    axios
        .post(`https://todobackend-ekl7.onrender.com/editTodo`, {_id: todoId, title})
        .then(() => {
            setTitle('');
            setEditing1(false);
            getAllTodo(setTodo);
        });
};


const deleteTodo = (_id, setTodo) => {
    axios.post(`https://todobackend-ekl7.onrender.com/deleteTodo`, {_id}).then(() => {
        getAllTodo(setTodo);
    });
};

export {getAllTodo, addTodo, editTodo, deleteTodo};
