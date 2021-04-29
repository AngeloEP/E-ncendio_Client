import React, { useReducer } from 'react';
import usuariosContext from './usuariosContext';
import usuariosReducer from './usuariosReducer';

import Swal from 'sweetalert2';


import {
    OBTENER_DISTRIBUCION_EDADES_USUARIOS,
    OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
    OBTENER_USUARIOS,
    OBTENER_USUARIOS_ERROR,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO,
} from '../../types';
import clienteAxios from '../../config/axios';

const UsuariosState = props => {
    const initialState = {
        usuarios: [],
        distribucion: [],
        errores: [],
        mensajeUsuarios: null,
        cargandoAdminYBloqueo: false,
        cargandoImagenesUsuarioDesdeAdmin: false,
        cargandoPalabrasUsuarioDesdeAdmin: false,
        imagenesPorUsuario: [],
        palabrasPorUsuario: [],
    }

    const [ state, dispatch ] = useReducer(usuariosReducer, initialState)

    const obtenerDistribucionEdadesUsuarios = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/usuarios/rangeAge')
            dispatch({
                type: OBTENER_DISTRIBUCION_EDADES_USUARIOS,
                payload: respuesta.data
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
                payload: error
            })
        }
    }

    const obtenerTodosLosUsuarios = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/usuarios')
            dispatch({
                type: OBTENER_USUARIOS,
                payload: respuesta.data.usuarios
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_USUARIOS_ERROR,
                payload: error
            })
        }
    }

    const modificarAdminYBloqueo = async (user_id, data) => {
        try {
            dispatch({
                type: MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.put(`/api/usuarios/${user_id}/adminYbloqueo`, data)

            Swal.fire({
                icon: 'success',
                title: 'Modificación exitosa',
                text: respuesta.data.msg,
            })
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_USUARIO_ADMIN_BLOQUEO,
                    payload: respuesta.data.msg
                })
            }, 1000);

        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo modificar su usuario, inténtelo nuevamente!',
            })

            
            
        }
    }

    const obtenerImagenesUsuarioAdmin = async (user_id) => {
        try {
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/usuarios/${user_id}/images`)
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN,
                payload: respuesta.data.imagenes
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR,
                payload: error
            })
        }
    }

    const obtenerPalabrasUsuarioAdmin = async (user_id) => {
        try {
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/usuarios/${user_id}/words`)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR,
                payload: error
            })
        }
    }

    return (
        <usuariosContext.Provider
            value={{
                usuarios: state.usuarios,
                distribucion: state.distribucion,
                mensajeUsuarios: state.mensajeUsuarios,
                cargandoAdminYBloqueo: state.cargandoAdminYBloqueo,
                imagenesPorUsuario: state.imagenesPorUsuario,
                cargandoImagenesUsuarioDesdeAdmin: state.cargandoImagenesUsuarioDesdeAdmin,
                palabrasPorUsuario: state.palabrasPorUsuario,
                cargandoPalabrasUsuarioDesdeAdmin: state.cargandoPalabrasUsuarioDesdeAdmin,
                obtenerDistribucionEdadesUsuarios,
                obtenerTodosLosUsuarios,
                modificarAdminYBloqueo,
                obtenerImagenesUsuarioAdmin,
                obtenerPalabrasUsuarioAdmin
            }}
        >
            {props.children}
        </usuariosContext.Provider>
    )
}

export default UsuariosState;