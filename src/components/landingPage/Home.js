import {useEffect, useState} from 'react';
import LoaderForLanding from '../loaders/LoaderForLanding';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import ReactPlayer from 'react-player';


function Home() {
    const [loaded, setLoaded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        setLoaded(false);
        AOS.init({
            duration: 600,
            once: true,
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        }; window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <div className='landingContainer'>
            {loaded ? (
                <LoaderForLanding />
            ) : (
                <section className='landingContainer1' data-aos='fade-right'>
                    <div className='headerCont'>
                        <p className='header'>
                            FAMILY HUB: DISCOVER, SAVE, ORGANIZE
                        </p>
                    </div>
                    <div>
                        <img
                            className='imgHeader'
                            src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/12290880_Addicted%20family%20using%20digital%20gadgets%20(1).jpg?v=1705426983409'
                            alt='landingImg'
                        />
                    </div>
                </section>
            )}

            <h2 className='header1'>YOUR FAMILY HELPER</h2>

            <section className='features'>
                <div
                    className='feature'
                    data-aos='fade-up'
                    data-aos-delay='500'
                >
                    <img
                        className='imgSection'
                        src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/20892169_Sandy_Ppl-23_Single-02.jpg?v=1705426952146'
                        alt='Рецепты'
                    />
                    <h2 className='header2'>
                        Search and save your favorite recipes by ingredients
                    </h2>
                </div>

                <div
                    className='feature'
                    data-aos='fade-up'
                    data-aos-delay='1000'
                >
                    <img
                        className='imgSection'
                        src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/14261146_2003.i203.008.virtual%20relationships%20online%20dating%20cartoon.jpg?v=1705426956259'
                        alt='Свидания'
                    />
                    <h2 className='header2'>
                        Ideas for romantic dates with your loved one
                    </h2>
                </div>

                <div
                    className='feature'
                    data-aos='fade-up'
                    data-aos-delay='1500'
                >
                    <img
                        className='imgSection'
                        src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/12085876_20944361.jpg?v=1705426948089'
                        alt='Совместные дела'
                    />
                    <h2 className='header2'>
                        Organize your joint tasks and track your expenses
                    </h2>
                </div>
            </section>

            <div className='useContainer'>
                <h2 className='header1'>HOW YOU CAN USE IT</h2>

                <section className='features'>
                    <h3 className='block-title feature1'>
                        Log into your account
                    </h3>
                    <img
                        src='https://cdn.glitch.global/225ba953-fb5b-4a9f-8282-59305d3e0afc/13575823_35.jpg?v=1705425746458'
                        alt='Arrow Icon'
                        className='feature1 arrow-icon'
                    />
                    <h3 className='block-title  feature1'>Save your ideas</h3>
                </section>
            </div>
            <div>
            {windowWidth >= 700 ?
                <ReactPlayer  style={{position:'relative'}} width='100%' height='100%'
                    controls
                    url='https://cdn.glitch.global/c14711ba-e15b-405c-b9bf-66eaec2bf016/IMG_2558.MOV?v=1706367044708'
                /> :
                <ReactPlayer  style={{position:'relative'}} width='100%' height='100%'
                controls
                url='https://cdn.glitch.me/c14711ba-e15b-405c-b9bf-66eaec2bf016/IMG_2556.MOV?v=1706365097856'
            /> }
            </div>
        </div>
    );
}

export default Home;
