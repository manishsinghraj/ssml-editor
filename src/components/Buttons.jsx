// Buttons.js
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DraggableButton from './DraggableButton';
import { NonDraggableButtons } from './NonDraggableButtons';

const Buttons = (props) => {
    const { buttons, selectedTag, buttonColor, generateAudioClick, disableSelectingTag, downloadAudio, disableClick } = props; 

    const handleTag = (id) => {
        selectedTag(id);
    }

    const handleClick = () => {
        generateAudioClick();
    }

    let tags = (buttons).map((item, index) => {
        return (
            
            item.draggable ?
                <DraggableButton getTag={handleTag} key={uuidv4()} id={index} label={item.label} ssmlTag={item.ssmlTag} disableSelectingTag={disableSelectingTag}>{item.label}</DraggableButton>
                :          
                <NonDraggableButtons buttonColor={buttonColor} key={uuidv4()} label={item.label} generateAudioClick={handleClick} downloadAudio={downloadAudio} disableClick={disableClick}>
                    {item.label}</NonDraggableButtons>
        );
    });

    return <>{tags}</>;
}

export default Buttons;
