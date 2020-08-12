import moment from 'moment';

/* LO IGUALAMOS A UN ARREGLO VACIO PARA TENER LAS AYUDAS */
export const prepareEvents = ( events = [] ) => {

    return events.map(
        (e) => ({
            
            /* ESTE EVENTOS VA A TENER LAS MISMAS PROPIEDADES, LO UNICO QUE MODIFICAREMOS
            ES LA FECHA */
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate(),

        })
    );
}