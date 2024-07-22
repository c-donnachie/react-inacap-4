import * as React from 'react'

import { useState } from 'react'

export const MyButton = ({ title }) => {

    const [datos, setDatos] = useState('')

    return (
        <div>
            <h1>{title}</h1>

            {datos}
        </div>
    )
}