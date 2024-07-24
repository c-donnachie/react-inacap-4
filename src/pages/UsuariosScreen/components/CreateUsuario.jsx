import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { GoBack } from '@/components/GoBack/GoBack'
import {  useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { toast } from 'react-toastify'
import { apiCreateUsuario } from '@/services/apiUsuarios'
import * as yup from 'yup'

const schema = yup.object().shape({
    id_usuario: yup.string().required('El Rut Usuario es obligatorio'),
    dv: yup.string().required('El Código Verificador es obligatorio'),
    nombres: yup.string().required('Los Nombres son obligatorios'),
    apellidos: yup.string().required('Los Apellidos son obligatorios'),
    email: yup.string().email('El Email no es válido').required('El Email es obligatorio'),
    celular: yup.string().required('El Celular es obligatorio'),
    username: yup.string().required('El Username es obligatorio'),
    password: yup.string().required('La Contraseña es obligatoria'),
})

export const CreateUsuario = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSave = async (data) => {
        const fecha_registro = getCurrentDate();
        const finalData = { ...data, fecha_registro };

        await apiCreateUsuario(finalData);
        navigate('/usuarios');
        toast.success('Usuario creado');
    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Crear usuario</h1>

            <GoBack />

            <form onSubmit={handleSubmit(handleSave)} className='flex flex-col mt-10 w-[16%] gap-4'>
                <Input
                    {...register('id_usuario')}
                    type='number'
                    label='Rut Usuario'
                    isInvalid={!!errors.id_usuario}
                    errorMessage={errors.id_usuario?.message}
                    color={errors.id_usuario ? 'danger' : ''}
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

                <Input
                    {...register('username')}
                    type='text'
                    label='Username'
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    color={errors.username ? 'danger' : ''}
                />

                <Input
                    {...register('password')}
                    type='password'
                    label='Contraseña'
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    color={errors.password ? 'danger' : ''}
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
