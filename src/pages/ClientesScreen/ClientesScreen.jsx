import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { MyTable } from '@/components/MyTable/MyTable'
import { MyModal } from '@/components/MyModal/MyModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetClientes } from '@/services/apiClientesService';
import { formatDate } from "@/utils/format";
import { columns } from './data';
import { useSelectedData } from '@/context/SelectedDataContext';
import { useDisclosure } from '@nextui-org/react';
import { DeleteConfirmation } from '@/components/DeleteConfirmation/DeleteConfirmation';
import { apiDeleteCliente } from '@/services/apiClientesService';


export const ClientesScreen = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
    const { data, dataLoading, refetch } = useFetchData(apiGetClientes)

    //TODO: mejorar la transfromacion de datos
    const transformData = (data) => {
        return data.map(item => ({
            id: item.id_cliente,
            dv: item.dv,
            nombre: item.nombres,
            apellidos: item.apellidos,
            email: item.email,
            celular: item.celular,
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
            id_cliente: selectedData.id,
            dv: selectedData.dv,
            nombres: selectedData.nombre,
            apellidos: selectedData.apellidos,
            email: selectedData.email,
            celular: selectedData.celular,
            fecha_registro: selectedData.fecha_registro,
        })
        navigate(`/clientes/edit`)
    }, [navigate, setSelectedData])


    const handleDelete = React.useCallback(async () => {
        try {
            await apiDeleteCliente(selectedId)
            toast.success('Cliente eliminado correctamente')
            refetch()
            onClose()
        } catch (error) {
            toast.error('Error al eliminar el cliente')
        }
    }, [])

    return (
        <PrimaryLayout>
            <h1 className='mb-4'>Clientes</h1>

            <div className='w-[90%]'>
                <MyTable
                    data={data}
                    transformData={transformData}
                    columns={columns}
                    dataLoading={dataLoading}
                    handleCreate={() => navigate('/clientes/create')}
                    handleEdit={handleEdit}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                />
            </div>

            <MyModal
                title='Agregar resultado'
                content={
                    <DeleteConfirmation
                        text='el tipo de gestion'
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