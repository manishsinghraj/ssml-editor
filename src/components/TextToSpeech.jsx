import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import awsConfig from '../../aws.config'
import ssmlCheck from 'ssml-check-core';
import ErrorHandler from './ErrorHandler';

const Polly = new AWS.Polly(awsConfig);

function TextToSpeech(props) {
    const { getAudioUrl, text, voice } = props;

    let selectedVoice = voice;
    const speakRegex = /<speak[^>]*>[\s\S]*<\/speak>/i;  
    let ssmlText = (speakRegex.test(text)) ? text : `<speak>${text}</speak>`;

    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorComponent, setShowErrorComponent] = useState(false);

    useEffect(() => {
        if (text !== "") {
            validateSsml(ssmlText);
        }
        setErrorMessage("");
    }, [ssmlText, selectedVoice]);


    const validateSsml = () => ssmlCheck.check(ssmlText)
        .then((errors) => {
            if (errors) {
                console.log(JSON.stringify(errors));
                setErrorMessage("SSML Text is invalid. Please check Again!");
                setShowErrorComponent(true);
            } else {
                setShowErrorComponent(false);
                generateTextToSpeech();
            }
        });


    function generateTextToSpeech() {

        const params = {
            OutputFormat: 'mp3',
            Text: ssmlText,
            TextType: 'ssml',
            VoiceId: selectedVoice,
            Engine: 'neural',
        };

        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
                setShowErrorComponent(true);
                setErrorMessage("Error 404");

            } else {
                const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                getAudioUrl(audioUrl);
            }
        });
    }

    return (
        <>
            {showErrorComponent && <ErrorHandler errorMessage={errorMessage}></ErrorHandler>}
        </>
    );
}

export default TextToSpeech;