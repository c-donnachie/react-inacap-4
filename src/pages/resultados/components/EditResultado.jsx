import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelectedData } from '@/context/SelectedDataContext'
import { Button, Input, Text } from '@nextui-org/react'
import { GoBack } from '@/components/GoBack/GoBack'
import { apiUpdateResultado } from '@/services/apiResultadosServices'
import { toast } from 'react-toastify'

export const EditResultado = () => {
    const navigate = useNavigate()
    const { selectedData: data } = useSelectedData()
    const { id } = useParams()

    const inputRef = React.useRef(null)
    const [newResultado, setNewResultado] = React.useState({
        id_resultado: id,
        nombre_resultado: data.nombre_resultado
    })
    const { nombre_resultado } = newResultado

    const [errorMessage, setErrorMessage] = React.useState('');
    const [isInvalid, setIsInvalid] = React.useState(false);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        if (nombre_resultado) {
            setIsInvalid(false);
            setErrorMessage('');
        }
    }, [nombre_resultado])

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewResultado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        if (nombre_resultado.trim() === '') {
            setErrorMessage('Ingresa un nombre');
            setIsInvalid(true);
            return;
        }
    }

    const handleUpdate = async () => {
        if (nombre_resultado.trim() === '') {
            setErrorMessage('Ingresa un nombre');
            setIsInvalid(true);
            return;
        }
        try {
            await apiUpdateResultado(id, newResultado)
            toast.success('Resultado actualizado')
            navigate(-1)
        } catch (error) {
            toast.error('Error al actualizar el resultado')
        }
    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>EditResultado {id}</h1>

            <GoBack />

            <div className='flex flex-col mt-10 w-[16%]'>
                <Input
                    name='nombre_resultado'
                    type='text'
                    label='Nombre'
                    value={newResultado.nombre_resultado}
                    onChange={handleChange}
                    ref={inputRef}
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? errorMessage : ''}
                    color={isInvalid ? 'danger' : ''}
                />

                <Button
                    className='mt-8'
                    color='secondary'
                    onPress={handleUpdate}
                >
                    Guardar
                </Button>
            </div>
        </PrimaryLayout>
    )
}
