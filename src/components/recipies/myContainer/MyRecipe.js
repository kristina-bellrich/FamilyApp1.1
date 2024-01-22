import React from 'react';
import {AiOutlineDelete} from 'react-icons/ai';

import Swal from 'sweetalert2';

export const MyRecipe = ({
    text,
    description,
    image,
    _id,
    setMyRecipe,
    deleteRecipe,
}) => {
    const deleteMyRecipe = () => {
        deleteRecipe(_id, setMyRecipe);
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your recipe has been deleted',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className='eachOfAllRecipes flex-column '>
            <h3 className='nameOfRecipe'>{text}</h3>
            <a
                className={description.includes('http') ? 'openRecipe' : 'link'}
                href={description}
            >
                {description.includes('http') ? 'OPEN RECIPE' : description}
            </a>
            <div>
                <img
                    src={image}
                    width='200px'
                    alt='alt'
                    className='imgRecipe'
                />
            </div>
            <div>
                <AiOutlineDelete
                    size={40}
                    color='#69696b'
                    onClick={deleteMyRecipe}
                />
            </div>
        </div>
    );
};
