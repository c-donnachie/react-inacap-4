import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { GoBack } from '@/components/GoBack/GoBack'
import {  useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiCreateCliente } from '@/services/apiClientesService'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const schema = yup.object().shape({
    id_cliente: yup.string().required('El Rut Cliente es obligatorio'),
    dv: yup.string().required('El Código Verificador es obligatorio'),
    nombres: yup.string().required('Los Nombres son obligatorios'),
    apellidos: yup.string().required('Los Apellidos son obligatorios'),
    email: yup.string().email('El Email no es válido').required('El Email es obligatorio'),
    celular: yup.string().required('El Celular es obligatorio'),
})

export const CreateCliente = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSave = async (data) => {
        const fecha_registro = getCurrentDate();
        const finalData = { ...data, fecha_registro };

        await apiCreateCliente(finalData);
        navigate('/clientes');
        toast.success('Resultado creado');
    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Crear cliente</h1>

            <GoBack />

            <form onSubmit={handleSubmit(handleSave)} className='flex flex-col mt-10 w-[16%] gap-4'>
                <Input
                    {...register('id_cliente')}
                    type='number'
                    label='Rut Cliente'
                    isInvalid={!!errors.id_cliente}
                    errorMessage={errors.id_cliente?.message}
                    color={errors.id_cliente ? 'danger' : ''}
                />

                <Input
                    {...register('dv')}
                    type='text'
                    maxLength={1}
                    label='Codigo verificador'
                    isInvalid={!!errors.dv}
                    errorMessage={errors.dv?.message}
                    color={errors.dv ? 'danger' : ''}
                />

                <Input
                    {...register('nombres')}
                    type='text'
                    label='Nombres'
                    isInvalid={!!errors.nombres}
                    errorMessage={errors.nombres?.message}
                    color={errors.nombres ? 'danger' : ''}
                />

                <Input
                    {...register('apellidos')}
                    type='text'
                    label='Apellidos'
                    isInvalid={!!errors.apellidos}
                    errorMessage={errors.apellidos?.message}
                    color={errors.apellidos ? 'danger' : ''}
                />

                <Input
                    {...register('email')}
                    type='email'
                    label='Email'
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    color={errors.email ? 'danger' : ''}
                />

                <Input
                    {...register('celular')}
                    type='number'
                    label='Celular'
                    isInvalid={!!errors.celular}
                    errorMessage={errors.celular?.message}
                    color={errors.celular ? 'danger' : ''}
                />

                <Button
                    className='mt-4'
                    color='secondary'
                    type='submit'
                >
                    Guardar
                </Button>
            </form>
        </PrimaryLayout>
    )
}
