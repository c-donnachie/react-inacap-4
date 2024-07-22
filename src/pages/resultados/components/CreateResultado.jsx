import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { GoBack } from '@/components/GoBack/GoBack'
import { Button, Input } from '@nextui-org/react'
import { apiCreateResultado } from '@/services/apiResultadosServices'
import { toast } from 'react-toastify'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { useNavigate } from 'react-router-dom'

export const CreateResultado = () => {
    const Navigate = useNavigate()
    const [newResultado, setNewResultado] = React.useState({
        nombre_resultado: "",
        fecha_registro: getCurrentDate()
    })

    const { nombre_resultado } = newResultado
    const inputRef = React.useRef(null)

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
    }

    const handleSave = async () => {
        if (nombre_resultado.trim() === '') {
            setErrorMessage('Ingresa un nombre');
            setIsInvalid(true);
            return;
        }
        await apiCreateResultado(newResultado)
        Navigate('/resultados')
        toast.success('Resultado creado')
    }
    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Crear resultado</h1>

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
                    onPress={handleSave}
                >
                    Guardar
                </Button>
            </div>
        </PrimaryLayout>
    )
}