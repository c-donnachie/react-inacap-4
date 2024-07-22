import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'

export const GoBack = () => {
    const navigate = useNavigate()
    return (
        <div className='absolute left-[400px]'>
            <Button onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z" /></svg>
            </Button>
        </div>
    )
}