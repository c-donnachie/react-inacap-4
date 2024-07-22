import * as React from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout/PrimaryLayout'
import { useFetchData } from '@/hooks/useFetchData'
import { apiGetResultados, apiDeleteResultados } from '@/services/apiResultadosServices'
import { MyTable } from '../../components/MyTable/MyTable'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelectedData } from '../../context/SelectedDataContext'

export const Resultados = () => {
    const { setSelectedData } = useSelectedData();
    const { data, loading: dataLoading } = useFetchData(apiGetResultados)
    const navigate = useNavigate()

    const handleEdit = async (selectedData) => {
        navigate(`/edit-resultado/${selectedData.id_resultado}`)
        setSelectedData(selectedData)
    }

    const handleDelete = async (id_resultado) => {
        toast.success(id_resultado)
        // await apiDeleteResultados(id_resultado)
    }

    return (
        <PrimaryLayout>
            <h1 className=''>Resultados</h1>

            <div className='w-[90%]'>
                <MyTable
                    data={data}
                    dataLoading={dataLoading}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </div>
        </PrimaryLayout>
    )
}
