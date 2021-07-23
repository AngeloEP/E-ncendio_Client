import React, { useReducer } from 'react';
import profileContext from './profileContext';
import profileReducer from './profileReducer';

import {
    OBTENER_TODOS_LOS_PERFILES,
    OBTENER_TODOS_LOS_PERFILES_ERROR,
    OBTENER_PERFIL_USUARIO,
    OBTENER_PERFIL_USUARIO_ERROR,
    ACTUALIZAR_PERFIL,
    ACTUALIZAR_PERFIL_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

const ProfileState = props => {
    const initialState = {
        perfiles: [],
        perfil: null,
        errores: [],
        loading: true
    }

    const [ state, dispatch ] = useReducer(profileReducer, initialState)

    const delay = (ms) =>
        new Promise((res) => {
            setTimeout(() => {
            res()
            }, ms)
        })

    const obtenerPerfil = async () => {
        while(true) {
            try {
                const respuesta = await clienteAxios.get(`/api/usuarios/profile`)
                dispatch({
                    type: OBTENER_PERFIL_USUARIO,
                    payload: respuesta.data
                })

            } catch (error) {
                // console.log(error)
                dispatch({
                    type: OBTENER_PERFIL_USUARIO_ERROR,
                    payload: error
                })
            }
            await delay(6000)
        }
    }

    const obtenerTodosLosPerfiles = async () => {
        try {
            const respuesta = await clienteAxios.get(`/api/profiles`)
            let newProfiles = respuesta.data.perfiles
            for (const [ index, ] of Object.entries(respuesta.data.perfiles) ) {
                newProfiles[index] = {
                    user_id: newProfiles[index].user_id._id,
                    Imagen: {
                        url: newProfiles[index].user_id.urlFile,
                        frameUsedCss: newProfiles[index].frameUsedCss,
                    },
                    Nombre: newProfiles[index].user_id.firstname,
                    Apodo: newProfiles[index].nicknameUsed,
                    Liga: newProfiles[index].league_id.league,
                    Edad: newProfiles[index].user_id.age,
                    Puntuación: newProfiles[index].score
                }
            }
            dispatch({
                type: OBTENER_TODOS_LOS_PERFILES,
                payload: newProfiles
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_TODOS_LOS_PERFILES_ERROR,
                payload: error
            })
        }
    }

    const actualizarPerfil = async (perfil) => {
        try {
            const resultado = await clienteAxios.put(`/api/profiles/${perfil._id}`, perfil )
            dispatch({
                type: ACTUALIZAR_PERFIL,
                payload: resultado.data.perfil
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: ACTUALIZAR_PERFIL_ERROR,
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
                actualizarPerfil,
                obtenerTodosLosPerfiles,
            }}
        >
            { props.children }
        </profileContext.Provider>
    )
}

export default ProfileState;