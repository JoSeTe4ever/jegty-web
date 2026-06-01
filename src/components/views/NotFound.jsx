import React from 'react'
import './views.scss'

export const NotFound = () => {
    return (
        <div className="notFound">
            <span className="notFoundKicker">404 route</span>
            <h2>Zona fuera del mapa</h2>
            <p>Esta pantalla no existe en Jegty. Vuelve al menu lateral para seguir creando partidas.</p>
        </div>
    )
}
