import { useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../loaders/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';
import Swal from 'sweetalert2';
import { addNewTodo, fetchTodos, removeTodo, updateTodo } from '../store/todoSlice';

function Todo() {
    const { isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const todoStatus = useSelector((state) => state.todos.status);
    const error = useSelector((state) => state.todos.error);

    const [title, setTitle] = useState('');
    const [editing1, setEditing1] = useState(false);
    const [todoId, setTodoId] = useState('');

    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(fetchTodos());
        }
    }, [todoStatus, dispatch]);

    const updatingInInput = (id, title) => {
        setEditing1(true);
        setTitle(title);
        setTodoId(id);
    };

    const addMyTodo = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New task has been added',
            showConfirmButton: false,
            timer: 1500,
        });
        dispatch(addNewTodo(title));
        setTitle('');
    };

    const editMyTodo = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The task has been updated',
            showConfirmButton: false,
            timer: 1500,
        });
        dispatch(updateTodo({ id: todoId, title }));
        setTitle('');
        setEditing1(false);
    };

    const deleteTodo = (id) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The task has been deleted',
            showConfirmButton: false,
            timer: 1500,
        });
        dispatch(removeTodo(id));
    };

    return (
        <div className='todoList'>
            <img
                src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/35393111_2210.w046.n005.322B.p1.322.jpg?v=1705701931549'
                alt='check'
                className='iconTodo'
            />
            <div className='form'>
                <input
                    className='titleInput'
                    placeholder='What you need to do?'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                />
                <button
                    className='addDate'
                    disabled={!title}
                    onClick={editing1 ? editMyTodo : addMyTodo}
                >
                    {editing1 ? 'EDIT' : 'ADD'}
                </button>
            </div>
            {isAuthenticated ? (
                <div className='contWithAllEl'>
                    {todoStatus === 'loading' ? (
                        <div className='extraTextLoading'>
                            <p>Consider shared plans and</p>
                            <Loading />
                        </div>
                    ) : todoStatus === 'succeeded' ? (
                        todos.map((todo) => (
                            <TodoList
                                todo={todo}
                                text={todo.title}
                                _id={todo._id}
                                updatingInInput={() => updatingInInput(todo._id, todo.title)}
                                deleteTodo={() => deleteTodo(todo._id)}
                                key={todo._id}
                            />
                        ))
                    ) : (
                        <div>{error}</div>
                    )}
                </div>
            ) : (
                <div className='mr-top'>
                    <LoginButton />
                </div>
            )}
        </div>
    );
}

export default Todo;
