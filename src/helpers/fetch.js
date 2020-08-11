const baseUrl = process.env.REACT_APP_API_URL;

/* POR DEFECTO DEJAREMOS EL METODO COMO GET */
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url )
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            /* ANEXAMOS EL BODY COMO UN STRING */
            body: JSON.stringify( data )
        })
    }

}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            /* ANEXAMOS EL BODY COMO UN STRING */
            body: JSON.stringify( data )
        });
    }

}

export {
    fetchSinToken,
    fetchConToken
}