import {useEffect, useState} from 'react';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {BsFillSearchHeartFill} from 'react-icons/bs';
import {FiChevronsLeft} from 'react-icons/fi';
import {RecipeApi} from './recipeApi/RecipeApi';
import {useAuth0} from '@auth0/auth0-react';
import {PaginatedItems} from './myContainer/PaginatedItems';
import LoginButton from '../auth/LoginButton';

function Recipies() {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [collapsed, setCollapsed] = useState(true);
    const [toggled, setToggled] = useState(false);
    const [myRecipe, setMyRecipe] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);


    useEffect(() => {
        const handleAuthentication = async () => {
            try {
                if (isAuthenticated) {
                    const token = await getAccessTokenSilently();
                    localStorage.setItem('access_token', token);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleAuthentication();
    }, [isAuthenticated, getAccessTokenSilently]);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div className='allRecipeContainer'>
            <Sidebar
                transitionDuration={800}
                className={collapsed ? 'open' : 'close'}
                style={{
                    opasity: 1,
                    height: '100%',
                    position: 'fixed',
                    backgroundColor: '#ffdfd6',
                    transition: 'opacity 800s ease',
                }}
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
            >
                <div>
                    <Menu>
                        {collapsed ? (
                            <MenuItem
                                icon={
                                    <BsFillSearchHeartFill
                                        size={30}
                                        color='#69696b'
                                    />
                                }
                                onClick={handleCollapsedChange}
                            ></MenuItem>
                        ) : (
                            <MenuItem
                                suffix={
                                    <FiChevronsLeft
                                        onClick={handleCollapsedChange}
                                        size={30}
                                        color='#69696b'
                                    />
                                }
                            >
                                <p className='find'>
                                    Find recipe by ingredient
                                </p>
                            </MenuItem>
                        )}
                        <hr />
                    </Menu>
                    <Menu>
                        <RecipeApi
                            collapsed={collapsed}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setImage={setImage}
                            setMyRecipe={setMyRecipe}
                        />
                    </Menu>
                </div>
            </Sidebar>

            {isAuthenticated ? (
                <PaginatedItems
                    itemsPerPage={3}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    image={image}
                    setImage={setImage}
                    setMyRecipe={setMyRecipe}
                    myRecipe={myRecipe}
                />
            ) : (
                <div className='mr-left'>
                    <LoginButton collapsedRecipe={collapsed} />
                </div>
            )}
        </div>
    );
}

export default Recipies;
