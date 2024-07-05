import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeTodo } from "../store/todoSlice";


export const TodoList = ({ text, _id, updatingInInput }) => {
    const dispatch = useDispatch();

    const deleteMyTodo = () => {
        dispatch(removeTodo(_id));
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${text} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className='contWithEachEl'>
            <p className='titleTodo'>{text}</p>
            <RiDeleteBin2Fill fill="#9d8d84" size={30} onClick={deleteMyTodo} />
            <FaEdit fill="#9d8d84" size={30} onClick={updatingInInput} />
        </div>
    );
};


