import React from 'react';
import ReactPlayer from 'react-player';

const Audio = (props) => {
  const  {audioUrl } = props;
  console.log(audioUrl)

  return (
    <div className='flex border border-solid border-fuchsia-500 w-3/5 h-15 mt-4 rounded-lg p-4 text-white' >
      < ReactPlayer
        url={audioUrl}
        controls={true}
        height="50px"
        width="100%"
      />
    </div>
  )
}

export default Audio;