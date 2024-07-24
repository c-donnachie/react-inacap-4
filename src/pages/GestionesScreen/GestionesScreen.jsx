import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { MyTable } from '@/components/MyTable/MyTable'
import { MyModal } from '@/components/MyModal/MyModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '@/hooks/useFetchData'
import { formatDate } from "@/utils/format";
import { columns } from './data.js';
import { useSelectedData } from '@/context/SelectedDataContext';
import { useDisclosure } from '@nextui-org/react';
import { DeleteConfirmation } from '@/components/DeleteConfirmation/DeleteConfirmation';
import { apiGetGestiones } from '@/services/ApiGestionesService.js';
import { apiDeleteGestion } from '@/services/ApiGestionesService.js';

export const GestionesScreen = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
    const { data, dataLoading, refetch } = useFetchData(apiGetGestiones);

    //TODO: mejorar la transfromacion de datos
    const transformData = (data) => {
        return data.map(item => ({
            id: item.id_gestion,
            id_usuario: item.id_usuario,
            id_cliente: item.id_cliente,
            id_tipo_gestion: item.id_tipo_gestion,
            id_resultado: item.id_resultado,
            nombre: item.comentarios,
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
            id_gestion: selectedData.id,
            id_usuario: selectedData.id_usuario,
            id_cliente: selectedData.id_cliente,
            id_tipo_gestion: selectedData.id_tipo_gestion,
            id_resultado: selectedData.id_resultado,
            comentarios: selectedData.nombre,
            fecha_registro: selectedData.fecha_registro,
        })
        navigate(`/gestiones/edit`)
    }, [navigate, setSelectedData])


    const handleDelete = React.useCallback(async () => {
        try {
            await apiDeleteGestion(selectedId)
            toast.success('Gestion eliminada correctamente')
            refetch()
            onClose()
        } catch (error) {
            toast.error('La gestion no se puede eliminar, tiene registros asociados')
            onClose()
        }
    }, [])

    return (
        <PrimaryLayout>
            <h1 className='mb-4'>Gestiones</h1>

            <div className='w-[90%]'>
                <MyTable
                    data={data}
                    transformData={transformData}
                    columns={columns}
                    dataLoading={dataLoading}
                    handleCreate={() => navigate('/gestiones/create')}
                    handleEdit={handleEdit}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                />
            </div>

            <MyModal
                content={
                    <DeleteConfirmation
                        text='la gestion'
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