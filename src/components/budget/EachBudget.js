import {RiDeleteBin2Fill} from 'react-icons/ri';
import {FaEdit} from 'react-icons/fa';

export const EachBudget = ({
    deleteExpenses,
    selectedDate,
    selectedType,
    amount,
    updatingInInput,
}) => {
    return (
        <div className='contWithEachExpense'>
            <p className='expenses'>
                {selectedDate} {selectedType} : {amount} €
            </p>
            <RiDeleteBin2Fill
                fill='#b89aad'
                size={30}
                onClick={deleteExpenses}
            />
            <FaEdit fill='#b89aad' size={30} onClick={updatingInInput} />
        </div>
    );
};
