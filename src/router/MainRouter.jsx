import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from '../pages/HomeScreen/HomeScreen'
import { AboutScreen } from '../pages/AboutScreen/AboutScreen'
import { MyNavbar } from '@/components/MyNavbar/MyNavbar'
import { nav } from '@/constans/nav'
import { Gestiones } from '@/pages/gestiones/Gestiones'
import { NotFound } from '@/pages/NotFound/NotFound'
import { TipoDeGestion } from '@/pages/tipoDeGestion/TipoDeGestion'
import { Resultados } from '@/pages/resultados/Resultados'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { EditResultado } from '@/pages/resultados/components/EditResultado'

export const MainRouter = () => {
    return (
        <BrowserRouter>

            <MyNavbar nav={nav} />

            <ToastContainer
                autoClose={2000}
                stacked
                draggable
                draggablePercent={60}
            />


            <Routes>
                <Route path='/' Component={HomeScreen} />
                <Route path='/tipo-gestion' Component={TipoDeGestion} />
                <Route path='/resultados' Component={Resultados} />
                <Route path='/edit-resultado/:id' Component={EditResultado} />

                <Route path='/gestiones' Component={Gestiones} />

                <Route path='/about' Component={AboutScreen} />

                <Route path='*' Component={NotFound} />

            </Routes>
        </BrowserRouter>
    )
}