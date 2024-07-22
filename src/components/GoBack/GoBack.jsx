import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'

export const GoBack = () => {
    const navigate = useNavigate()
    return (
        <div className='absolute left-[400px]'>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
    )
}