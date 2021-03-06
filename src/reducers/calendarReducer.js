import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Mateo'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
           
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload 
                ]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    /* SI EL E.ID ES EXACTAMENTE IGUAL AL ACTION.PAYLOAD.ID ENTONCES VOY A 
                    REGRESAR EL ACTION.PAYLOAD QUE VA A TENER TODA LA INFORMACION MODIFICADA
                    (EL NUEVO EVENTO) CASO CONTRARIO REGRESA EL EVENTO COMO ESTA */
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                /* FILTER -> QUIERO EVITAR REGRESAR EL QUE LA PERSONA ESTA BORRANDO */
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                /* UNA VEZ BORRADO QUITAMOS LA NOTA ACTIVA */
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                /* ESPARCIMOS TODO LO QUE VENGA EN EL ACTION.PAYLOAD QUE SERIAN LOS EVENTOS */
                events: [ ...action.payload]
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}
