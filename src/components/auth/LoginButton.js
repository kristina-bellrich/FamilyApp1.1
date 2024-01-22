import React, {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import gsap from 'gsap';

const LoginButton = ({collapsedRecipe}) => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    useEffect(() => {
        const blocks = document.querySelectorAll('.imgLoading');

        gsap.fromTo(
            blocks,
            {opacity: 0, y: 50},
            {
                opacity: 1,
                y: 0,
                rotation: 0,
                stagger: 0.5,
                duration: 2,
                ease: 'power3.out',
                onComplete: () => {
                    gsap.set('#btnAndText', {clearProps: 'all'});
                },
            },
        );
    }, []);

    return (
        !isAuthenticated && (
            <div
                className={
                    collapsedRecipe ? 'loginContainerAll' : 'loginCollapsed'
                }
            >
                <div className='loginContainer'>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/7069574_3249754.jpg?v=1705689891032'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/7732606_5233.jpg?v=1705689900442'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/6200540_3187910.jpg?v=1705689894510'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/11879344_Checklist.jpg?v=1705689905994'
                            alt='img'
                        />
                    </div>

                    <div className='btnAndText '>
                        <h1 className='textLogin'>
                            Log into your account and use your family organizer
                        </h1>
                        <button
                            className='loginBtn'
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </button>
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/8685794_3968849.jpg?v=1705689907750'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/20892169_Sandy_Ppl-23_Single-02%20(1).jpg?v=1705689911586'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/6195512_3157932.jpg?v=1705691405287'
                            alt='img'
                        />
                    </div>
                    <div className='imgLoading'>
                        <img
                            className='imgLoad'
                            src='https://cdn.glitch.global/f2e4ba55-b717-4015-a28f-cb2cca8ea632/10174062_8709.jpg?v=1705691405644'
                            alt='img'
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default LoginButton;
