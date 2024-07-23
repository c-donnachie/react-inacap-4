import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { MyTable } from '@/components/MyTable/MyTable'
import { MyModal } from '@/components/MyModal/MyModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '@/hooks/useFetchData'
import { formatDate } from "@/utils/format";
import { columns } from './data';
import { useSelectedData } from '@/context/SelectedDataContext';
import { useDisclosure } from '@nextui-org/react';
import { DeleteConfirmation } from '@/components/DeleteConfirmation/DeleteConfirmation';
import { apiDeleteUsuario, apiGetUsuarios } from '@/services/apiUsuarios';

export const UsuariosScreen = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
    const { data, dataLoading, refetch } = useFetchData(apiGetUsuarios)

    //TODO: mejorar la transfromacion de datos
    const transformData = (data) => {
        return data.map(item => ({
            id: item.id_usuario,
            dv: item.dv,
            nombre: item.nombres,
            apellidos: item.apellidos,
            email: item.email,
            celular: item.celular,
            username: item.username,
            password: item.password,
            fecha_registro: formatDate(item.fecha_registro),
        }));
    };

    // Recibe el parametro de myTable
    const handleOpenDeleteModal = React.useCallback((id) => {
        onOpen()
        setSelectedId(id)
    }, [onOpen, setSelectedId])

    const handleEdit = React.useCallback(async (selectedData) => {
        setSelectedData({
            id_usuario: selectedData.id,
            dv: selectedData.dv,
            nombres: selectedData.nombre,
            apellidos: selectedData.apellidos,
            email: selectedData.email,
            celular: selectedData.celular,
            username: selectedData.username,
            password: selectedData.password,
            fecha_registro: selectedData.fecha_registro,
        })
        navigate(`/usuarios/edit`)
    }, [navigate, setSelectedData])


    const handleDelete = React.useCallback(async () => {
        try {
            await apiDeleteUsuario(selectedId)
            toast.success('Usuario eliminado correctamente')
            refetch()
            onClose()
        } catch (error) {
            toast.error('El usuario no se puede eliminar, tiene registros asociados')
            onClose()
        }
    }, [])

    return (
        <PrimaryLayout>
            <h1 className='mb-4'>Usuarios</h1>

            <div className='w-[90%]'>
                <MyTable
                    data={data}
                    transformData={transformData}
                    columns={columns}
                    dataLoading={dataLoading}
                    handleCreate={() => navigate('/usuarios/create')}
                    handleEdit={handleEdit}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                />
            </div>

            <MyModal
                title='Agregar resultado'
                content={
                    <DeleteConfirmation
                        text='el usuario'
                        selectedId={selectedId}
                        onClose={onClose}
                        handleDelete={handleDelete}
                    />
                }
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </PrimaryLayout>
    )
}