import {RiDeleteBin2Fill} from 'react-icons/ri';
import {FaEdit} from 'react-icons/fa';
import Swal from 'sweetalert2';

export const SaveDate = ({
    text,
    deleteDating,
    updatingInInput,
    typeOfDating,
    key,
    setDating,
}) => {
    const deleteMyDate = () => {
        deleteDating(key, setDating);
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `"${text}" has been deleted`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className='contWithEachDate'>
            <p className='title'>{text}</p>
            <div className='contWIthMeal'>
                <img
                    className='dateTypeImg'
                    src={`./${typeOfDating}.jpg`}
                    width='140px'
                    alt='choose type of date'
                />

                <p>{typeOfDating}</p>
                <RiDeleteBin2Fill
                    fill='#9d8d84'
                    size={30}
                    onClick={deleteMyDate}
                />
                <FaEdit fill='#9d8d84' size={30} onClick={updatingInInput} />
            </div>
        </div>
    );
};
