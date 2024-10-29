import React from 'react';
import Buttons from './Buttons';

const Download = (props) => {
    const { buttons, audioUrl } = props;
    const downloadButton = buttons.download;

    const downloadAudio = () => {
        const element = document.createElement('a');
        element.setAttribute('href', audioUrl);
        element.setAttribute('download', 'audio.mp3');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return (
        <div className='flex border border-solid border-fuchsia-500 w-3/5 h-15 mt-4 rounded-lg p-4 text-black font-medium'>
            <Buttons buttons={downloadButton} downloadAudio={downloadAudio} buttonColor="bg-green-400" />
        </div>
    );
}

export default Download;
