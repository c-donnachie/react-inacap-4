import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useSelectedData } from '@/context/SelectedDataContext'
import { GoBack } from '@/components/GoBack/GoBack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { toast } from 'react-toastify'
import { apiUpdateGestion } from '@/services/ApiGestionesService'
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetUsuarios } from '@/services/apiUsuarios'
import { apiGetClientes } from '@/services/apiClientesService'
import { apiGetTipoGestion } from '@/services/apiTipoGestionService'
import { apiGetResultados } from '@/services/apiResultadosServices'

const schema = yup.object().shape({
    id_usuario: yup.string().required('El usuario es obligatorio'),
    id_cliente: yup.string().required('El cliente es obligatorio'),
    id_tipo_gestion: yup.string().required('El tipo de gestion es obligatorio'),
    id_resultado: yup.string().required('El resultado es obligatorio'),
    comentarios: yup.string().required('Los comentarios son obligatorios'),
})

export const EditGestion = () => {
    const navigate = useNavigate();
    const { selectedData } = useSelectedData();
    const { data: usuarios, loading: loadingUsuarios } = useFetchData(apiGetUsuarios)
    const { data: clientes, loading: loadingClientes } = useFetchData(apiGetClientes)
    const { data: tipoGestion, loading: loadingTipoGestion } = useFetchData(apiGetTipoGestion)
    const { data: resultados, loading: loadingResultados } = useFetchData(apiGetResultados)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            id_usuario: selectedData?.id_usuario || '',
            id_cliente: selectedData?.id_cliente || '',
            id_tipo_gestion: selectedData?.id_tipo_gestion || '',
            id_resultado: selectedData?.id_resultado || '',
            comentarios: selectedData?.comentarios || '',
        }
    })

    React.useEffect(() => {
        if (selectedData) {
            setValue('id_usuario', selectedData.id_usuario)
            setValue('id_cliente', selectedData.id_cliente)
            setValue('id_tipo_gestion', selectedData.id_tipo_gestion)
            setValue('id_resultado', selectedData.id_resultado)
            setValue('comentarios', selectedData.comentarios)
        }
    }, [selectedData, setValue])

    const handleSaveEdit = async (data) => {
        try {
            await apiUpdateGestion(data, selectedData.id_gestion);
            navigate('/gestiones');
            toast.success('Gestion actualizada correctamente');
        } catch (error) {
            toast.error('Error al actualizar la gestion');
        }
    }

    const id_usuario = selectedData?.id_usuario?.toString();
    const id_cliente = selectedData?.id_cliente?.toString();
    const id_tipo_gestion = selectedData?.id_tipo_gestion?.toString();
    const id_resultado = selectedData?.id_resultado?.toString();

    return (
        <PrimaryLayout>
            <h1 className='text-4xl font-semibold'>Editar Gestion</h1>
            <GoBack />
            <form onSubmit={handleSubmit(handleSaveEdit)} className='flex flex-col mt-10 w-[16%] gap-4'>
                <Select
                    {...register('id_usuario')}
                    defaultSelectedKeys={[id_usuario]}
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
                    defaultSelectedKeys={[id_cliente]}
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
                    defaultSelectedKeys={[id_tipo_gestion]}
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
                    defaultSelectedKeys={[id_resultado]}
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
