import React, { useReducer } from 'react';
import usuariosContext from './usuariosContext';
import usuariosReducer from './usuariosReducer';

import {
    OBTENER_DISTRIBUCION_EDADES_USUARIOS,
    OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const UsuariosState = props => {
    const initialState = {
        usuarios: [],
        distribucion: [],
        errores: [],
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


    return (
        <usuariosContext.Provider
            value={{
                usuarios: state.usuarios,
                distribucion: state.distribucion,
                obtenerDistribucionEdadesUsuarios,
            }}
        >
            {props.children}
        </usuariosContext.Provider>
    )
}

export default UsuariosState;