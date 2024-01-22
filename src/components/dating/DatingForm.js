import {useEffect, useState} from 'react';
import React from 'react';
import {SaveDate} from './SaveDate';
import {addDating, deleteDating, editDating, getAllDating} from './FetchDating';
import {Loading} from '../loaders/Loading';
import Swal from 'sweetalert2';

function DatingForm({collapsed}) {
    //create state with data from API
    const [myDating, setMyDating] = useState([]);
    const [title, setTitle] = useState('');
    const [typeOfDating, setTypeOfDating] = useState('');
    const [editing1, setEditing1] = useState(false);
    const [dateId, setDatingId] = useState('');

    //send state in component with API(and update it there)
    useEffect(() => {
        getAllDating(setMyDating);
    }, []);

    const updatingInInput = (_id, title, typeOfDating) => {
        setEditing1(true);
        setTitle(title);
        setTypeOfDating(typeOfDating);
        setDatingId(_id);
    };

    const checkedType = (e) => {
        const checkedTypeWord = e.target.value;
        setTypeOfDating(checkedTypeWord);
    };
    const addMyDate = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `New date idea has been added`,
            showConfirmButton: false,
            timer: 1500,
        });
        addDating(title, setTitle, setMyDating, typeOfDating, setTypeOfDating);
    };

    const editMyDate = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `The date idea has been updated`,
            showConfirmButton: false,
            timer: 1500,
        });
        editDating(
            dateId,
            title,
            setMyDating,
            setTitle,
            setEditing1,
            typeOfDating,
            setTypeOfDating,
        );
    };
    return (
        <div className={collapsed ? 'sidebar' : 'collapsed'}>
            <div className='form'>
                <div>
                    <h3> Choose day of week</h3>
                    <select className='typeOfDate' onChange={checkedType}>
                        <option disabled selected value='Active'>
                            Choose type of date
                        </option>
                        <option value='Active'>Active</option>
                        <option value='Outdoor'>Outdoor</option>
                        <option value='Cultural'>Cultural</option>
                        <option value='Romantic'>Romantic</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Music'>Music</option>
                        <option value='Wellness'>Wellness</option>
                        <option value='Culinary'>Culinary</option>
                        <option value='Adventure'>Adventure</option>
                        <option value='Education'>Education</option>
                        <option value='Dance'>Dance</option>
                        <option value='Charity'>Charity</option>
                        <option value='Creative'>Creative</option>
                    </select>
                </div>

                <input
                    className='titleInput'
                    placeholder='Name of meal'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                />

                <button
                    className='addDate'
                    disabled={!title}
                    onClick={editing1 ? () => editMyDate() : () => addMyDate()}
                >
                    {editing1 ? 'EDIT' : 'ADD'}
                </button>
            </div>

            <div className='contWithAllDating'>
                {myDating.length > 0 ? (
                    myDating.map((date) => (
                        <SaveDate
                            text={date.title}
                            deleteDating={() =>
                                deleteDating(date._id, setMyDating)
                            }
                            updatingInInput={() =>
                                updatingInInput(
                                    date._id,
                                    date.title,
                                    date.typeOfDating,
                                )
                            }
                            typeOfDating={date.typeOfDating}
                            key={date._id}
                            setDating={setMyDating}
                        />
                    ))
                ) : (
                    <div className='extraTextLoading'>
                        <p>Invent your dream date and</p>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DatingForm;
