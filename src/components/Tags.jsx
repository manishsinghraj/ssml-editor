import React from 'react';
import Buttons from './Buttons';

const Tags = (props) => {
    const { buttons, click } = props;
    const { tags } = buttons;

    const handleClick = (id) => {
        click(id);
    }

    return (
        <div className='flex border border-solid border-fuchsia-500 w-3/5 h-15 mt-4 rounded-lg p-4'>
            <div className='flex justify-between w-full  text-white'>
                <Buttons buttons={tags} selectedTag={handleClick} />
            </div>
        </div>
    );
};

export default Tags;
