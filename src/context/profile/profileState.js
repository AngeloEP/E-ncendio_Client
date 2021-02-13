import React, { useReducer } from 'react';
import profileContext from './profileContext';
import profileReducer from './profileReducer';

import {
    OBTENER_PERFIL_USUARIO,
    OBTENER_PERFIL_USUARIO_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

const ProfileState = props => {
    const initialState = {
        perfiles: [],
        perfil: [],
        errores: [],
        loading: true
    }

    const [ state, dispatch ] = useReducer(profileReducer, initialState)

    const obtenerPerfil = async (user_id) => {
        try {
            const respuesta = await clienteAxios.get(`/api/usuarios/${user_id}/profile`)
            dispatch({
                type: OBTENER_PERFIL_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_PERFIL_USUARIO_ERROR,
                payload: error
            })
        }
    }

    return(
        <profileContext.Provider
            value={{
                perfiles: state.perfiles,
                perfil: state.perfil,
                loading: state.loading,
                obtenerPerfil,
            }}
        >
            { props.children }
        </profileContext.Provider>
    )
}

export default ProfileState;