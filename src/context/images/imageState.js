import React, { useReducer } from 'react';
import ImageContext from './imageContext';
import ImageReducer from './iamgeReducer';
import clienteAxios from '../../config/axios';

import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR
} from '../../types/';

const ImageState = props => {
    const initialState = {
        imagenes: [],
        errores: [],
    }

    const [ state, dispatch ] = useReducer(ImageReducer, initialState)

    const obtenerImagenes = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/images')
            console.log(respuesta.data.imagenes)
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
        <ImageContext.Provider
            value={{
                imagenes: state.imagenes,
                obtenerImagenes
            }}
        >
            {props.children}
        </ImageContext.Provider>
    )
}

export default ImageState;