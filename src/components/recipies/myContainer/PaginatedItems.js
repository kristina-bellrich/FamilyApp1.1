import {useState} from 'react';
import ReactPaginate from 'react-paginate';
import {OwnRecipe} from './OwnRecipe';

export const PaginatedItems = ({
    itemsPerPage,
    myRecipe,
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    setMyRecipe,
}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems =
        myRecipe.length > 0 ? myRecipe.slice(itemOffset, endOffset) : [];
    const pageCount = Math.ceil(myRecipe.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % myRecipe.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <OwnRecipe
                currentItems={currentItems}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                image={image}
                setImage={setImage}
                setMyRecipe={setMyRecipe}
                myRecipe={myRecipe}
            />

            <div className='pag'>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName='pagination'
                    pageClassName='page-num'
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    nextClassName='btn'
                    activeLinkClassName='active'
                />
            </div>
        </div>
    );
};
