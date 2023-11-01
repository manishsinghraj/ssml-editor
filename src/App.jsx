import './index.css'
import Header from './components/Header'
import Tags from './components/Tags'
import TextArea from './components/TextArea'
import TextToSpeech from './components/TextToSpeech'
import Audio from './components/Audio'
import Download from './components/Download'
import data from './assets/data.json';
import React, { useState } from 'react';


function App() {

  const buttons = data;
  const [audioUrl, setAudioUrl] = useState("");
  const [voice, setVoice] = useState("Danielle");
  const [showComponent, setShowComponent] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  const [textToSpeechValue, setTextToSpeechValue] = useState('');
  const [selectedAttributeId, setSelectedAttributeId] = useState(-1);
  const [generateButton, setGenerateButton] = useState(buttons.generate);
  const [disableClick, setDisableClick] = useState(false);

  const generate = [...buttons.generate];


  //click on any ssml Tag, it should show the corresponding ssml Tag Attributes.
  const handleOnclick = (id) => {
    setSelectedAttributeId(id);
    setShowAttributes(true);
  }


  const getTextToSpeechValue = (text, voice) => {
    generate.label = "Generating...";
    setGenerateButton([generate]);
    setTextToSpeechValue(text);
    setVoice(voice);
    setDisableClick(false);
  }

  const getAudioUrl = (url) => {
    generate.label = "done";
    setGenerateButton([generate]);
    setAudioUrl(url);
    setShowComponent(true);
    setDisableClick(true);
  }

  //Change in textArea content,make the generate Label back to "Generate Audio";
  let counter = 0;
  const textAreaContentChanged = () => {
    if (counter < 1) {
      setGenerateButton(buttons.generate);
      setDisableClick(false);
      counter++;
    }
  }

  return (
    <>
      <div className='bg-slate-900 min-h-screen w-screen '>
        <div className='flex flex-col justify-center items-center'>
          <Header></Header>
          <Tags buttons={buttons} click={handleOnclick}></Tags>
          <TextArea buttons={buttons.ssmlAttributes} generateButton={generateButton} disableClick={disableClick} displayAtrributes={showAttributes} selectedAttributeId={selectedAttributeId} textValue={getTextToSpeechValue} textAreaContentChanged={textAreaContentChanged} />
          <TextToSpeech getAudioUrl={getAudioUrl} text={textToSpeechValue} voice={voice} />
          {showComponent && <Audio audioUrl={audioUrl} />}
          {showComponent && <Download buttons={buttons} audioUrl={audioUrl}/>}
        </div>
      </div>
    </>
  )
}

export default App;
