import * as React from 'react'
import { Button } from '@nextui-org/react';

export const DeleteTipoGestion = ({ selectedId, onClose, handleDelete }) => {

    return (
        <div className='flex flex-col justify-center px-10 py-4'>

            <h2 className='text-center text-lg font-bold'>¿Estás seguro de eliminar el tipo de gestion con id: <span className='px-2 text-xl font-bold text-red-500'>{selectedId}</span>?</h2>

            <div className='flex justify-center mt-10 gap-4'>
                <Button
                    onPress={onClose}
                    color='default'
                    variant='light'>
                    Cancelar
                </Button>
                <Button
                    onPress={handleDelete}
                    color='danger'>
                    Eliminar
                </Button>
            </div>
        </div>
    )
}