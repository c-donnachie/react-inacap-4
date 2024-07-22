import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { GoBack } from '@/components/GoBack/GoBack'

export const CreateTipoGestion = () => {
    return (
        <PrimaryLayout>

            <h1 className='text-4xl font-semibold'>Crear tipo de gestion</h1>
            <GoBack />

            <div className='flex flex-col mt-10 w-[16%]'>

            </div>
        </PrimaryLayout>
    )
}