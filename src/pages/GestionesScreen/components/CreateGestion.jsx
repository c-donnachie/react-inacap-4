import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetUsuarios } from '@/services/apiUsuarios'
import { apiGetClientes } from '@/services/apiClientesService'
import { GoBack } from '@/components/GoBack/GoBack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { apiGetTipoGestion } from '@/services/apiTipoGestionService'
import { apiGetResultados } from '@/services/apiResultadosServices'
import { useNavigate } from 'react-router-dom'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { toast } from 'react-toastify'
import { apiCreateGestion } from '@/services/ApiGestionesService'

const schema = yup.object().shape({
    id_usuario: yup.string().required('El usuario es obligatorio'),
    id_cliente: yup.string().required('El cliente es obligatorio'),
    id_tipo_gestion: yup.string().required('El tipo de gestion es obligatorio'),
    id_resultado: yup.string().required('El resultado es obligatorio'),
    comentarios: yup.string().required('Los comentarios son obligatorios'),
})

export const CreateGestion = () => {
    const { data: usuarios, loading: loadingUsuarios } = useFetchData(apiGetUsuarios)
    const { data: clientes, loading: loadingClientes } = useFetchData(apiGetClientes)
    const { data: tipoGestion, loading: loadingTipoGestion } = useFetchData(apiGetTipoGestion)
    const { data: resultados, loading: loadingResultados } = useFetchData(apiGetResultados)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSave = async (data) => {
        console.log(data)
        const fecha_registro = getCurrentDate();
        const finalData = { ...data, fecha_registro };

        try {
            await apiCreateGestion(finalData);
            navigate('/gestiones');
            toast.success('Gestion creada');
        } catch (error) {
            toast.error('Error al crear la gestion');
        }
    }

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Crear gestion</h1>
            <GoBack />
            <form onSubmit={handleSubmit(handleSave)} className='flex flex-col mt-10 w-[16%] gap-4'>
                <Select
                    {...register('id_usuario')}
                    className="max-w-auto"
                    label="Usuario"
                    placeholder="Selecciona un usuario"
                    isInvalid={!!errors.id_usuario}
                    errorMessage={errors.id_usuario?.message}
                    color={errors.id_usuario ? 'danger' : ''}
                    disabled={loadingUsuarios}
                    required
                >
                    {!loadingUsuarios && usuarios.map((item) => (
                        <SelectItem key={item.id_usuario} value={item.id_usuario}>
                            {item.nombres}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    {...register('id_cliente')}
                    className="max-w-auto"
                    label="Cliente"
                    placeholder="Selecciona un cliente"
                    isInvalid={!!errors.id_cliente}
                    errorMessage={errors.id_cliente?.message}
                    color={errors.id_cliente ? 'danger' : ''}
                    disabled={loadingClientes}
                    required
                >
                    {!loadingClientes && clientes.map((item) => (
                        <SelectItem key={item.id_cliente} value={item.id_cliente}>
                            {item.nombres}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    {...register('id_tipo_gestion')}
                    className="max-w-auto"
                    label="Gestion"
                    placeholder="Selecciona un tipo de gestion"
                    isInvalid={!!errors.id_tipo_gestion}
                    errorMessage={errors.id_tipo_gestion?.message}
                    color={errors.id_tipo_gestion ? 'danger' : ''}
                    disabled={loadingTipoGestion}
                    required
                >
                    {!loadingTipoGestion && tipoGestion.map((item) => (
                        <SelectItem key={item.id_tipo_gestion} value={item.id_tipo_gestion}>
                            {item.nombre_tipo_gestion}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    {...register('id_resultado')}
                    className="max-w-auto"
                    label="Resultado"
                    placeholder="Selecciona un resultado"
                    isInvalid={!!errors.id_resultado}
                    errorMessage={errors.id_resultado?.message}
                    color={errors.id_resultado ? 'danger' : ''}
                    disabled={loadingResultados}
                    required
                >
                    {!loadingResultados && resultados.map((item) => (
                        <SelectItem key={item.id_resultado} value={item.id_resultado}>
                            {item.nombre_resultado}
                        </SelectItem>
                    ))}
                </Select>

                <Input
                    {...register('comentarios')}
                    type='text'
                    label='Comentarios'
                    isInvalid={!!errors.comentarios}
                    errorMessage={errors.comentarios?.message}
                    color={errors.comentarios ? 'danger' : ''}
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
