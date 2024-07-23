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


export const ClientesScreen = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
    const { data, dataLoading } = useFetchData(apiGetClientes)

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
        setSelectedData(selectedData)
        navigate(`/edit-tipo-gestion`)
    }, [navigate, setSelectedData])


    const handleDelete = React.useCallback(async () => {

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
        </PrimaryLayout>
    )
}