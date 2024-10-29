import React, { useState } from 'react';
import audioUrl from "../assets/audio.mp3"; 
import Audio from './Audio';

const Info = () => {
    const [copied, setCopied] = useState(false);
    const email = "manishpurohit97@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); 
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <main className='flex justify-center items-center text-white space-y-3.5 mt-12'>
            <div className='w-3/5 space-y-6 border-4 border-solid border-red-500 p-4 rounded-lg bg-gray-800'>
                <span className='text-2xl'>Note:</span>
                <h2 className='text-xl opacity-70'>
                    The AWS service free tier for this project has ended, and any usage now incurs additional charges to me.<br></br>
                    You can view a demo video below to see how the application works. If you'd like to try the project,
                    please email me to request access.
                    <a onClick={copyToClipboard} className='underline ml-1 text-green-300' title="Click to copy">
                        {email}
                    </a>
                    {copied && <span className='ml-6 text-white bg-black'>Copied!</span>}
                </h2>
                <div>
                    <img src="src/assets/ssml-demo-gif.gif" alt="ssml-demo-vid" />
                </div>
                <div>
                    <Audio audioUrl={audioUrl} />
                </div>
            </div>
        </main>
    );
};

export default Info;
