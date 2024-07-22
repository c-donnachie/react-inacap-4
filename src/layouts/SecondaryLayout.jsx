import React from 'react'

export const SecondaryLayout = ({ children }) => {
    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            {children}
        </div>
    )
}
