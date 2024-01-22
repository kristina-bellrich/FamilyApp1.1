import {useState, useEffect} from 'react';
import {data} from './data';
import DatingForm from './DatingForm';
import {FaAngleDown} from 'react-icons/fa';
import {IoIosArrowUp} from 'react-icons/io';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';

const Dating = () => {
    const [randomDating, setRandomDating] = useState('GET INSPIRATION');
    const [filteredType, setFilteredType] = useState(null);
    const [randomImage, setRandomImage] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const {isAuthenticated} = useAuth0();

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    useEffect(() => {
        const handleAuthentication = async () => {
            try {
                if (isAuthenticated) {
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleAuthentication();
    }, [isAuthenticated]);

    useEffect(() => {
        const getRandomImage = () => {
            const url = `https://source.unsplash.com/800x400/?dating&${randomDating}`;
            setRandomImage(url);
        };
        getRandomImage();
    }, [filteredType, randomDating]);

    const getRandomDating = () => {
        let filteredData = data;
        if (filteredType) {
            filteredData = data.filter((item) => item.type === filteredType);
        }
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setRandomDating(filteredData[randomIndex]?.dating || '');
    };

    const handleFilter = (type) => {
        setFilteredType(type);
        setRandomDating('');
    };

    return (
        <div className='flexDatingContainer allDateContainer'>
            <div>
                <div onClick={toggleCollapse}>
                    <h2 className='openYoursIdeas'>
                        {!collapsed
                            ? 'OPEN TO SAFE YOUR DATING IDEAS'
                            : 'CLOSE YOUR DATING IDEAS'}
                        {!collapsed ? <FaAngleDown /> : <IoIosArrowUp />}
                    </h2>
                </div>
                {isAuthenticated ? (
                    <DatingForm collapsed={collapsed} />
                ) : (
                    <div className={collapsed ? 'sidebar' : 'collapsed'}>
                        <LoginButton />
                    </div>
                )}
            </div>

            <div className='btnFilterContainer'>
                <button
                    className='btnFilter'
                    onClick={() => handleFilter(null)}
                >
                    All
                </button>
                {Array.from(new Set(data.map((item) => item.type))).map(
                    (type, index) => (
                        <button
                            className='btnFilter'
                            key={index}
                            onClick={() => handleFilter(type)}
                        >
                            {type}
                        </button>
                    ),
                )}
            </div>
            {/* <h1 className='headerRandom'>Random Dating Generator</h1> */}
            {randomImage && (
                <div className='containerImgAndIdea'>
                    <div>
                        <button
                            className='btnGenerate'
                            onClick={getRandomDating}
                        >
                            Generate Random Dating Idea
                        </button>
                    </div>
                    <p className='headerRandom'>{randomDating}</p>
                    <img className='randomImg' src={randomImage} alt='Random' />
                </div>
            )}
        </div>
    );
};

export default Dating;
