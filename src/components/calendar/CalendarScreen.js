import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { messages } from '../../helpers/calendarSettings';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent } from '../../actions/events';
import { DeleteEventFab } from '../ui/DeleteEventFab';

/* CAMBIAMOS EL IDIOMA DE MOMENT A ESPAÑOL */
moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    /* CON ESTO PERSONALIZAMOS LOS ESTILOS DEL CALENDARIO */
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>

            <Navbar />

            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages= { messages }
                eventPropGetter= { eventStyleGetter }
                onSelectEvent= { onSelectEvent }
                onView= { onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable= { true }
                onDoubleClickEvent={ onDoubleClick }
                view= { lastView }
                components= {{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                ( activeEvent )
                    &&  <DeleteEventFab />
            }
            
            <CalendarModal />

        </div>
    )
}
