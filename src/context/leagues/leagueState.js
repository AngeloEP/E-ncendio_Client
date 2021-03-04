import React, { useReducer } from 'react';
import leagueContext from './leagueContext';
import leagueReducer from './leagueReducer';

import {
    OBTENER_DISTRIBUCION_LIGAS,
    OBTENER_DISTRIBUCION_LIGAS_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const LeagueState = props => {
    const initialState = {
        ligas: [],
        errores: [],
    }

    const [ state, dispatch ] = useReducer(leagueReducer, initialState)
    
    const obtenerDistribucionDeLigas = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/leagues/count')
            dispatch({
                type: OBTENER_DISTRIBUCION_LIGAS,
                payload: respuesta.data
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_DISTRIBUCION_LIGAS_ERROR,
                payload: error
            })
        }
    }
    return (
        <leagueContext.Provider
            value={{
                ligas: state.ligas,
                obtenerDistribucionDeLigas,
            }}
        >
            {props.children}
        </leagueContext.Provider>
    )
}

export default LeagueState;