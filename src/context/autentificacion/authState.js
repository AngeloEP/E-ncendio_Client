import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';


import Swal from 'sweetalert2';

import {
    REGISTRO_EXITOSO_CARGANDO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    MODIFICAR_USUARIO_CARGANDO,
    MODIFICAR_USUARIO,
    MODIFICAR_USUARIO_ERROR,
    MODIFICAR_USUARIO_SALIR,
} from '../../types/';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
        cargandoRegistroUsuario: false,
        cargandoModificacionUsuario: false,
        modificacionUsuarioExitosa: false,
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)

    // Las funciones
    const registrarUsuario = async (datos) => {
        try {
            dispatch({
                type: REGISTRO_EXITOSO_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Su perfil de usuario ha sido creado!',
            })
            setTimeout(() => {
                dispatch({
                    type: REGISTRO_EXITOSO,
                    payload: respuesta.data
                })
            }, 1000);

            // Obtener el usuario
            // usuarioAutenticado()
        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo registar su usuario, inténtelo nuevamente!',
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            // TODO: Función para enviar el token por headers
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            // console.log(respuesta)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            // console.log(datos)
            const respuesta = await clienteAxios.post('/api/auth', datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario
            usuarioAutenticado()

        } catch (error) {
            // console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesión = async () => {
        try {
            dispatch({
                type: CERRAR_SESION
            })
            await clienteAxios.get(`/api/auth/logout`)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo cerrar su sesión, inténtelo nuevamente!',
            })
        }
    }

    const modificarUsuario = async (usuario, usuario_id) => {
        try {
            dispatch({
                type: MODIFICAR_USUARIO_CARGANDO,
                payload: true
            })
            // console.log(usuario, usuario_id)
            // return
            const resultado = await clienteAxios.put(`/api/usuarios/profile/edit/${usuario_id}`, usuario )
            // console.log("authState: ", resultado.data)

            Swal.fire({
                icon: 'success',
                title: 'Modificación exitosa',
                text: 'Su perfil de usuario ha sido modificado!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_USUARIO,
                    payload: resultado.data.usuarioAntiguo
                })
            }, 1500);

        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_USUARIO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo modificar su usuario, inténtelo nuevamente!',
            })
        }
    }

    const cambiarStateModificacionUsuario = async () => {
        dispatch({
            type: MODIFICAR_USUARIO_SALIR,
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                cargandoRegistroUsuario: state.cargandoRegistroUsuario,
                cargandoModificacionUsuario: state.cargandoModificacionUsuario,
                modificacionUsuarioExitosa: state.modificacionUsuarioExitosa,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesión,
                modificarUsuario,
                cambiarStateModificacionUsuario,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;