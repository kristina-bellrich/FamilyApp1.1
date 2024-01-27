import {useEffect, useState} from 'react';
import {TodoList} from './TodoList';
import {addTodo, deleteTodo, editTodo, getAllTodo} from './FetchTodo';
import {Loading} from '../loaders/Loading';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';
import Swal from 'sweetalert2';

function Todo() {
    const {isAuthenticated} = useAuth0();
    //create state with data from API
    const [myTodo, setTodo] = useState([]);
    const [title, setTitle] = useState('');
    const [editing1, setEditing1] = useState(false);
    const [todoId, setTodoId] = useState('');


    //send state in component with API(and update it there)
    useEffect(() => {
        getAllTodo(setTodo);
        // setLoading(false);
    }, []);

    const updatingInInput = (_id, title) => {
        setEditing1(true);
        setTitle(title);
        setTodoId(_id);
    };

    const addMyTodo = ()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `New task has been added`,
            showConfirmButton: false,
            timer: 1500,
        });
        addTodo(title, setTitle, setTodo)
    }

    const editMyTodo = ()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `The task has been updated`,
            showConfirmButton: false,
            timer: 1500,
        });
        editTodo(todoId,title,setTodo,setTitle,setEditing1,
        )
    }
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
                    onClick={
                        editing1
                            ? () =>editMyTodo()

                            : ()=>addMyTodo()
                    }
                >
                    {editing1 ? 'EDIT' : 'ADD'}
                </button>
            </div>
            {isAuthenticated ? (
                <div className='contWithAllEl'>
                    {myTodo.length > 0 ? (
                        myTodo.map((todo) => (
                            <TodoList
                                todo={todo}
                                text={todo.title}
                                _id={todo._id}
                                setTodo={setTodo}
                                deleteTodo={() => deleteTodo(todo._id, setTodo)}
                                updatingInInput={() =>updatingInInput(todo._id, todo.title)
                                }
                                key={todo._id}
                            />
                        ))
                    ) : (
                        <div className='extraTextLoading'>
                            <p>Consider shared plans and</p>
                            <Loading />
                        </div>
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
