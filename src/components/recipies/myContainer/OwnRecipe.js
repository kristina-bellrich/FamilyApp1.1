import {useEffect, useState} from 'react';
import {getAllRecipes, deleteRecipe} from '../FetchRecipes';
import {MyRecipe} from './MyRecipe';
import {Loading} from '../../loaders/Loading';

export const OwnRecipe = ({
    setTitle,
    setDescription,
    setImage,
    setMyRecipe,
    currentItems,
    myRecipe,
}) => {
    const [editing, setEditing] = useState(false);
    const [recipeID, setRecipeId] = useState('');
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        getAllRecipes(setMyRecipe);
    }, [setMyRecipe]);

    const updatingInInput = (_id, title, setTitle, description, image) => {
        setOpenForm(!openForm);
        setEditing(true);
        setTitle(title);
        setDescription(description);
        setRecipeId(_id);
        setImage(image);
    };

    return (
        <div className='marginLeft'>
            <div>
                <h1 className='headerRecipesContainer'>
                    YOUR FAVORITE FAMYLY RECIPES!!!
                </h1>
                {myRecipe.length > 0 ? (
                    <div className='recipeContainer'>
                        {currentItems.map((recipe) => (
                            <MyRecipe
                                text={recipe.title}
                                description={recipe.description}
                                image={recipe.image}
                                key={recipe._id}
                                _id={recipe._id}
                                setMyRecipe={setMyRecipe}
                                deleteRecipe={deleteRecipe}
                                setTitle={setTitle}
                                updatingInInput={updatingInInput}
                                editing={editing}
                                recipeID={recipeID}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='extraTextLoading'>
                        <p>Find and save your favorite recipe and</p>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
};
