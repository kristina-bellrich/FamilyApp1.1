import ReactLoading from 'react-loading';
export const Loading = () => {
    return (
        <div className='loading'>
            <p className='loading'>your information will be here soon...</p>

            <ReactLoading
                className='extraTextLoading'
                type={'spinningBubbles'}
                color={'#a88494'}
                height={'10%'}
                width={'10%'}
            />
        </div>
    );
};
