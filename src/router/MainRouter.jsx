import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { nav } from '@/constans/nav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Components
import { MyNavbar } from '@/components/MyNavbar/MyNavbar'

// Pages
import { NotFound } from '@/pages/NotFound/NotFound'
import { TipoDeGestionScreen } from '@/pages/TipoDeGestionScreen/TipoDeGestionScreen'
import { ResultadosScreen } from '@/pages/resultados/ResultadosScreen'
import { EditResultado } from '@/pages/resultados/components/EditResultado'
import { CreateResultado } from '@/pages/resultados/components/CreateResultado'
import { CreateTipoGestion } from '@/pages/TipoDeGestionScreen/components/CreateTipoGestion'
import { EditTipoGestion } from '@/pages/TipoDeGestionScreen/components/EditTipoGestion'
import { HomeScreen } from '@/pages/HomeScreen/HomeScreen'
import { AboutScreen } from '@/pages/AboutScreen/AboutScreen'
import { ClientesScreen } from '@/pages/ClientesScreen/ClientesScreen';
import { CreateCliente } from '@/pages/ClientesScreen/components/CreateCliente';
import { EditCliente } from '@/pages/ClientesScreen/components/EditCliente';
import { UsuariosScreen } from '@/pages/UsuariosScreen/UsuariosScreen';
import { CreateUsuario } from '@/pages/UsuariosScreen/components/CreateUsuario';
import { EditUsuario } from '@/pages/UsuariosScreen/components/EditUsuario';
import { GestionesScreen } from '@/pages/GestionesScreen/GestionesScreen';
import { CreateGestion } from '@/pages/GestionesScreen/components/CreateGestion';
import { EditGestion } from '@/pages/GestionesScreen/components/EditGestion';

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
                <Route path='/tipo-gestion' Component={TipoDeGestionScreen} />
                <Route path='/resultados' Component={ResultadosScreen} />
                <Route path='/create-resultado' Component={CreateResultado} />
                <Route path='/edit-resultado/:id' Component={EditResultado} />

                <Route path='/create-tipo-gestion' Component={CreateTipoGestion} />
                <Route path='/edit-tipo-gestion' Component={EditTipoGestion} />

                <Route path='/clientes' Component={ClientesScreen} />
                <Route path='/clientes/create' Component={CreateCliente} />
                <Route path='/clientes/edit' Component={EditCliente} />

                <Route path='/usuarios' Component={UsuariosScreen} />
                <Route path='/usuarios/create' Component={CreateUsuario} />
                <Route path='/usuarios/edit' Component={EditUsuario} />

                <Route path='/gestiones' Component={GestionesScreen} />
                <Route path='/gestiones/create' Component={CreateGestion} />
                <Route path='/gestiones/edit' Component={EditGestion} />

                <Route path='/about' Component={AboutScreen} />

                <Route path='*' Component={NotFound} />

            </Routes>
        </BrowserRouter>
    )
}