import * as React from 'react'
import { MainRouter } from './router/MainRouter'
import { SelectedDataProvider } from '@/context/SelectedDataContext'

function App() {

  return (
    <div className='w-screen'>
      <SelectedDataProvider>

        <MainRouter />

      </SelectedDataProvider>
    </div>

  )
}

export default App
