import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelectedData } from '@/context/SelectedDataContext'
import { Button, Input } from '@nextui-org/react'
import { GoBack } from '@/components/GoBack/GoBack'
import { toast } from 'react-toastify'

export const EditTipoGestion = () => {
    const navigate = useNavigate()
    const { selectedData: data } = useSelectedData()

    const inputRef = React.useRef(null)

    const [newData, setNewData] = React.useState({
        id_tipo_gestion: data.id_tipo_gestion,
        nombre_tipo_gestion: data.nombre_tipo_gestion,
        fecha_registro: data.fecha_registro,
    })
    const { nombre_tipo_gestion } = newData

    const [errorMessage, setErrorMessage] = React.useState('');
    const [isInvalid, setIsInvalid] = React.useState(false);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        if (nombre_tipo_gestion) {
            setIsInvalid(false);
            setErrorMessage('');
        }
    }, [nombre_tipo_gestion])

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
        if (nombre_tipo_gestion.trim() === '') {
            setErrorMessage('Ingresa un nombre');
            setIsInvalid(true);
            return;
        }
        try {
            await apiUpdateResultado(id, newData)
            toast.success('Resultado actualizado')
            navigate(-1)
        } catch (error) {
            toast.error('Error al actualizar el resultado')
        }
    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>EditResultado</h1>

            <GoBack />

            <div className='flex flex-col mt-10 w-[16%]'>
                <Input
                    name='nombre_resultado'
                    type='text'
                    label='Nombre'
                    value={newData.nombre_tipo_gestion}
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
