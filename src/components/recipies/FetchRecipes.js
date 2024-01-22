import axios from 'axios';

const getAllRecipes = (setMyRecipe) => {
    axios.get('https://family-app-igfj.onrender.com').then(({data}) => {
        setMyRecipe(data);
    });
};

const addRecipe = (
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    setMyRecipe,
) => {
    axios
        .post('https://family-app-igfj.onrender.com/saveRecipe', {
            title,
            description,
            image,
        })
        .then((data) => {
            setTitle('');
            setDescription('');
            setImage('');
            getAllRecipes(setMyRecipe);
        });
};

const deleteRecipe = (_id, setMyRecipe) => {
    axios
        .post('https://family-app-igfj.onrender.com/deleteRecipe', {_id})
        .then((data) => {
            getAllRecipes(setMyRecipe);
        });
};

const editRecipe = (
    recipeID,
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    setMyRecipe,
    setEditing,
) => {
    axios
        .put('https://family-app-igfj.onrender.com/editRecipe', {
            _id: recipeID,
            title,
            description,
            image,
        })
        .then((data) => {
            setTitle('');
            setDescription('');
            setImage('');
            setEditing(false);
            getAllRecipes(setMyRecipe);
        });
};

export {getAllRecipes, addRecipe, deleteRecipe, editRecipe};
