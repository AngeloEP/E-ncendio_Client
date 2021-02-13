import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';

import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR,
    SIGUIENTE_IMAGEN
} from '../../types';
import clienteAxios from '../../config/axios';

const ImageState = props => {
    const initialState = {
        imagenes: [],
        largoImagenes: 0,
        errores: [],
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState)

    const obtenerImagenes = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/images')
            dispatch({
                type: OBTENER_IMAGENES,
                payload: respuesta.data.imagenes
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_ERROR,
                payload: error
            })
        }
    }


    return (
        <imageContext.Provider
            value={{
                imagenes: state.imagenes,
                largoImagenes: state.largoImagenes,
                imagenActual: state.imagenActual,
                obtenerImagenes,
            }}
        >
            {props.children}
        </imageContext.Provider>
    )
}

export default ImageState;