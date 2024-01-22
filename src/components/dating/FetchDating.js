import axios from 'axios';

//get all meal from API and display it
const getAllDating = (setMyDating) => {
    axios.get('https://dating-bysy.onrender.com').then(({data}) => {
        setMyDating(data);
    });
};

//say to add new Meal and display what was before
const addDating = (
    title,
    setTitle,
    setMyDating,
    typeOfDating,
    setTypeOfDating,
) => {
    axios
        .post(`https://dating-bysy.onrender.com/saveDating`, {
            title,
            typeOfDating,
        })
        .then(() => {
            //after push ADD empty inputs and update all list
            setTitle('');
            setTypeOfDating('');
            getAllDating(setMyDating);
        });
};

const editDating = (
    dateId,
    title,
    setMyDating,
    setTitle,
    setEditing1,
    typeOfDating,
    setTypeOfDating,
) => {
    axios
        .post(`https://dating-bysy.onrender.com/editDating`, {
            _id: dateId,
            title,
            typeOfDating,
        })
        .then(() => {
            setTitle('');
            setTypeOfDating('');
            setEditing1(false);
            getAllDating(setMyDating);
        });
};

const deleteDating = (_id, setMyDating) => {
    axios
        .post(`https://dating-bysy.onrender.com/deleteDating`, {_id})
        .then(() => {
            getAllDating(setMyDating);
        });
};

export {getAllDating, addDating, editDating, deleteDating};
