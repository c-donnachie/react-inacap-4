import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { MyTable } from '@/components/MyTable/MyTable';
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetTipoGestion } from '@/services/apiTipoGestionService'
import { formatDate } from "@/utils/format";
import { toast } from 'react-toastify';
import { columns } from './data'
import { useDisclosure } from '@nextui-org/react';
import { useSelectedData } from '@/context/SelectedDataContext';
import { useNavigate } from 'react-router-dom';
import { apiDeleteTipoGestion } from '@/services/apiTipoGestionService';
import { MyModal } from '@/components/MyModal/MyModal';
import { DeleteTipoGestion } from './components/DeleteTipoGestion';

export const TipoDeGestionScreen = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { setSelectedData, setSelectedId, selectedId } = useSelectedData();
  const { data, loading: dataLoading, refetch } = useFetchData(apiGetTipoGestion)
  const navigate = useNavigate()

  const transformData = (data) => {
    return data.map(item => ({
      id: item.id_tipo_gestion,
      nombre: item.nombre_tipo_gestion,
      fecha_registro: formatDate(item.fecha_registro),
    }));
  };

  const handleEdit = React.useCallback(async (selectedData) => {
    setSelectedData(selectedData)
    navigate(`/edit-tipo-gestion`)
  }, [navigate, setSelectedData])

  const handleOpenDeleteModal = React.useCallback((id_resultado) => {
    onOpen()
    setSelectedId(id_resultado)
  }, [onOpen, setSelectedId])

  const handleDelete = React.useCallback(async () => {
    await apiDeleteTipoGestion(selectedId)
    refetch()
    onClose()
    toast(`Resultado ${selectedId} eliminado`)
  }, [selectedId, refetch, onClose])


  return (
    <PrimaryLayout>
      <h1 className='mb-4'>Tipo de gestion</h1>

      <div className='w-[90%]'>
        <MyTable
          data={data}
          transformData={transformData}
          columns={columns}
          dataLoading={dataLoading}
          handleCreate={() => navigate('/create-tipo-gestion')}
          handleEdit={handleEdit}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />
      </div>

      <MyModal
        title='Agregar resultado'
        content={
          <DeleteTipoGestion
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