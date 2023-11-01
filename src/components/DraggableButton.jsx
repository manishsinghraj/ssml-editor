import React from 'react';
import { calculateButtonWidth } from '../utils/widthCalculations';



const DraggableButton = (props) => {
    const { label, ssmlTag, getTag, id, disableSelectingTag } = props;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', ssmlTag);
    };

    const handleOnClick = () => {
        if (!disableSelectingTag){
            getTag(id);
        }
    };

    return (
        <button
            draggable="true"
            onDragStart={handleDragStart}
            onClick={handleOnClick}
            className='ml-4 rounded-md border border-solid border-yellow-200 w-20 h-9'
            style={{ width: calculateButtonWidth(label) }}>
            {label}
        </button>
    );
};

export default DraggableButton;