import React, { useReducer } from 'react';
import levelContext from './levelContext';
import levelReducer from './levelReducer';
import clienteAxios from '../../config/axios';

import {
    OBTENER_NIVEL_IMAGENES_USUARIO,
    OBTENER_NIVEL_IMAGENES_USUARIO_ERROR
} from '../../types';

const LevelState = props => {
    const initialState = {
        niveles: [],
        nivel: null,
        errores: [],
        loadingLevel: true
    }

    const [ state, dispatch ] = useReducer(levelReducer, initialState)

    const obtenerNivelImagenesUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get(`/api/usuarios/level-images`)
            dispatch({
                type: OBTENER_NIVEL_IMAGENES_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_NIVEL_IMAGENES_USUARIO,
                payload: error
            })
        }
    }

    return (
        <levelContext.Provider
            value={{
                nivel: state.nivel,
                loadingLevel: state.loadingLevel,
                obtenerNivelImagenesUsuario
            }}
        >
            { props.children }
        </levelContext.Provider>
    )
}

export default LevelState;