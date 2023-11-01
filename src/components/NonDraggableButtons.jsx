import React, { useEffect, useState } from 'react'
import { calculateButtonWidth } from '../utils/widthCalculations'

export const NonDraggableButtons = (props) => {

    const { label, buttonColor, generateAudioClick, downloadAudio, disableClick } = props;
    const bgColorClass = buttonColor;

    const handleClick = () => {
        if(label === "download"){
            downloadAudio();
        }
        generateAudioClick();
    }

    return (
        <button
            draggable="false"
            className={`ml-4 rounded-md border-2 border-solid border-indigo-800 w-20 h-9 ${bgColorClass}`}
            style={{ width: calculateButtonWidth(label) }}
            onClick={handleClick}
            disabled={disableClick}
        >
            {label}
        </button>
    )
}
