import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { useParams } from 'react-router-dom'
import { useSelectedData } from '../../../context/SelectedDataContext'
import { Button, Input } from '@nextui-org/react'

export const EditResultado = () => {
    const { selectedData: data } = useSelectedData()
    const { id } = useParams()

    const [newResultado, setNewResultado] = React.useState({
        id_resultado: id,
        nombre_resultado: data.nombre_resultado
    })

    const validation = () => {

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewResultado((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSave = () => {

    }

    return (
        <PrimaryLayout>
            <div>EditResultado {id}</div>

            <div className='flex flex-col mt-10 w-[16%]'>
                <Input
                    name='nombre_resultado'
                    type='text'
                    label='Nombre'
                    value={newResultado.nombre_resultado}
                    onChange={handleChange}
                />

                <Button
                    className='mt-8'
                    color='secondary'
                    onPress={handleSave}
                >
                    Guardar
                </Button>
            </div>
        </PrimaryLayout>
    )
}
