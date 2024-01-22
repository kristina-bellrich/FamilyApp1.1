import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";



export const TodoList = ({text, deleteTodo, updatingInInput,_id,setTodo}) => {

    const deleteMyTodo=()=>{
        deleteTodo(_id, setTodo)
          Swal.fire({
           position: 'center',
           icon: 'error',
           title: `"${text}" has been deleted`,
           showConfirmButton: false,
           timer: 1500,
       });
       }
       


    return (
        <div className='contWithEachEl'>
            <p className= 'titleTodo'>{text}</p>
            <RiDeleteBin2Fill fill="#9d8d84" size={30} onClick={deleteMyTodo}/>
            <FaEdit fill="#9d8d84" size={30} onClick={updatingInInput}/>

        </div>
    );
}






// export const TodoList = ({text, deleteTodo, updatingInInput,todoId}) => {
//     const [done, setDone ] = useState(false)

// const crossedTodo=()=>{
//     setDone(true)
// }



// const crossed=()=>{
//     crossedTodo()
//     doneTodo(setDone,todoId)
// }
//     return (
//         <div className='contWithEachEl'>
//             <p className={!done ? 'titleTodo' : 'crossed'} onClick={crossed}>{text}</p>
//             <RiDeleteBin2Fill fill="#9d8d84" size={30} onClick={deleteTodo}/>
//             <FaEdit fill="#9d8d84" size={30} onClick={updatingInInput}/>

//         </div>
//     );
// }
