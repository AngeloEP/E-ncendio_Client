import React, { useReducer } from 'react';
import tagContext from './tagContext';
import tagReducer from './tagReducer';

import {
    ETIQUETAR_IMAGEN,
    ETIQUETAR_IMAGEN_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

const TagState = props => {
    const initialState = {
        imagenesEtiquetadas: [],
        palabrasEtiquetadas: [],
        errores: [],
    }

    const [ state, dispatch ] = useReducer(tagReducer, initialState)

    const etiquetarImagen = async ( image_id, category_id ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/tag-images/${image_id}/category/${category_id}`)
            dispatch({
                type: ETIQUETAR_IMAGEN,
                payload: []
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: ETIQUETAR_IMAGEN_ERROR,
                payload: error
            })
        }
    }


    return (
        <tagContext.Provider
            value={{
                etiquetarImagen,
            }}
        >
            {props.children}
        </tagContext.Provider>
    )
}

export default TagState;