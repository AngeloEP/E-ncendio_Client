import React, { useReducer } from 'react';
import wordContext from './wordContext';
import wordReducer from './wordReducer';

import {
    OBTENER_PALABRAS,
    OBTENER_PALABRAS_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const WordState = props => {
    const initialState = {
        palabras: [],
        largoPalabras: 0,
        errores: [],
    }

    const [ state, dispatch ] = useReducer(wordReducer, initialState)

    const obtenerPalabras = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/words')
            dispatch({
                type: OBTENER_PALABRAS,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_ERROR,
                payload: error
            })
        }
    }


    return (
        <wordContext.Provider
            value={{
                palabras: state.palabras,
                largoPalabras: state.largoPalabras,
                obtenerPalabras,
            }}
        >
            {props.children}
        </wordContext.Provider>
    )
}

export default WordState;