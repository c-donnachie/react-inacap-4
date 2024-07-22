import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetResultados, apiDeleteResultados } from '@/services/apiResultadosServices'
import { MyTable } from '../../components/MyTable/MyTable'
import { useNavigate } from 'react-router-dom'
import { useSelectedData } from '../../context/SelectedDataContext'
import { MyModal } from '../../components/MyModal/MyModal'
import { useDisclosure } from '@nextui-org/react'
import { DeleteResultado } from './components/DeleteResultado'
import { toast } from 'react-toastify'

export const Resultados = React.memo(() => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
    const { data, loading: dataLoading, refetch } = useFetchData(apiGetResultados)
    const navigate = useNavigate()

    const handleEdit = React.useCallback(async (selectedData) => {
        setSelectedData(selectedData)
        navigate(`/edit-resultado/${selectedData.id_resultado}`)
    }, [navigate, setSelectedData])
    
    const handleOpenDeleteModal = React.useCallback((id_resultado) => {
        onOpen()
        setSelectedId(id_resultado)
    }, [onOpen, setSelectedId])
    
    const handleDelete = React.useCallback(async () => {
        await apiDeleteResultados(selectedId)
        refetch()
        onClose()
        toast(`Resultado ${selectedId} eliminado`)
    }, [selectedId, refetch, onClose])

    return (
        <PrimaryLayout>
            <h1 className=''>Resultados</h1>

            <div className='w-[90%]'>
                <MyTable
                    data={data}
                    dataLoading={dataLoading}
                    handleCreate={() => navigate('/create-resultado')}
                    handleEdit={handleEdit}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                />
            </div>

            <MyModal
                title='Agregar resultado'
                content={
                    <DeleteResultado
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
});
