import React, { useReducer } from 'react';
import analyticsContext from './analyticsContext';
import analyticsReducer from './analyticsReducer';

import {
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES,
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const AnalyticsState = props => {
    const initialState = {
        distribucionCategoriasImagenes: [],
        distribucionCategoriasPalabras: [],
        distribucionCategoriasPorImagen: [],
        distribucionCategoriasPorPalabra: [],
        cargandoDistribucionCategorias: false,
        cargandoDistribucionCategoriasPalabras: false,
        cargandoDistribucionCategoriasPorImagen: false,
        cargandoDistribucionCategoriasPorPalabra: false,
        errores: [],
    }

    const [ state, dispatch ] = useReducer(analyticsReducer, initialState)

    const traerDistribucionDeCategorias = async () => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO,
            })

            const respuesta = await clienteAxios.get('/api/tag-images/distribution')
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR,
                payload: alerta
            })
        }
    }

    const traerDistribucionDeCategoriasPorImagen = async (category) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO,
            })

            const respuesta = await clienteAxios.get(`/api/tag-images/category/${category}`)

            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR,
                payload: alerta
            })
        }
    }

    const traerDistribucionDeCategoriasPalabras = async () => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO,
            })

            const respuesta = await clienteAxios.get('/api/tag-words/distribution')
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR,
                payload: alerta
            })
        }
    }

    const traerDistribucionDeCategoriasPorPalabra = async (category) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO,
            })

            const respuesta = await clienteAxios.get(`/api/tag-words/category/${category}`)

            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <analyticsContext.Provider
            value={{
                distribucionCategoriasImagenes: state.distribucionCategoriasImagenes,
                distribucionCategoriasPorImagen: state.distribucionCategoriasPorImagen,
                cargandoDistribucionCategorias: state.cargandoDistribucionCategorias,
                cargandoDistribucionCategoriasPorImagen: state.cargandoDistribucionCategoriasPorImagen,
                distribucionCategoriasPalabras: state.distribucionCategoriasPalabras,
                distribucionCategoriasPorPalabra: state.distribucionCategoriasPorPalabra,
                cargandoDistribucionCategoriasPalabras: state.cargandoDistribucionCategoriasPalabras,
                cargandoDistribucionCategoriasPorPalabra: state.cargandoDistribucionCategoriasPorPalabra,
                traerDistribucionDeCategorias,
                traerDistribucionDeCategoriasPorImagen,
                traerDistribucionDeCategoriasPalabras,
                traerDistribucionDeCategoriasPorPalabra,
            }}
        >
            {props.children}
        </analyticsContext.Provider>
    )
}

export default AnalyticsState;