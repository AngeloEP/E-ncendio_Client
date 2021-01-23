import React, { useReducer } from 'react';
import loginContext from './loginContext';
import loginReducer from './loginReducer';
import {
    EMAIL_SUCCESS,
    PASSWORD_SUCCESS,
    VALIDAR_EMAIL,
    VALIDAR_PASSWORD
} from '../../types';



const LoginState = props => {
    
    const initialState = {
        emailerror: false,
        passworderror: false
    }

    const [ state, dispatch ] = useReducer(loginReducer, initialState)

    // Funciones
    // Mostrar error email
    const validarEmail = () => {
        dispatch({
            type: VALIDAR_EMAIL
        })
    }

    // Mostrar error password
    const validarPassword = () => {
        dispatch({
            type: VALIDAR_PASSWORD
        })
    }

    // Login exitoso
    const emailCorrecto = () => {
        dispatch({
            type: EMAIL_SUCCESS
        })
    }

    const passwordCorrecto = () => {
        dispatch({
            type: PASSWORD_SUCCESS
        })
    }

    return (
        <loginContext.Provider
            value={{
                emailerror: state.emailerror,
                passworderror: state.passworderror,
                validarEmail,
                validarPassword,
                emailCorrecto,
                passwordCorrecto
            }}
        >
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState;