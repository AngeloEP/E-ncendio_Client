import React, { useReducer } from 'react';
import resetPasswordContext from './resetPasswordContext';
import resetPasswordReducer from './resetPasswordReducer';
import clienteAxios from '../../config/axios';

import {
    VALIDAR_EMAIL_RESET_PASSWORD,
    VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO,
    VALIDAR_EMAIL_RESET_PASSWORD_ERROR,
    VALIDAR_PASSWORD_RESET_PASSWORD,
    VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO,
    VALIDAR_PASSWORD_RESET_PASSWORD_ERROR,
    CAMBIAR_RETURN,
} from '../../types';

import Swal from 'sweetalert2';

const ResetPasswordState = props => {
    
    const initialState = {
        emailerror: false,
        passworderror: false,
        correoUsuario: "",
        code: "",
        returnLogin: false,
        cargandoEnviarCodigo: false,
        cargandoResetearContraseña: false,
    }

    const [ state, dispatch ] = useReducer(resetPasswordReducer, initialState)

    // Funciones
    // enviar codigo al correo

    const cambiarReturn = async () => {
        dispatch({
            type: CAMBIAR_RETURN
        })
    }

    const enviarCodigo = async (data) => {
        try {
            dispatch({
                type: VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.post('/api/auth/send-code', data)
            setTimeout(() => {
                dispatch({
                    type: VALIDAR_EMAIL_RESET_PASSWORD,
                    payload: { codigo: respuesta.data.codigo, correo: data.email }
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Envío exitoso',
                    text: '¡Se ha enviado un código a su correo!',
                })
            }, 1000);

        } catch (error) {
            // console.log(error.response.data.msg)
            console.log(error.response.data)
            dispatch({
                type: VALIDAR_EMAIL_RESET_PASSWORD_ERROR,
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: error.response.data.msg,
            })
        }
    }

    const cambiarContraseña = async (data) => {
        try {
            dispatch({
                type: VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.post('/api/auth/reset-password', data)
            setTimeout(() => {
                dispatch({
                    type: VALIDAR_PASSWORD_RESET_PASSWORD,
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Cambio exitoso',
                    text: respuesta.data.msg,
                })
            }, 1000);

        } catch (error) {
            // console.log(error.response.data.msg)
            console.log(error.response.data)
            dispatch({
                type: VALIDAR_PASSWORD_RESET_PASSWORD_ERROR,
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: error.response.data.msg,
            })
        }
    }

    return (
        <resetPasswordContext.Provider
            value={{
                emailerror: state.emailerror,
                passworderror: state.passworderror,
                correoUsuario: state.correoUsuario,
                code: state.code,
                returnLogin: state.returnLogin,
                cargandoEnviarCodigo: state.cargandoEnviarCodigo,
                cargandoResetearContraseña: state.cargandoResetearContraseña,
                enviarCodigo,
                cambiarContraseña,
                cambiarReturn,
            }}
        >
            {props.children}
        </resetPasswordContext.Provider>
    )
}

export default ResetPasswordState;