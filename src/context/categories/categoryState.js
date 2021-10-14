import React, { useReducer } from 'react';
import categoryContext from './categoryContext';
import categoryReducer from './categoryReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_CATEGORIAS,
    OBTENER_CATEGORIAS_ERROR,
    OBTENER_CATEGORIAS_VISIBLES,
    OBTENER_CATEGORIAS_VISIBLES_ERROR,
    GUARDAR_CATEGORIA,
    GUARDAR_CATEGORIA_CARGANDO,
    GUARDAR_CATEGORIA_ERROR,
    MODIFICAR_CATEGORIA,
    MODIFICAR_CATEGORIA_CARGANDO,
    MODIFICAR_CATEGORIA_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const CategoryState = props => {
    const initialState = {
        categorias: [],
        categoriasVisibles: [],
        errores: [],
        cargandoSubirCategoria: false,
        cargandoModificarCategoria: false,
    }

    const [ state, dispatch ] = useReducer(categoryReducer, initialState)

    const obtenerTodasLasCategorias = async () => {
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

    const obtenerCategoriasVisibles = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/categories/isVisible')
            dispatch({
                type: OBTENER_CATEGORIAS_VISIBLES,
                payload: respuesta.data.categoriasVisibles
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_CATEGORIAS_VISIBLES_ERROR,
                payload: error
            })
        }
    }

    const guardarCategoria = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_CATEGORIA_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/categories', datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su Categoría se guardó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_CATEGORIA,
                    payload: respuesta.data.categoria
                })
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: GUARDAR_CATEGORIA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const modificarCategoria = async (id_category, datos) => {
        try {
            dispatch({
                type: MODIFICAR_CATEGORIA_CARGANDO,
            })
            const respuesta = await clienteAxios.put(`/api/categories/${id_category}`, datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su Categoría se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_CATEGORIA,
                    payload: respuesta.data.categoríaAntigua
                })
            }, 1000);
            
        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_CATEGORIA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    return (
        <categoryContext.Provider
            value={{
                categorias: state.categorias,
                categoriasVisibles: state.categoriasVisibles,
                cargandoSubirCategoria: state.cargandoSubirCategoria,
                cargandoModificarCategoria: state.cargandoModificarCategoria,
                errores: state.errores,
                obtenerTodasLasCategorias,
                obtenerCategoriasVisibles,
                guardarCategoria,
                modificarCategoria,
            }}
        >
            {props.children}
        </categoryContext.Provider>
    )
}

export default CategoryState;