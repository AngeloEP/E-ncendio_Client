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
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES,
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO,
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const AnalyticsState = props => {
    const initialState = {
        distribucionCategoriasImagenes: [],
        distribucionCategoriasPalabras: [],
        distribucionCategoriasPorImagen: [],
        distribucionCategoriasPorPalabra: [],
        distribucionUsoFuncionalidades: [],
        cargandoDistribucionCategorias: false,
        cargandoDistribucionCategoriasPalabras: false,
        cargandoDistribucionCategoriasPorImagen: false,
        cargandoDistribucionCategoriasPorPalabra: false,
        cargandoDistribucionUsoFuncionalidades: false,
        errores: [],
    }

    const [ state, dispatch ] = useReducer(analyticsReducer, initialState)

    const traerDistribucionDeCategorias = async (datos) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO,
            })
            
            const respuesta = await clienteAxios.post('/api/tag-images/distribution', datos)
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

    const traerDistribucionDeCategoriasPorImagen = async (category, datos) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO,
            })

            const respuesta = await clienteAxios.post(`/api/tag-images/category/${category}`, datos)

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

    const traerDistribucionDeCategoriasPalabras = async (datos) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/tag-words/distribution', datos)
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

    const traerDistribucionDeCategoriasPorPalabra = async (category, datos) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO,
            })

            const respuesta = await clienteAxios.post(`/api/tag-words/category/${category}`, datos)

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

    const traerDistribucionDeUsoDeFuncionalidades = async (datos) => {
        try {
            dispatch({
                type: OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/profiles/funcionalitiesDistribution', datos)
            dispatch({
                type: OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES,
                payload: respuesta.data.distribucionFuncionalidades
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR,
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
                distribucionUsoFuncionalidades: state.distribucionUsoFuncionalidades,
                cargandoDistribucionUsoFuncionalidades: state.cargandoDistribucionUsoFuncionalidades,
                traerDistribucionDeCategorias,
                traerDistribucionDeCategoriasPorImagen,
                traerDistribucionDeCategoriasPalabras,
                traerDistribucionDeCategoriasPorPalabra,
                traerDistribucionDeUsoDeFuncionalidades,
            }}
        >
            {props.children}
        </analyticsContext.Provider>
    )
}

export default AnalyticsState;