import React, { useState, useEffect } from 'react';
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import awsConfig from '../../aws.config'
import ssmlCheck from 'ssml-check-core';
import ErrorHandler from './ErrorHandler';

const pollyClient = new PollyClient(awsConfig);

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

    const validateSsml = async () => {
        try {
            await ssmlCheck.check(ssmlText);
            setShowErrorComponent(false);
            generateTextToSpeech();
        } catch (error) {
            console.error(JSON.stringify(error));
            setErrorMessage("SSML Text is invalid. Please check again!");
            setShowErrorComponent(true);
        }
    };

    async function generateTextToSpeech() {
        const params = {
            OutputFormat: 'mp3',
            Text: ssmlText,
            TextType: 'ssml',
            VoiceId: selectedVoice,
            Engine: 'neural',
        };

        try {
            const response = await pollyClient.send(new SynthesizeSpeechCommand(params));
            const reader = response.AudioStream.getReader();
            const chunks = [];

            const processStream = async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        chunks.push(value);
                    }

                    const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    getAudioUrl(audioUrl);
                    
                } catch (error) {
                    console.error("Error:", error);
                    setShowErrorComponent(true);
                    setErrorMessage("Error 404");
                }
            };

            processStream();

        } catch (error) {
            console.error("Error:", error);
            setShowErrorComponent(true);
            setErrorMessage("Error 404");
        }
    }

    return (
        <>
            {showErrorComponent && <ErrorHandler errorMessage={errorMessage}></ErrorHandler>}
        </>
    );
}

export default TextToSpeech;














































// import React, { useState, useEffect } from 'react';
// import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
// import awsConfig from '../../aws.config'
// import ssmlCheck from 'ssml-check-core';
// import ErrorHandler from './ErrorHandler';

// const pollyClient = new PollyClient(awsConfig);

// function TextToSpeech(props) {
//     const { getAudioUrl, text, voice } = props;


//     let selectedVoice = voice;
//     const speakRegex = /<speak[^>]*>[\s\S]*<\/speak>/i;  // <speak>This is sample <break time="500ms" />  test</speak>
//     let ssmlText = (speakRegex.test(text)) ? text : `<speak>${text}</speak>`;
//     console.log(ssmlText);

//     const [errorMessage, setErrorMessage] = useState("");
//     const [showErrorComponent, setShowErrorComponent] = useState(false);

//     useEffect(() => {
//         if (text !== "") {
//             validateSsml(ssmlText);
//         }
//         setErrorMessage("");
//     }, [ssmlText, selectedVoice]);


//     const validateSsml = () => ssmlCheck.check(ssmlText)
//         .then((errors) => {
//             if (errors) {
//                 console.log(JSON.stringify(errors));
//                 setErrorMessage("SSML Text is invalid. Please check Again!");
//                 setShowErrorComponent(true);
//             } else {
//                 setShowErrorComponent(false);
//                 generateTextToSpeech();
//             }
//         });

//     // useEffect(() => {
//     //     if (text !== "") {
//     //         validateSsml(ssmlText);
//     //     }
//     //     setErrorMessage("");
//     // }, [ssmlText, selectedVoice]);

//     // const validateSsml = () => {
//     //     ssmlCheck.check(ssmlText)
//     //         .then(() => {
//     //             setShowErrorComponent(false);
//     //             generateTextToSpeech();
//     //         })
//     //         .catch((error) => {
//     //             console.error(JSON.stringify(error));
//     //             setErrorMessage("SSML Text is invalid. Please check again!");
//     //             setShowErrorComponent(true);
//     //         });
//     // };

//     function generateTextToSpeech() {
//         const params = {
//             OutputFormat: 'mp3',
//             Text: ssmlText,
//             TextType: 'ssml',
//             VoiceId: selectedVoice,
//             Engine: 'neural',
//         };

//         pollyClient.send(new SynthesizeSpeechCommand(params))
//             .then(({ AudioStream }) => {
//                 const audioBlob = new Blob([AudioStream], { type: 'audio/mpeg' });
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 console.log("audioUrl = "+audioUrl)
//                 getAudioUrl(audioUrl);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//                 setShowErrorComponent(true);
//                 setErrorMessage("Error 404");
//             });
//     }

//     // function generateTextToSpeech() {

//     //     const params = {
//     //         OutputFormat: 'mp3',
//     //         Text: ssmlText,
//     //         TextType: 'ssml',
//     //         VoiceId: selectedVoice,
//     //         Engine: 'neural',
//     //     };

//     //     Polly.synthesizeSpeech(params, (err, data) => {
//     //         if (err) {
//     //             console.error('Error:', err);
//     //             setShowErrorComponent(true);
//     //             setErrorMessage("Error 404");

//     //         } else {
//     //             const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
//     //             const audioUrl = URL.createObjectURL(audioBlob);
//     //             getAudioUrl(audioUrl);
//     //         }
//     //     });
//     // }

//     // function playAudio(audioUrl) {
//     //     const audio = new Audio(audioUrl);
//     //     audio.play();
//     // }

//     // function setText(event) {
//     //     setTextToGenerateSpeech(event.target.value);
//     // }

//     return (
//         // <div className="Text text-white">
//         //     <h3>Text To Speech </h3>
//         //     <input className="text-black" value={text} onChange={setText} />
//         //     <button onClick={generateTextToSpeech}> Text to Speech </button>
//         //     <h3 > {response} </h3>
//         // </div>
//         <>
//             {showErrorComponent && <ErrorHandler errorMessage={errorMessage}></ErrorHandler>}
//         </>
//     );
// }

// export default TextToSpeech;