import React, { useState, useEffect } from 'react';
import Buttons from './Buttons';
import Select from "react-dropdown-select"
import voices from '../assets/voices.json';
import '../App.css'

const TextArea = (props) => {
    const { buttons, displayAtrributes, selectedAttributeId, generateButton, textValue, textAreaContentChanged, disableClick } = props;

    const [showTagAttributes, setShowTagAttributes] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState("Danielle");
    const [disableSelectingTag, setDisableSelectingTag] = useState(false);

    const ssml = [];
    for (let items in buttons) {
        ssml.push(buttons[items]);
    }

    useEffect(() => {
        if (displayAtrributes) {
            setShowTagAttributes(true);
            setDisableSelectingTag(true)
        }
        else {
            setShowTagAttributes(false);
        }
    }, [displayAtrributes]);


    const generateAudio = () => {
        const textArea = document.getElementById('ssmlTextarea');
        textValue(textArea.value, selectedVoice);
    }

    const handleOnChange = () => {
        textAreaContentChanged();
    }



    return (
        <>
            <div
                id='tagAttributes'
                className='grid grid-cols-2 gap-2 border border-solid border-fuchsia-500 w-3/5 rounded-lg p-4 mt-4 text-white'
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
                {showTagAttributes && <Buttons buttons={ssml[selectedAttributeId]} disableSelectingTag={disableSelectingTag} />}
            </div>
            <textarea
                id='ssmlTextarea'
                className="w-3/5 h-80 p-2 border  border-red-400 rounded-lg bg-transparent text-white"
                placeholder="Enter your text here, then Drag and drop the tags between the words..." style={{ outline: 'none' }}
                onChange={handleOnChange}
            >
            </textarea>
            <div className='flex border border-solid border-fuchsia-500 w-3/5 h-15 rounded-lg p-4 font-medium'>
                <label className='text-white mr-4'>
                    Voices
                </label>
                <div className="flex justify-between w-full">
                    <Select
                        options={voices}
                        labelField="name"
                        menuPortalTarget={document.body} menuPosition={'fixed'}
                        valueField="id"
                        dropdownHeight="150px"
                        style={{ borderRadius: "0.5rem", width: "200px" }}
                        className=" bg-white rounded-lg custom-dropdown"

                        onChange={(values) => {
                            setSelectedVoice(values[0].name.split(" ")[0].toString());
                            handleOnChange();
                        }}
                    />
                    <Buttons buttonColor="bg-cyan-400" buttons={generateButton} generateAudioClick={generateAudio} disableClick={disableClick}/>
                </div>
            </div>
        </>
    );
};

export default TextArea;
