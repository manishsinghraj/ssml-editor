import React from 'react'

const ErrorHandler = (props) => {
    const { errorMessage } = props;

  return (
      <div className='flex border border-solid border-fuchsia-500 w-3/5 h-15 mt-4 rounded-lg p-4'>
          <div className='flex justify-between w-full  text-white'>
              <h2 className='text-red-500'>{errorMessage}</h2>
          </div>
      </div>
  )
}

export default ErrorHandler