import React from 'react'

/* ESTE COMPONENTE RECIBE TODA LA INFORMACION DEL EVENTO */
export const CalendarEvent = ({ event }) => {
    
    const { title, user } = event;

    return (
        <div>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </div>
    )
}
