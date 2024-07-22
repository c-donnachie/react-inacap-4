import React from 'react'
import s from './PrimaryLayout.module.css'

export const PrimaryLayout = ({ children }) => {
    return (
        <div className={`${s.bg} flex flex-col items-center min-h-[100vp] pt-2`}>
            {children}
        </div>
    )
}
