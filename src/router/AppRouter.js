import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        
        dispatch( startChecking() )

    }, [dispatch]);

    if( checking ) {
        return <h5>Espere...</h5>
    }

    return (
        <Router>
            
            <div>

                <Switch>

                    <PublicRoute 
                        path='/login'
                        exact
                        component={ LoginScreen }
                        /* PONEMOS EL DOBLE SIGNO PARA CONVERTIR EL STRING A UN BOOLEANO */
                        isLoggedIn= { !!uid }
                    />

                    <PrivateRoute 
                        path='/'
                        exact
                        component={ CalendarScreen }
                        isLoggedIn= { !!uid }
                    />

                    <Redirect to='/login' />

                </Switch>

            </div>

        </Router>
    )
}
