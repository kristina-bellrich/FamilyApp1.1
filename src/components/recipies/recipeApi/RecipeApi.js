import {useEffect, useState} from 'react';
import {EachRecipe} from './EachRecipe';
import {RiFindReplaceFill} from 'react-icons/ri';

export const RecipeApi = ({
    setTitle,
    setDescription,
    setImage,
    setMyRecipe,
    collapsed,
}) => {
    const id = '640ffb22';
    const key = '4229630f925fe6fd8eb1406c7dff251b';

    const [input, setInput] = useState('');
    const [recArray, setRecArray] = useState([]);
    const [wordApi, setWordApi] = useState('salmon');

    useEffect(() => {
        const getRecipe = async () => {
            const response = await fetch(
                `https://api.edamam.com/search?q=${wordApi}&app_id=${id}&app_key=${key}`,
            );
            const data = await response.json();
            setRecArray(data.hits);
        };
        getRecipe();
    }, [wordApi]);

    //look what write user
    const userInput = (e) => {
        setInput(e.target.value);
    };

    //change state with new word by click buttom or enter
    const searchRec = (e) => {
        e.preventDefault();
        setWordApi(input);
    };

    return (
        <div>
            <div className={collapsed ? 'marginLeft' : 'flex-column'}>
                <form onSubmit={searchRec}>
                    <input
                        className='inputApi'
                        value={input}
                        onChange={userInput}
                        placeholder='For example: avocado, salmon ...'
                    />
                    <RiFindReplaceFill
                        onClick={searchRec}
                        size={40}
                        color='#69696b'
                    />
                </form>

                {recArray.map((each, i) => (
                    <EachRecipe
                        key={each.recipe.image}
                        each={each}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setImage={setImage}
                        setMyRecipe={setMyRecipe}
                    />
                ))}
            </div>
        </div>
    );
};
