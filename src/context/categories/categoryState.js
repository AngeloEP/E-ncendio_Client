import React, { useReducer } from 'react';
import categoryContext from './categoryContext';
import categoryReducer from './categoryReducer';

import {
    OBTENER_CATEGORIAS,
    OBTENER_CATEGORIAS_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

const CategoryState = props => {
    const initialState = {
        categorias: [],
        errores: [],
    }

    const [ state, dispatch ] = useReducer(categoryReducer, initialState)

    const obtenerCategorias = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/categories')
            dispatch({
                type: OBTENER_CATEGORIAS,
                payload: respuesta.data.categorias
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_CATEGORIAS_ERROR,
                payload: error
            })
        }
    }

    return (
        <categoryContext.Provider
            value={{
                categorias: state.categorias,
                obtenerCategorias,
            }}
        >
            {props.children}
        </categoryContext.Provider>
    )
}

export default CategoryState;