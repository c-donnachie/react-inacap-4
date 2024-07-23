import * as React from 'react'
import { Button, Input } from '@nextui-org/react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { GoBack } from '@/components/GoBack/GoBack'
import { useNavigate } from 'react-router-dom'
import { useSelectedData } from '@/context/SelectedDataContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { apiUpdateUsuario } from '@/services/apiUsuarios'

const schema = yup.object().shape({
    dv: yup.string().required('El Código Verificador es obligatorio'),
    nombres: yup.string().required('Los Nombres son obligatorios'),
    apellidos: yup.string().required('Los Apellidos son obligatorios'),
    email: yup.string().email('El Email no es válido').required('El Email es obligatorio'),
    celular: yup.string().required('El Celular es obligatorio'),
    username: yup.string().required('El Username es obligatorio'),
    password: yup.string().required('La Contraseña es obligatoria'),
})

export const EditUsuario = () => {
    const navigate = useNavigate();
    const { selectedData } = useSelectedData();

    // Carga los datos de selectedData en el formulario (schema)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dv: selectedData?.dv || '',
            nombres: selectedData?.nombres || '',
            apellidos: selectedData?.apellidos || '',
            email: selectedData?.email || '',
            celular: selectedData?.celular || '',
            username: selectedData?.username || '',
            password: selectedData?.password || '',
        }
    })

    React.useEffect(() => {
        if (selectedData) {
            setValue('dv', selectedData.dv)
            setValue('nombres', selectedData.nombres)
            setValue('apellidos', selectedData.apellidos)
            setValue('email', selectedData.email)
            setValue('celular', selectedData.celular)
            setValue('username', selectedData.username)
        }
    }, [selectedData, setValue])

    const handleSaveEdit = async (data) => {
        await apiUpdateUsuario(data, selectedData.id_usuario);
        navigate('/usuarios');
        toast.success('Usuario actualizado correctamente');

    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Editar usuario</h1>

            <GoBack />

            <form onSubmit={handleSubmit(handleSaveEdit)} className='flex flex-col mt-10 w-[16%] gap-4'>
                <Input
                    {...register('dv')}
                    type='text'
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
