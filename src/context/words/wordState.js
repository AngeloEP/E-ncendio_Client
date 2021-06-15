import React, { useReducer } from 'react';
import wordContext from './wordContext';
import wordReducer from './wordReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_PALABRAS,
    OBTENER_PALABRAS_ERROR,
    OBTENER_PALABRAS_POR_USUARIO,
    OBTENER_PALABRAS_POR_USUARIO_ERROR,
    GUARDAR_PALABRA,
    GUARDAR_PALABRA_CARGANDO,
    GUARDAR_PALABRA_ERROR,
    MODIFICAR_PALABRA,
    MODIFICAR_PALABRA_CARGANDO,
    MODIFICAR_PALABRA_ERROR,
    ELIMINAR_PALABRA,
    ELIMINAR_PALABRA_CARGANDO,
    ELIMINAR_PALABRA_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const WordState = props => {
    const initialState = {
        palabra: null,
        palabras: [],
        largoPalabras: 0,
        errores: [],
        cargandoSubirPalabra: false,
        cargandoEliminarPalabra: false,
        cargandoModificarPalabra: false,
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

    const guardarPalabra = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_PALABRA_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/words', datos)
            console.log(respuesta.data)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su palabra se guardó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_PALABRA,
                    payload: respuesta.data.palabra
                })
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: GUARDAR_PALABRA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerPalabrasPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/words/user')
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarPalabra = async (id_palabra) => {
        try {
            dispatch({
                type: ELIMINAR_PALABRA_CARGANDO,
            })
            Swal.fire({
                title: 'Confirme su decisión',
                showDenyButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    await clienteAxios.delete(`/api/words/user/${id_palabra}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Su Palabra se eliminó exitosamente!',
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_PALABRA,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminó su Palabra', '', 'info')
                    dispatch({
                        type: ELIMINAR_PALABRA_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_PALABRA_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Hubo un error, inténtelo nuevamente!',
            })
        }
    }

    const modificarPalabra = async (id_palabra, datos) => {
        try {
            dispatch({
                type: MODIFICAR_PALABRA_CARGANDO,
            })
            console.log(datos)
            const respuesta = await clienteAxios.put(`/api/words/user/word/${id_palabra}`, datos)
            console.log(respuesta.data)
            // return

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su palabra se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_PALABRA,
                    payload: respuesta.data.palabraAntigua
                })
                traerPalabrasPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_PALABRA_ERROR,
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
        <wordContext.Provider
            value={{
                palabra: state.palabra,
                palabras: state.palabras,
                largoPalabras: state.largoPalabras,
                cargandoSubirPalabra: state.cargandoSubirPalabra,
                cargandoEliminarPalabra: state.cargandoEliminarPalabra,
                cargandoModificarPalabra: state.cargandoModificarPalabra,
                cargandoHabilitarInhabilitarPalabra: state.cargandoHabilitarInhabilitarPalabra,
                cargandoEliminarPalabraPorAdmin: state.cargandoEliminarPalabraPorAdmin,
                obtenerPalabras,
                guardarPalabra,
                traerPalabrasPorUsuario,
                eliminarPalabra,
                modificarPalabra,
            }}
        >
            {props.children}
        </wordContext.Provider>
    )
}

export default WordState;